const moment = require("moment");
const StudentCourse = require("../model/Student_course.model");
const Course = require("../model/Course.model");

module.exports = async (req, res, next) => {
  try {
    const Data = await StudentCourse.find({
      student_id: req.user.userId,
    }).lean();
    console.log(Data)
    for (const item of Data) {
      const course = await Course.findOne({ _id: item.course_id }).lean();
      item.course = course;
    }

    const Database = Data.map((item) => item.course?.time).filter(Boolean); // bỏ null

    const course = await Course.findOne({ _id: req.body.course_id }).lean();
    if (!course || !course.time) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        message: "Course not found or has no schedule",
        data: null,
      });
    }

    const scheduleData = course.time;

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
              if (
                day1.hourstart < day2.hourend &&
                day1.hourend > day2.hourstart
              ) {
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
          const day = currentDay.isoWeekday(); // 1 (Mon) - 7 (Sun)
          if (!overlapDays.includes(day)) overlapDays.push(day);
          currentDay.add(1, "days");
        }

        if (isDayAndTimeOverlap(overlapDays, scheduleData, dbCourse)) {
          return res.json({
            status: false,
            type: "Data",
            error: 300,
            message: "Trùng lịch học với một khóa học đã đăng ký",
            data: null,
          });
        }
      }
    }

    next();
  } catch (err) {
    console.error(err);
    return res.json({
      status: false,
      error: 500,
      message: "Lỗi server",
      data: [],
    });
  }
};
