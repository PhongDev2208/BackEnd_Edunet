const Assignment = require("../model/Assignment.model")
const respond = require("../../../Helper/Object")
const helper = require("../../../Helper/helper")
respond.type = "Assignment"
module.exports.Post = async(req,res) => {
    const {title,description,time,course_id} = req.body
    const newobject =  {
        title : title,
        description : description,
        time : time , 
        course_id : course_id,
        created_At : helper.timenow(),
        Created_by : res.locals.user_id
    }
    const newdata = new Assignment(newobject)
    await newdata.save()
    respond.status = true 
    return res.json(respond)
}

module.exports.GetAll = async(req,res) => {
    const {id} = req.params
    const newdata = await Assignment.find({
        course_id : id
    })
    respond.data = newdata
    respond.status = true 
    return res.json(respond)
}

module.exports.GetDetail = async(req,res) => {
    const {id} = req.params
    const newdata = await Assignment.findOne({
        _id : id
    })
    respond.data = newdata
    respond.status = true 
    return res.json(respond)
}