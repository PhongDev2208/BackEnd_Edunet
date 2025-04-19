const StudentCourse = require("../model/Student_course.model")
const Course = require("../model/Course.model")
const Student = require("../model/Student.model")
const User = require("../model/User.model")
const respond = require("../../../Helper/Object")
respond.type = "stu_course"

module.exports.GetCourse = async (req, res) => {
  try {
    const StudentCourseData = await StudentCourse.find({
      student_id: res.locals.user_id
    }).lean();
    for (const item of StudentCourseData) {
      const course = await Course.findOne({
        _id: item.course_id
      })
      item.id = course._id
      item.title = course.title
      item.img = course.img
      item.status_course = course.status_course
      item.numberlesson = course.numberlesson
    }
    respond.data = StudentCourseData
    respond.status = true

    return res.json(respond)
  } catch {
    respond.error = 500
    respond.status = false
    return res.json(respond)

  }
}

module.exports.GetStudent = async (req, res) => {
  try{
    const { key } = req.query
    const datacourse = await StudentCourse.find({
      course_id: key
    }).lean()
    for (const item of datacourse) {
      const user = await User.findOne({
        _id: item.student_id
      })
      const student = await Student.findOne({
        user_id : user.id
      })
      item.phone = user.phone
      item.email = user.email
      item.student = student
    }
    
    return res.json({
      status: true,
      type: "StudentCourse",
      error: null,
      data: datacourse
    })
  }catch (error){
    return res.json({
      status: false,
      type: "StudentCourse",
      error: 500,
      data: []
    })
  }
}
module.exports.Post = async (req, res) => {
  try {
    const { course_id } = req.body

    const check = await StudentCourse.findOne({
      course_id: course_id,
      student_id: res.locals.user_id
    })
    if (check) {
      return res.json({
        status: false,
        type: "StudentCourse",
        error: 200,
        data: []
      })
    }
    const sampleData = {
      course_id: course_id,
      date_register: Date.now(),
      student_id: res.locals.user_id,
      status: 0,
      deleted_by: null,
      deleted_at: null,
      updated_by: "admin001",
      updated_at: new Date("2024-01-20T15:30:00Z"),
      created_by: "admin001",
      created_at: new Date("2024-01-15T10:00:00Z")
    }
    const init = new StudentCourse(sampleData)
    await init.save()
    return res.json({
      status: true,
      type: "StudentCourse",
      error: null,
      data: []
    })
  } catch (error) {
    return res.json({
      status: false,
      type: "StudentCourse",
      error: 500,
      data: []
    })
  }
}

module.exports.editstatus = async (req, res) => {
  try {
    const { id } = req.body
    const check = await StudentCourse.findOne({
      _id: id,
    })
    if (!check) {
      return res.json({
        status: false,
        type: "StudentCourse",
        error: 200,
        data: []
      })
    }
    console.log(check.status)
    check.status = check.status == 0 ? 1 : 0;
    await check.save()
    return res.json({
      status: true,
      type: "StudentCourse",
      error: null,
      data: []
    })
  } catch (error) {
    return res.json({
      status: false,
      type: "StudentCourse",
      error: 500,
      data: []
    })
  }
}

module.exports.GetscheduleStudent = async (req,res) => {
   const Data = await StudentCourse.find({
    student_id : res.locals.user_id
   }).lean()
   for(const item of Data){
    const course = await Course.findOne({
       _id : item.course_id
     }).lean()
     item.course = course
   }
   const newdata = await Promise.all(
    Data.map((item) => {
      item.course.time.display = {title : item.course.title}
      
      return item.course.time;  
    })
   )
   console.log(newdata)

   respond.status = true
   respond.data = newdata
   return res.json(respond)
}