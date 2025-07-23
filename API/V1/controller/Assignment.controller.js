const Assignment = require("../model/Assignment.model")
const mongoose = require("mongoose");

const validate = require("../middleware/validate.js")
const helper = require("../../../Helper/helper")

module.exports.Post = async (req, res) => {
    try {
        const { title, description, time, course_id } = req.body
        console.log(req.body)
        const requiredFields = ["title", "description", "time", "course_id"];
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
            time: time,
            course_id: course_id,
            created_At: helper.timenow(),
            Created_by: req.user.userId
        }
        const newdata = new Assignment(newobject)
        await newdata.save()
        return res.json({
            status: true,
            type: "Assignment",
            error: null,
            data: null
        })
    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }
        return res.json({
            status: false,
            type: "Assignment",
            error: 500,
            data: null
        })
    }
}

module.exports.GetAll = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            });
        }
        const newdata = await Assignment.find({
            course_id: id
        })
        return res.json({
            status: true,
            type: "Assignment",
            error: null,
            data: newdata
        })
    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }
        return res.json({
            status: false,
            type: "Assignment",
            error: 500,
            data: null
        })
    }
}

module.exports.GetDetail = async (req, res) => {
   try {
    const { id } = req.params
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.json({
            status: false,
            type: "Data",
            error: 300,
            data: null
        });
    }
    const newdata = await Assignment.findOne({
        _id: id
    })
    console.log(newdata)
    return res.json({
        status: true,
        type: "Assignment",
        error: null,
        data: newdata
    })
   } catch (error) {
    if (error.name == "MongoServerError") {
        return res.json({
            status: false,
            type: "Data",
            error: 300,
            data: null
        })
    }
    return res.json({
        status: false,
        type: "Assignment",
        error: 500,
        data: null
    })
   }
}