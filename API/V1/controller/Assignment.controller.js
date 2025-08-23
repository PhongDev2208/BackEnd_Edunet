const Assignment = require("../model/assignment.model.js");
const mongoose = require("mongoose");

const validate = require("../middleware/validate.js");
const helper = require("../../../Helper/helper.js");

module.exports.Post = async (req, res) => {
  try {
    const { title, description, time, course_id: courseId } = req.body;
    const requiredFields = ["title", "description", "time", "course_id"];
    const respondValidate = validate.isValidRequest(req.body, requiredFields);
    if (!respondValidate) {
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
      time: time,
      course_id: courseId,
      created_at: helper.timenow(),
      created_by: req.user.userId,
    };
    const newAssignment = new Assignment(newObject);
    await newAssignment.save();
    return res.json({
      status: true,
      type: "Assignment",
      error: null,
      data: null,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Assignment",
      error: 500,
      data: null,
    });
  }
};

module.exports.GetAll = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const assignments = await Assignment.find({
      course_id: id,
    });
    return res.json({
      status: true,
      type: "Assignment",
      error: null,
      data: assignments,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Assignment",
      error: 500,
      data: null,
    });
  }
};

module.exports.GetDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const assignment = await Assignment.findOne({
      _id: id,
    });
    return res.json({
      status: true,
      type: "Assignment",
      error: null,
      data: assignment,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Assignment",
      error: 500,
      data: null,
    });
  }
};
