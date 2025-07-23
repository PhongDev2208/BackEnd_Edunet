const StudentCourse = require("../model/Student_course.model")
const Course = require("../model/Course.model")
const Student = require("../model/Student.model")
const User = require("../model/User.model")
const mongoose = require("mongoose");
const helper = require("../../../Helper/helper")

module.exports.GetstudentCourse = async (req, res) => {
  try {
    const { key, status } = req.query;

    const StudentCourseData = await StudentCourse.find({
      student_id: req.user.userId
    }).lean();

    const courseIds = StudentCourseData.map(item => item.course_id);

   const filter = {
      deleted: false,
      _id: { $in: courseIds }
    };

    if (status && status !== "null") {
      filter.status_course = status;
    }

    if (key && key !== "null" && key !== "undefined") {
      const regex = new RegExp(key, "i");
      filter.title = regex;
    }

    const courses = await Course.find(filter).lean();

    const courseMap = {};
    courses.forEach(course => {
      courseMap[course._id.toString()] = course;
    });

    const result = StudentCourseData.map(item => {
      const course = courseMap[item.course_id.toString()];
      if (course) {
        return {
          ...item,
          id: course._id,
          title: course.title,
          img: course.img,
          status_course: course.status_course,
          numberlesson: course.numberlesson
        };
      }
      return null; 
    }).filter(Boolean); 
    return res.json({
      status: true,
      type: "StudentCourse",
      error: null,
      data: result,
    });

  } catch (error) {
    return res.json({
      status: false,
      type: "StudentCourse",
      error: error.name === "MongoServerError" ? 300 : 500,
      data: null,
    });
  }
};


module.exports.GetStudent = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null
      });
    }

    const datacourse = await StudentCourse.find({
      course_id: id
    }).lean()
    for (const item of datacourse) {
      const user = await User.findOne({
        _id: item.student_id
      })
      const student = await Student.findOne({
        user_id: user.id
      })
      item.phone = user.phone
      item.email = user.email
      item.student = student
    }
    return res.json({
      status: true,
      type: "StudentCourse",
      error: null,
      data: datacourse,
    })
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "StudentCourse",
        error: 300,
        data: null,
      })
    }
    return res.json({
      status: false,
      type: "StudentCourse",
      error: 500,
      data: null
    })
  }
}
module.exports.registerstudencourse = async (req, res) => {
  try {
    const { course_id } = req.body
    console.log(course_id)
    if (!course_id || !mongoose.Types.ObjectId.isValid(course_id)) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null
      });
    }

    const check = await StudentCourse.findOne({
      course_id: course_id,
      student_id: req.user.userId
    })
    if (check) {
      return res.json({
        status: false,
        type: "StudentCourse",
        error: 300,
        data: null
      })
    }
    const sampleData = {
      course_id: course_id,
      date_register: new Date("2024-01-15T10:00:00Z"),
      student_id: req.user.userId,
      status: 1,
      deleted_by: null,
      deleted_at: null,
      updated_by: "admin001",
      updated_at: helper.timenow(),
      created_by: "admin001",
      created_at: helper.timenow()
    }
    const init = new StudentCourse(sampleData)
    await init.save()
    return res.json({
      status: true,
      type: "StudentCourse",
      error: null,
      data: null
    })
  } catch (error) {
    console.log(error)
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "StudentCourse",
        error: 300,
        data: null,
      })
    }
    return res.json({
      status: false,
      type: "StudentCourse",
      error: 500,
      data: null
    })
  }
}

module.exports.editstatus = async (req, res) => {
  try {
    const { id } = req.body
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null
      });
    }

    const check = await StudentCourse.findOne({
      _id: id,
    })
    if (!check) {
      return res.json({
        status: false,
        type: "StudentCourse",
        error: 300,
        data: null
      })
    }
    check.status = check.status == 1 ? 2 : 1;
    await check.save()
    return res.json({
      status: true,
      type: "StudentCourse",
      error: null,
      data: null
    })
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "StudentCourse",
        error: 300,
        data: null,
      })
    }
    return res.json({
      status: false,
      type: "StudentCourse",
      error: 500,
      data: null
    })
  }
}

module.exports.GetscheduleStudent = async (req, res) => {
  try {
    const Data = await StudentCourse.find({
      student_id: req.user.userId
    }).lean()
    for (const item of Data) {
      const course = await Course.findOne({
        _id: item.course_id
      }).lean()
      item.course = course
    }
    const newdata = await Promise.all(
      Data.map((item) => {
        item.course.time.display = { title: item.course.title }
        return item.course.time;
      })
    )

    return res.json({
      status: true,
      type: "StudentCourse",
      error: null,
      data: newdata
    })
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "StudentCourse",
        error: 300,
        data: null,
      })
    }
    return res.json({
      status: false,
      type: "StudentCourse",
      error: 500,
      data: null
    })
  }
}