const Question = require("../model/Question.model")
const Topic = require("../model/Topic.model")
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper")
const validate = require("../middleware/validate.js")

module.exports.GetAll = async (req, res) => {
    try {
        const { key } = req.params
        if (!key || !mongoose.Types.ObjectId.isValid(key)) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            });
        }
        const DataQuestion = await Question.find({
            topic_id: key
        })
        return res.json({
            status: true,
            type: "Question",
            error: null,
            data: DataQuestion
        })
    } catch {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Question",
                error: 300,
                data: null,
            })
        }
        return res.json({
            status: false,
            type: "Question",
            error: 500,
            data: null
        })
    }
}

module.exports.Post = async (req, res) => {
    try {
        const { title, Description, course_id, question } = req.body
        console.log(req.body)
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
        const newtopic = {
            title: title,
            Description: Description,
            course_id: course_id,
            date: helper.timenow()
        }
        const savetopic = new Topic(newtopic)
        await savetopic.save()
        for (const item of question) {
            const newquestion = {
                question: item.question,
                correct_answers: item.correct_answers,
                answers: item.answers,
                topic_id: savetopic._id
            }
            const saveQuestion = new Question(newquestion)
            await saveQuestion.save()
        }
        return res.json({
            status: true,
            type: "Question",
            error: null,
            data: null,
         })
    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Question",
                error: 300,
                data: null,
            })
        }
        return res.json({
            status: false,
            type: "Question",
            error: 500,
            data: null
        })
    }
}