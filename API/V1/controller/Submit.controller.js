const Submit = require("../model/Submit.model.js");
const User = require("../model/User.model.js");
const Student = require("../model/Student.model.js");
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper.js");
const validate = require("../middleware/validate.js");

module.exports.Post = async (req, res) => {
  try {
    const { assignment_id, content } = req.body;
    const requiredFields = ["assignment_id", "content"];
    const respondValidate = validate.isValidRequest(req.body, requiredFields);
    if (respondValidate == false) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const submitObject = {
      assignment_id: assignment_id,
      user_id: req.user.userId,
      submitted_at: helper.timenow(),
      content: content,
    };
    const newSubmit = new Submit(submitObject);
    await newSubmit.save();
    return res.json({
      status: true,
      type: "Submit",
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
      type: "Submit",
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

    const data = await Submit.find({
      assignment_id: id,
    }).lean();
    for (const item of data) {
      const userId = await User.findOne({
        _id: item.user_id,
      }).select("_id");
      const dataUser = await student
        .findOne({
          user_id: userId._id,
        })
        .select("name");
      item.name = dataUser.name;
    }

    return res.json({
      status: true,
      type: "Submit",
      error: null,
      data: data,
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
      type: "Submit",
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
    const data = await Submit.findOne({
      _id: id,
    }).lean();
    if (!data) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    // data already checked

    if (!data) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const iduser = await User.findOne({
      _id: data.user_id,
    }).select("_id");
    if (!iduser) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const dataUser = await Student.findOne({
      user_id: iduser._id,
    }).select("name");
    if (!dataUser) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    data.name = dataUser.name;

    return res.json({
      status: true,
      type: "Submit",
      error: null,
      data: data,
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
      type: "Submit",
      error: 500,
      data: null,
    });
  }
};
