const course = require("../model/Course.model")
const Student_course = require("../model/Student_course.model")
const Teacher = require("../model/Teacher.model")
const helper = require("../../../Helper/helper")
const respond = require("../../../Helper/Object")
const User = require("../model/User.model")
module.exports.GetAll = async (req, res) => {
   try {
      const { key, limit, page, status } = req.query;
      const fillter = {
      }
      if(status != "undefined" && status != null && status !="null"){
         fillter.status = status
      }
      if (key  != "null" && key != null && key != "undefined" ) {
         const regex = new RegExp(key, "i");
         fillter.title = regex
      }
      const total = await course.countDocuments(fillter);
      const pagination = helper.paginet(page, limit, total);
      const Datacourse = await course.find(fillter).skip(pagination.skip).limit(pagination.limit);
      return res.json({
         data: Datacourse,
         pagination: pagination
      })
   } catch (error) {
      return res.json({
         data: null,
         total: null
      })
   }
}

module.exports.Post = async (req, res) => {
   try {
      const { title, description, numberlesson, categoryid, price, public, time,quantity, img, goal, schedule } = req.body
      const newobject = {
         title: title,
         description: description,
         Goal: goal,
         schedule: schedule,
         time: time,
         numberlesson: parseInt(numberlesson),
         public: public,
         categoryid: categoryid,
         img: img,
         price: parseInt(price),
         teacherId: res.locals.user_id,
         Quantity: parseInt(quantity),
         created_at: helper.timenow(),
         created_by: res.locals.user_id
      }
      const newdata = new course(newobject)
      await newdata.save();
      return res.json({
         status: true,
         type: "Course",
         error: null,
         data: []
      })
   } catch (error) {
      return res.json({
         status: false,
         type: "Course",
         error: 500,
         data: []
      })
   }
}

module.exports.GetCourseTea = async (req, res) => {
     try {
      const { key, status } = req.query;
      console.log(status,key)

      const fillter = {
         teacherId: res.locals.user_id
      }
      if(status != "null" && status != null){
         fillter.status_course = status
      }
      if (key != null && key != "null") {
         const regex = new RegExp(key, "i");
         fillter.title = regex
      }
      console.log(fillter)
      const NewdataCourse = await course.find(fillter).lean()
      respond.data = NewdataCourse
      respond.status = true
      return res.json(respond)
   
     } catch (error) {
      respond.error = 500
      respond.status = false
      return res.json(respond)
     }
   
}

module.exports.Getdetail = async(req,res) => {
   const {key} = req.query
   const Newdata = await course.findOne({
      _id : key
   }).lean()
   const id = await User.findOne({
       _id : Newdata.teacherId
   }).select("id")
   const user = await Teacher.findOne({
      user_id : id._id
   })
   Newdata.user = user
   const Day = []
   const Hour = []
   for(const item of Newdata.time.daysOfWeek){
       const newday = `Day ${item.Day + 1}`
       const newhour = `${item.hourstart}h - ${item.hourend}h`
       Day.push(newday)
       Hour.push(newhour)
   }
   Newdata.Day = Day
   Newdata.Hour = Hour

   respond.type = "course"
   respond.status = true
   respond.data = Newdata
   respond.error = null
   return res.json(respond)
}


module.exports.GetSchedule = async(req,res) => {
   const DataCourse = await course.find({
      teacherId : res.locals.user_id
   }).lean()
   const newdata = await Promise.all(
      DataCourse.map(async (item) => {
        item.time.display = {title : item.title}
        return item.time;  
      })
    );
    respond.status = true
    respond.data = newdata
    return res.json(respond)
}


module.exports.EditCourse = async (req,res) => {
   try {
      const { id,title, description, numberlesson, categoryid, price, public, time,quantity, img, goal, schedule } = req.body
      const newobject = {
         title: title,
         description: description,
         Goal: goal,
         schedule: schedule,
         time: time,
         numberlesson: parseInt(numberlesson),
         public: public,
         categoryid: categoryid,
         price: parseInt(price),
         teacherId: res.locals.user_id,
         Quantity: parseInt(quantity),
         updated_at: helper.timenow(),
         updated_by: res.locals.user_id
      }
      if(img.length > 0 != null){
         newobject.img = img
      }
      const updatedCourse = await course.findOneAndUpdate(
         { _id: id },  // Điều kiện tìm khóa học
         { $set: newobject },  // Dữ liệu cần cập nhật
     );
      return res.json({
         status: true,
         type: "Course",
         error: null,
         data: []
      })
   } catch (error) {
      return res.json({
         status: false,
         type: "Course",
         error: 500,
         data: []
      })
   }
}