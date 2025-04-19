const moment = require("moment");
const StudentCourse = require("../model/Student_course.model")
const Course = require("../model/Course.model")
module.exports.CheckSchedule = async (req, res, next) => {
    try {
        const Data = await StudentCourse.find({
            student_id : res.locals.user_id
           }).lean()
           for(const item of Data){
            const course = await Course.findOne({
               _id : item.course_id
             }).lean()
             item.course = course
           }
           const Database = await Promise.all(
            Data.map((item) => {              
              return item.course.time;  
            })
           )
           let course = await Course.findOne({
             _id : req.body.course_id
           })
        const scheduleData = course.time
    
    

        const getOverlapPeriod = (course1, course2) => {
            const start1 = moment(course1.start_time);
            const end1 = moment(course1.end_time);
            const start2 = moment(course2.start_time);
            const end2 = moment(course2.end_time);

            const overlapStart = moment.max(start1, start2);
            const overlapEnd = moment.min(end1, end2);
            if (overlapStart.isSameOrBefore(overlapEnd)) {
                return { overlapStart, overlapEnd };
            }
            return null;
        };

        const isDayAndTimeOverlap = (overlapDays, course1, course2) => {
            for (const day1 of course1.daysOfWeek) {
                if (overlapDays.includes(day1.Day)) {
                    for (const day2 of course2.daysOfWeek) {
                        if (day1.Day === day2.Day) {
                            if (day1.hourstart < day2.hourend && day1.hourend > day2.hourstart) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };

        for (const dbCourse of Database) {
            const overlapPeriod = getOverlapPeriod(dbCourse, scheduleData);
            if (overlapPeriod) {
                const { overlapStart, overlapEnd } = overlapPeriod;
                
                let overlapDays = [];
                let currentDay = moment(overlapStart);
                while (currentDay.isSameOrBefore(overlapEnd)) {
                    overlapDays.push(currentDay.isoWeekday());
                    currentDay.add(1, 'days');
                }

                if (isDayAndTimeOverlap(overlapDays, scheduleData, dbCourse)) {
                    return res.json({
                        status : false,
                        error : 300,
                        data : [],
                    });
                }
            }
        }
        next()
    } catch (err) {
        console.error(err);
        return res.json({
            status : false,
            error : 500,
            data : [],
        });
    }
};
