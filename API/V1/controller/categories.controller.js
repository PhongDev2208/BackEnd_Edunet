const Categories = require("../model/Categories.model")

module.exports.GetAll = async (req ,res) => {
   try{
    const DataCategories = await Categories.find({
      deleted : false
    })
    return res.json({
      status: true,
      type: "User",
      error: null,
      data: DataCategories
  })
   }
   catch{
    return res.json({
      status: false,
      type: "User",
      error: 5000,
      data: null
  })
   }
}