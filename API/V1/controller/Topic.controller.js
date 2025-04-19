const Topic = require("../model/Topic.model")
module.exports.GetAll = async (req, res) => {
    try {  
        const {key} = req.query;
        const dataTopic = await Topic.find({
            course_id : key
        })
        return res.json({
            status: true,
            type: "Topic",
            error: null,
            data: dataTopic
        })
    } catch {
        return res.json({
            status: false,
            type: "Topic",
            error: 500,
            data: []
        })
    }
}