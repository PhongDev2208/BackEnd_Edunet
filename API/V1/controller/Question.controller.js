const Question = require("../model/question.model.js");
const Topic = require("../model/topic.model.js");
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
    const dataQuestion = await Question.find({
      topic_id: key,
    });
    return res.json({
      status: true,
      type: "Question",
      error: null,
      data: dataQuestion,
    });
  } catch {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Question",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Question",
      error: 500,
      data: null,
    });
  }
};

module.exports.Post = async (req, res) => {
  try {
    const { title, description, course_id, question } = req.body;
    // const requiredFields = ["title", "description", "course_id", "question"];
    // const respondvalidate = validate.isValidRequest(req.body, requiredFields)
    // if (respondvalidate == false) {
    //     return res.json({
    //         status: false,
    //         type: "Data",
    //         error: 300,
    //         data: null
    //     })
    // }
    const newTopic = {
      title: title,
      description: description,
      course_id: course_id,
      date: helper.timenow(),
    };
    const savedTopic = new Topic(newTopic);
    await savedTopic.save();
    for (const item of question) {
      const newQuestion = {
        question: item.question,
        correct_answers: item.correct_answers,
        answers: item.answers,
        topic_id: savedTopic._id,
      };
      const savedQuestion = new Question(newQuestion);
      await savedQuestion.save();
    }
    return res.json({
      status: true,
      type: "Question",
      error: null,
      data: null,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Question",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "Question",
      error: 500,
      data: null,
    });
  }
};
