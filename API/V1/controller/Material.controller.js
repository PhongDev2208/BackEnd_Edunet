const Material = require("../model/Material.model")
const MaterialChild = require("../model/MaterialChild.model")
const mongoose = require("mongoose");

const helper = require("../../../Helper/helper")
const validate = require("../middleware/validate.js")

module.exports.Post = async (req, res) => {
    try {
        const { title, course_id, position } = req.body
        const requiredFields = ["title", "course_id", "position"];
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
            course_id: course_id,
            position: parseInt(position),
            created_at: helper.timenow()
        }

        const newdata = new Material(newobject)
        await newdata.save()
        return res.json({
            status: true,
            type: "Material",
            error: null,
            data: null,
        })
    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null,
            })
        }
        return res.json({
            status: false,
            type: "Material",
            error: 500,
            data: null
        })
    }
}

module.exports.PostChildren = async (req, res) => {
    try {
        const { resource_id, title, Link, position, file } = req.body
        const requiredFields = ["resource_id", "title", "Link", "position", "file"];
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
            resource_id: resource_id,
            title: title,
            Link: Link,
            position: position,
            file: file,
            created_at: helper.timenow()
        }
        const newdata = new MaterialChild(newobject)
        await newdata.save()

        return res.json({
            status: true,
            type: "Material",
            error: null,
            data: null,
        })
    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null,
            })
        }

        return res.json({
            status: false,
            type: "Material",
            error: 500,
            data: null
        })
    }
}

module.exports.GetAll = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            });
        }

        const newdata = await Material.find({
            course_id: id
        }).sort({ position: 1 }).lean();

        for (const item of newdata) {
            const Child = await MaterialChild.find({
                resource_id: item._id
            }).sort({ position: 1 }).lean();
            item.Child = Child
        }

        return res.json({
            status: true,
            type: "Material",
            error: null,
            data: newdata,
        })
    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null,
            })
        }
        return res.json({
            status: false,
            type: "Material",
            error: 500,
            data: null
        })
    }
}