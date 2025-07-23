const Answers = require("../model/Answers.model")
const Question = require("../model/Question.model")
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper")
const validate = require("../middleware/validate.js")

module.exports.GetAll = async (req, res) => {
    try {
        const { key } = req.params
        console.log(key)
        if (!key || !mongoose.Types.ObjectId.isValid(key)) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            });
        }
        const DataAnswers = await Answers.find({
            topic_id: key,
            userid_id: req.user.userid
        }).select("-answers")
        return res.json({
            status: true,
            type: "Answers",
            error: null,
            data: DataAnswers
        })
    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "answers",
                error: 300,
                data: null,
            })
        }
        return res.json({
            status: false,
            type: "answers",
            error: 500,
            data: null
        })
    }

}

module.exports.Detail = async (req, res) => {
    try {
        const { key } = req.params
        console.log(key)
        if (!key || !mongoose.Types.ObjectId.isValid(key)) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            });
        }
        const DataAnswers = await Answers.findOne({
            _id: key
        }).select("answers").lean()

        const DataCustom = await Promise.all(DataAnswers.answers.map(async (item) => {
            const Newdata = await Question.findOne({
                _id: item.Question_id
            }).lean()

            Newdata.answersuser = item.results
            return Newdata
        }))

        return res.json({
            status: true,
            type: "Answers",
            error: null,
            data: DataCustom
        })
    } catch {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "answers",
                error: 300,
                data: null,
            })
        }
        return res.json({
            status: false,
            type: "answers",
            error: 500,
            data: null
        })
    }
}

module.exports.Post = async (req, res) => {
    try {
        const { answers, topic_id } = req.body;
        const requiredFields = ["answers", "topic_id"];
        const respondvalidate = validate.isValidRequest(req.body, requiredFields)
        if (respondvalidate == false) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }
        const Data = {
            userid_id: req.user.userid,
            answers: answers,
            topic_id: topic_id,
            date: helper.timenow()
        }
        const newdata = Answers(Data)
        await newdata.save()

        return res.json({
            status: true,
            type: "Answers",
            error: null,
            data: newdata._id
        })
    } catch {
        return res.json({
            status: false,
            type: "Answers",
            error: 500,
            data: null
        });
    }
}