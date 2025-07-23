const submit = require("../model/Submit.model")
const User = require("../model/User.model")
const student = require("../model/Student.model")
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper")
const validate = require("../middleware/validate.js")

module.exports.Post = async (req, res) => {
    try {
        const { assignment_id, content } = req.body;
        const requiredFields = ["assignment_id", "content"];
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
            assignment_id: assignment_id,
            user_id: req.user.userId,
            submitted_at: helper.timenow(),
            content: content
        }
        const newdata = new submit(newobject)
        await newdata.save()
        return res.json({
            status: true,
            type: "Submit",
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
            type: "Submit",
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

        const Data = await submit.find({
            assignment_id: id
        }).lean()

        for (const item of Data) {
            const id = await User.findOne({
                _id: item.user_id
            }).select("id")
            const DataUser = await student.findOne({
                user_id: id._id
            }).select("name")
            item.name = DataUser.name
        }

        return res.json({
            status: true,
            type: "Submit",
            error: null,
            data: Data
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
            type: "Submit",
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
        const Data = await submit.findOne({
            _id: id
        }).lean()
        if (!Data) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            });
        }
        const iduser = await User.findOne({
            _id: Data.user_id
        }).select("id")
        if (!iduser) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            });
        }
        const DataUser = await student.findOne({
            user_id: iduser._id
        }).select("name")
        if (!DataUser) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            });
        }
        Data.name = DataUser.name
        
           return res.json({
            status: true,
            type: "Submit",
            error: null,
            data: Data
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
            type: "Submit",
            error: 500,
            data: null
        })
    }
}