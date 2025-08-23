const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  course_id: {
    type: String,
  },
  student_id: {
    type: String,
  },
  content: {
    type: String,
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
  },
  images: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  deleted_by: {
    type: String,
  },
  deleted_at: {
    type: Date,
  },
  updated_by: {
    type: String,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
  },
  created_at: {
    type: String,
  },
});

const Review = mongoose.model("Review", ReviewSchema, "reviews");

module.exports = Review;
