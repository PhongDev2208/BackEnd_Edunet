const Course = require("../model/Course.model");
const Teacher = require("../model/Teacher.model");
const User = require("../model/User.model");
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper");
const validate = require("../middleware/validate.js");

module.exports.GetAll = async (req, res) => {
  try {
    const { key, page, status } = req.query;
    const filter = {
      deleted: false,
    };

    if (status && status != null && status != "null") {
      filter.status = status;
    }
    if (key != "null" && key != null && key != "undefined") {
      const regex = new RegExp(key, "i");
      filter.title = regex;
    }
    const total = await Course.countDocuments(filter);
    const pagination = helper.paginet(page, 6, total);

    const dataCourse = await Course.find(filter)
      .skip(pagination.skip)
      .limit(pagination.limit);
    return res.json({
      status: true,
      type: "Course",
      error: null,
      data: dataCourse,
      pagination: pagination.count,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Course",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Course",
      error: 500,
      data: null,
    });
  }
};

module.exports.Post = async (req, res) => {
  try {
    const {
      title,
      description,
      numberlesson,
      categoryid,
      price,
      public,
      time,
      quantity,
      img,
      goal,
      schedule,
    } = req.body;
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

    const newObject = {
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
      created_by: req.user.userId,
    };
    const newCourse = new Course(newObject);
    await newCourse.save();
    return res.json({
      status: true,
      type: "course",
      error: null,
      data: null,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "course",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "course",
      error: 500,
      data: null,
    });
  }
};

module.exports.GetCourseTea = async (req, res) => {
  try {
    const { key, status } = req.query;
    const filter = {
      teacherId: req.user.userId,
    };
    if (status != "null" && status != null) {
      filter.status_course = status;
    }
    if (key != null && key != "null") {
      const regex = new RegExp(key, "i");
      filter.title = regex;
    }
    const dataCourse = await Course.find(filter).lean();
    return res.json({
      status: true,
      type: "Course",
      error: null,
      data: dataCourse,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Course",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Course",
      error: 500,
      data: null,
    });
  }
};

module.exports.Getdetail = async (req, res) => {
  try {
    const { key } = req.params;
    if (!key || !mongoose.Types.ObjectId.isValid(key)) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const courseData = await Course.findOne({
      _id: key,
      status: 1,
      status_course: 1,
      deleted: false,
    }).lean();
    if (!courseData) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }

    const userInfo = await User.findOne({
      _id: courseData.teacherId,
    }).select("_id");

    if (!userInfo) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }

    const teacher = await Teacher.findOne({
      user_id: userInfo._id,
    });

    if (!teacher) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }

    courseData.user = teacher;

    const dayList = [];
    const hourList = [];

    if (courseData.time?.daysOfWeek?.length) {
      for (const item of courseData.time.daysOfWeek) {
        const newday = `Day ${item.Day + 1}`;
        const newhour = `${item.hourstart}h - ${item.hourend}h`;
        dayList.push(newday);
        hourList.push(newhour);
      }
    }

    courseData.Day = dayList;
    courseData.Hour = hourList;

    return res.json({
      status: true,
      type: "Course",
      error: null,
      data: courseData,
    });
  } catch (error) {
    return res.json({
      status: false,
      type: "Course",
      error: 500,
      data: null,
    });
  }
};

module.exports.GetSchedule = async (req, res) => {
  try {
    const dataCourse = await Course.find({
      teacherId: req.user.userId,
    }).lean();
    const scheduleData = await Promise.all(
      dataCourse.map(async (item) => {
        item.time.display = { title: item.title };
        return item.time;
      })
    );
    return res.json({
      status: true,
      type: "Course",
      error: null,
      data: scheduleData,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Course",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Course",
      error: 500,
      data: null,
    });
  }
};

module.exports.EditCourse = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      numberlesson,
      categoryid,
      price,
      public,
      time,
      quantity,
      img,
      goal,
      schedule,
    } = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const requiredFields = [
      "id",
      "title",
      "description",
      "numberlesson",
      "categoryid",
      "price",
      "public",
      "time",
      "quantity",
      "img",
      "goal",
      "schedule",
    ];
    const respondValidate = validate.isValidRequest(req.body, requiredFields);
    if (respondValidate == false) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const newObject = {
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
      updated_by: req.user.userId,
    };
    if (img.length > 0 != null) {
      newObject.img = img;
    }
    const updateResult = await Course.findOneAndUpdate(
      { _id: id },
      { $set: newObject }
    );
    if (updateResult.modifiedCount === 0) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: true,
      type: "Course",
      error: null,
      data: [],
    });
  } catch (error) {
    return res.json({
      status: false,
      type: "Course",
      error: 500,
      data: [],
    });
  }
};
