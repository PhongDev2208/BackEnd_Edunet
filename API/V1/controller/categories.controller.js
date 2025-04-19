const Categories = require("../model/Categories.model")
const respond = require("../../../Helper/Object")
respond.Categories = "Categories"

module.exports.GetAll = async (req ,res) => {
   try{
    const DataCategories = await Categories.find({
      deleted : false
    })
    const object = {
      name : "Design",
      description : "Khóa Học cung cấp cho các bạn nhiều kiến thức",
      image : "https://themeforest.kreativdev.com/oppida/demo/assets/images/course/pro-3.jpg",
      status : 1,
 
    }
    // const newdata = new Categories(object)
    // await newdata.save()
    respond.data = DataCategories
    respond.status = true
    return res.json(respond)
   }
   catch{
    respond.status = false
    respond.error = 500
    return res.json(respond)
   }
}