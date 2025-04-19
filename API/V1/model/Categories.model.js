const mongoose = require("mongoose")
const CategoriesSchema = new mongoose.Schema({
 name : String,
 description : String,
 image : Array,
 status : Number,
 deleted: {
    type : Boolean,
    default : false
 },
  created_At : String,
  Created_by : String,
  deleted_at : String,
  deleted_by : String,
  updated_at : String,
  updated_By : String
},{
    timestamps : true,
})

const Categories = mongoose.model("Categories",CategoriesSchema,"Categories")
module.exports = Categories;