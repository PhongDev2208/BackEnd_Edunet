const Answers = require("../model/answer.model.js");
const Question = require("../model/question.model.js");
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper.js");
const validate = require("../middleware/validate.js");

module.exports.GetAll = async (req, res) => {
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
    const dataAnswers = await Answers.find({
      topic_id: key,
      userid: req.user.userId,
    }).select("-answers");
    return res.json({
      status: true,
      type: "Answers",
      error: null,
      data: dataAnswers,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Answers",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Answers",
      error: 500,
      data: null,
    });
  }
};

module.exports.Detail = async (req, res) => {
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
    const dataAnswers = await Answers.findOne({
      _id: key,
    })
      .select("answers")
      .lean();

    const dataCustom = await Promise.all(
      dataAnswers.answers.map(async (item) => {
        const questionData = await Question.findOne({
          _id: item.question_id,
        }).lean();

        questionData.answersuser = item.results;
        return questionData;
      })
    );

    return res.json({
      status: true,
      type: "Answers",
      error: null,
      data: dataCustom,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Answers",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Answers",
      error: 500,
      data: null,
    });
  }
};

module.exports.Post = async (req, res) => {
  try {
    const { answers, topic_id } = req.body;
    const requiredFields = ["answers", "topic_id"];
    const respondValidate = validate.isValidRequest(req.body, requiredFields);
    if (respondValidate == false) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const data = {
      userid: req.user.userId,
      answers: answers,
      topic_id: topic_id,
      date: helper.timenow(),
    };
    const newAnswer = new Answers(data);
    await newAnswer.save();

    return res.json({
      status: true,
      type: "Answers",
      error: null,
      data: newAnswer._id,
    });
  } catch (error) {
    return res.json({
      status: false,
      type: "Answers",
      error: 500,
      data: null,
    });
  }
};
