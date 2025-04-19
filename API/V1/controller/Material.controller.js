const Material = require("../model/Material.model")
const MaterialChild = require("../model/MaterialChild.model")
const respond = require("../../../Helper/Object")
const helper = require("../../../Helper/helper")
module.exports.Post = async(req,res) => {
      const {title,course_id,position} = req.body
      const newobject = {
        title : title,
        course_id : course_id,
        position : parseInt(position),
        created_at : helper.timenow()
      }
      const newdata = new Material(newobject)
      await newdata.save()
      respond.status = true
      return res.json(respond)
}
module.exports.PostChildren = async(req,res) => {
    const {resource_id,title,Link,status,position,file} = req.body
    const newobject = {
        resource_id : resource_id,
        title : title,
        Link : Link,
        position : position,
        file : file,
        created_at : helper.timenow()
    }
    const newdata = new MaterialChild(newobject)
    await newdata.save()
    respond.status = true
    return res.json(respond)
}

module.exports.GetAll = async(req,res)=> {
    const {key} = req.query
    const newdata = await Material.find({
        course_id: key
    }).sort({ position: 1 }).lean();
    for(const item of newdata){
        const Child = await MaterialChild.find({
            resource_id : item._id
        }).sort({ position: 1 }).lean();
        item.Child = Child
    }
    respond.status = true
    respond.data = newdata

    return res.json(respond)
}