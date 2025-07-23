const review = require("../model/Review.model")
const User = require("../model/User.model")
const Student = require("../model/Student.model")
const Teacher = require("../model/Teacher.model")
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper")
const validate = require("../middleware/validate.js")

module.exports.GetAll = async (req, res) => {
    try {
        const {id} = req.params
        const {page } = req.query
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }
        const total = await review.countDocuments({
            course_id: id
        });

        const pagination = helper.paginet(parseInt(page), 2, total)
        const data = await review.find({
            course_id: id
        }).lean().skip(pagination.skip).limit(pagination.limit)

        for (const item of data) {
            const id = await User.findOne({
                _id: item.student_id
            }).select("id role_id")
            let user = null
            if (id.role_id == "tea") {
                user = await Teacher.findOne({
                    user_id: id._id
                })
            }
            else {
                user = await Student.findOne({
                    user_id: id._id
                })
            }

            item.user = user
            item.role = id.role_id
        }


        return res.json({
            status: true,
            type: "review",
            error: null,
            data: data,
            pagination: pagination.count
        })

    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "course",
                error: 300,
                data: null,
            })
        }
        return res.json({
            status: false,
            type: "course",
            error: 500,
            data: null
        })
    }
}

module.exports.Post = async (req, res) => {
    try {
        const { course_id, rate, content, images } = req.body
        const requiredFields = ["course_id", "rate", "content", "images"];
        const respondvalidate = validate.isValidRequest(req.body, requiredFields)
        if (respondvalidate == false) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
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
            created_at: helper.timenow()
        };
        const newdata = new review(sampleReview)
        await newdata.save()

        return res.json({
            status: true,
            type: "review",
            error: null,
            data: newdata
        })
    } catch (error) {
        return res.json({
            status: false,
            type: "review",
            error: 500,
            data: []
        })
    }

}