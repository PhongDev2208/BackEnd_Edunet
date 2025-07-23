const course = require("../model/Course.model")
const Teacher = require("../model/Teacher.model")
const User = require("../model/User.model")
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper")
const validate = require("../middleware/validate.js")


module.exports.GetAll = async (req, res) => {
   try {
      const { key, page, status } = req.query;
      const fillter = {
         deleted : false,
      }
      if (status && status != null && status != "null") {
         fillter.status = status
      }
      if (key != "null" && key != null && key != "undefined") {
         const regex = new RegExp(key, "i");
         fillter.title = regex
      }
      const total = await course.countDocuments(fillter);
      const pagination = helper.paginet(page, 6, total);

      const Datacourse = await course.find(fillter).skip(pagination.skip).limit(pagination.limit);
      return res.json({
         status: true,
         type: "course",
         error: null,
         data: Datacourse,
         pagination: pagination.count
      })

   } catch (error) {
      if (error.name == "MongoServerError") {
         return res.json({
            status: false,
            type: "course",
            error: 300,
            data: null,
         })
      }
      return res.json({
         status: false,
         type: "course",
         error: 500,
         data: null
      })
   }

}

module.exports.Post = async (req, res) => {
   try {
      const { title, description, numberlesson, categoryid, price, public, time, quantity, img, goal, schedule } = req.body
      // const requiredFields = ["title", "description", "numberlesson", "categoryid", "price", "public", "time", "quantity", "img", "goal", "schedule"];
      // const respondvalidate = validate.isValidRequest(req.body, requiredFields)
      // if (respondvalidate == false) {
      //    return res.json({
      //       status: false,
      //       type: "Data",
      //       error: 300,
      //       data: null
      //    })
      // }

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
         teacherId: req.user.userId,
         Quantity: parseInt(quantity),
         created_at: helper.timenow(),
         created_by: req.user.userId
      }
      const newdata = new course(newobject)
      await newdata.save();
      return res.json({
         status: true,
         type: "course",
         error: null,
         data: null,
      })

   } catch (error) {
      if (error.name == "MongoServerError") {
         return res.json({
            status: false,
            type: "course",
            error: 300,
            data: null,
         })
      }
      return res.json({
         status: false,
         type: "course",
         error: 500,
         data: null
      })
   }
}

module.exports.GetCourseTea = async (req, res) => {
   try {
      const { key, status } = req.query;
      const fillter = {
         teacherId: req.user.userId
      }
      if (status != "null" && status != null) {
         fillter.status_course = status
      }
      if (key != null && key != "null") {
         const regex = new RegExp(key, "i");
         fillter.title = regex
      }
      const NewdataCourse = await course.find(fillter).lean()
      return res.json({
         status: true,
         type: "course",
         error: null,
         data: NewdataCourse,
      })

   } catch (error) {
      if (error.name == "MongoServerError") {
         return res.json({
            status: false,
            type: "course",
            error: 300,
            data: null,
         })
      }
      return res.json({
         status: false,
         type: "course",
         error: 500,
         data: null
      })
   }

}

module.exports.Getdetail = async (req, res) => {
   try {
      const { key } = req.params;
      if (!key || !mongoose.Types.ObjectId.isValid(key)) {
         return res.json({
            status: false,
            type: "Data",
            error: 300,
            data: null
         });
      }
      const Newdata = await course.findOne({
         _id: key,
         status: 1,
         status_course: 1,
         deleted : false
      }).lean();
      if (!Newdata) {
         return res.json({
            status: false,
            type: "Data",
            error: 300,
            data: null
         });
      }

      const userInfo = await User.findOne({
         _id: Newdata.teacherId
      }).select("_id");

      if (!userInfo) {
         return res.json({
            status: false,
            type: "Data",
            error: 300,
            data: null
         });
      }

      const teacher = await Teacher.findOne({
         user_id: userInfo._id
      });

      if (!teacher) {
         return res.json({
            status: false,
            type: "Data",
            error: 300,
            data: null
         });
      }

      Newdata.user = teacher;

      const Day = [];
      const Hour = [];

      if (Newdata.time?.daysOfWeek?.length) {
         for (const item of Newdata.time.daysOfWeek) {
            const newday = `Day ${item.Day + 1}`;
            const newhour = `${item.hourstart}h - ${item.hourend}h`;
            Day.push(newday);
            Hour.push(newhour);
         }
      }

      Newdata.Day = Day;
      Newdata.Hour = Hour;

      return res.json({
         status: true,
         type: "course",
         error: null,
         data: Newdata,
      });

   } catch (error) {
      return res.json({
         status: false,
         type: "course",
         error: 500,
         data: null
      });
   }
};


module.exports.GetSchedule = async (req, res) => {
   try {
      const DataCourse = await course.find({
         teacherId: req.user.userId
      }).lean()
      const newdata = await Promise.all(
         DataCourse.map(async (item) => {
            item.time.display = { title: item.title }
            return item.time;
         })
      );
      return res.json({
         status: true,
         type: "course",
         error: null,
         data: newdata,
      })
   } catch (error) {
      if (error.name == "MongoServerError") {
         return res.json({
            status: false,
            type: "course",
            error: 300,
            data: null,
         })
      }
      return res.json({
         status: false,
         type: "course",
         error: 500,
         data: null
      })
   }
}


module.exports.EditCourse = async (req, res) => {
   try {
      const { id, title, description, numberlesson, categoryid, price, public, time, quantity, img, goal, schedule } = req.body
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
         return res.json({
            status: false,
            type: "Data",
            error: 300,
            data: null
         })
      }
      const requiredFields = ["id", "title", "description", "numberlesson", "categoryid", "price", "public", "time", "quantity", "img", "goal", "schedule"];
      const respondvalidate = validate.isValidRequest(req.body, requiredFields)
      if (respondvalidate == false) {
         return res.json({
            status: false,
            type: "Data",
            error: 300,
            data: null
         })
      }
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
         teacherId: req.user.userId,
         Quantity: parseInt(quantity),
         updated_at: helper.timenow(),
         updated_by: req.user.userId
      }
      if (img.length > 0 != null) {
         newobject.img = img
      }
      const respond = await course.findOneAndUpdate(
         { _id: id },
         { $set: newobject },
      );
      if (respond.modifiedCount === 0) {
         return res.json({
            status: false,
            type: "Data",
            error: 300,
            data: null
         })
      }
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