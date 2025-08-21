const Review = require("../model/review.model.js");
const User = require("../model/user.model.js");
const Student = require("../model/student.model.js");
const Teacher = require("../model/teacher.model.js");
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper.js");
const validate = require("../middleware/validate.js");

module.exports.GetAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { page } = req.query;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const total = await Review.countDocuments({
      course_id: id,
    });

    const pagination = helper.paginet(parseInt(page), 2, total);
    const data = await Review.find({
      course_id: id,
    })
      .lean()
      .skip(pagination.skip)
      .limit(pagination.limit);

    for (const item of data) {
      const userRecord = await User.findOne({
        _id: item.student_id,
      }).select("_id role_id");
      let user = null;
      if (userRecord.role_id == "tea") {
        user = await Teacher.findOne({
          user_id: userRecord._id,
        });
      } else {
        user = await Student.findOne({
          user_id: userRecord._id,
        });
      }

      item.user = user;
      item.role = userRecord.role_id;
    }

    return res.json({
      status: true,
      type: "Review",
      error: null,
      data: data,
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
    const { course_id, rate, content, images } = req.body;
    const requiredFields = ["course_id", "rate", "content", "images"];
    const respondValidate = validate.isValidRequest(req.body, requiredFields);
    if (respondValidate == false) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const sampleReview = {
      type: "null",
      course_id: course_id,
      student_id: req.user.userId,
      content: content,
      rate: rate,
      images: images,
      date: helper.timenow(),
      deleted_by: null,
      deleted_at: null,
      updated_by: null,
      updated_at: new Date(),
      created_by: "admin_001",
      created_at: helper.timenow(),
    };
    const newData = new Review(sampleReview);
    await newData.save();

    return res.json({
      status: true,
      type: "Review",
      error: null,
      data: newData,
    });
  } catch (error) {
    return res.json({
      status: false,
      type: "Review",
      error: 500,
      data: [],
    });
  }
};
