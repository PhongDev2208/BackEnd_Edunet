const moment = require("moment");
const StudentCourse = require("../model/studentCourse.model");
const Course = require("../model/course.model");

module.exports = async (req, res, next) => {
  try {
    const studentCourses = await StudentCourse.find({
      student_id: req.user.userId,
    }).lean();
    for (const item of studentCourses) {
      const course = await Course.findOne({ _id: item.course_id }).lean();
      item.course = course;
    }

    const database = studentCourses
      .map((item) => item.course?.time)
      .filter(Boolean); // remove null

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

    function getOverlapPeriod(course1, course2) {
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
    }

    function isDayAndTimeOverlap(overlapDays, course1, course2) {
      for (const day1 of course1.days_of_week) {
        if (overlapDays.includes(day1.day)) {
          for (const day2 of course2.days_of_week) {
            if (day1.day === day2.day) {
              if (
                day1.hour_start < day2.hour_endd &&
                day1.hour_end > day2.hour_start
              ) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }

    for (const dbCourse of database) {
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
  } catch (error) {
    return res.json({
      status: false,
      type: "Data",
      error: 500,
      message: "Lỗi server",
      data: [],
    });
  }
};
