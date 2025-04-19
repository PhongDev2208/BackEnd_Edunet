const submit = require("../model/Submit.model")
const User = require("../model/User.model")
const student = require("../model/Student.model")
const respond = require("../../../Helper/Object")
const helper = require("../../../Helper/helper")
respond.type = "submit"
module.exports.Post = async (req, res) => {
    try {
        const { assignment_id, content } = req.body;
        const newobject = {
            assignment_id: assignment_id,
            user_id: res.locals.user_id,
            submitted_at: helper.timenow(),
            content: content
        }
        const newdata = new submit(newobject)
        await newdata.save()
        respond.status = true
        return res.json(respond)
    } catch (error) {
        respond.status = false,
            respond.error = 500
        return res.json(respond)
    }
}
module.exports.GetAll = async (req, res) => {
    try {
        const { id } = req.params
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

        respond.status = true
        respond.data = Data
        return res.json(respond)
    } catch (error) {
        respond.status = false,
            respond.error = 500
        return res.json(respond)
    }
}

module.exports.GetDetail = async (req, res) => {
    try {
        const { id } = req.params
        const Data = await submit.findOne({
            _id: id
        }).lean()
        const iduser = await User.findOne({
            _id: Data.user_id
        }).select("id")

        const DataUser = await student.findOne({
            user_id: iduser._id
        }).select("name")
        Data.name = DataUser.name
        respond.status = true
        respond.data = Data
        return res.json(respond)
    } catch (error) {
        respond.status = false,
            respond.error = 500
        return res.json(respond)
    }
}