const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const CourseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  slug: {
    type : String,
    slug : "title",
    unique : true
  },
  description: String,
  Goal : String,
  schedule : [],
  time: 
    {
      start_time : Date,
      end_time : Date,
      startDisplay : String,
      EndDisplay : String,
      daysOfWeek : [
        {
          Day : Number,
          hourstart : Number,
          hourend : Number
        }-
      ]
    }
  ,
  numberlesson: {
    type: Number,
    required: true
  },
  public: {
    display : String,
    time : Date
  },
  rate: {
    type: Number,
    default: 0
  },
  categoryid: {
    type: String,
    required: true
  },
  SEO: {
    type: Number,
    default : 0
  },

  status: {
    type: Number,
    default : 1
  },
  status_course : {
    type: Number,
    default : 1
  }, 
  img: [], // Array of strings for image URLs or paths
  price: Number,
  teacherId: {
    type: String,
    required: true
  },
  deleted: {
    type : Boolean,
    default : false
 },   
  Quantity : Number,
  deleted_at: String,
  deleted_by: String,
  updated_by: String,
  updated_at: String,
  created_by: String,
  created_at: String
});

const Course = mongoose.model("Course", CourseSchema, "Course");
module.exports = Course;
