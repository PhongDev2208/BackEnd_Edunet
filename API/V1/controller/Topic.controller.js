const Topic = require("../model/Topic.model")
const mongoose = require("mongoose");

module.exports.GetAll = async (req, res) => {
    try {
        const { key } = req.params;
        if (!key || !mongoose.Types.ObjectId.isValid(key)) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            });
        }
        const dataTopic = await Topic.find({
            course_id: key
        })
        return res.json({
            status: true,
            type: "Topic",
            error: null,
            data: dataTopic
        })
    } catch {
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