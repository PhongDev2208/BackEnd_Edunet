const mongoose = require("mongoose");

const StudentCourseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  date_register: {
    type: Date,
    default: Date.now,
  },
  student_id: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  deleted_by: {
    type: String,
    default: null,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
  updated_by: {
    type: String,
    default: null,
  },
  updated_at: {
    type: String,
    default: null,
  },
  created_by: {
    type: String,
    default: null,
  },
  created_at: {
    type: String,
    default: null,
  },
});

const StudentCourse = mongoose.model("StudentCourse", StudentCourseSchema);

module.exports = StudentCourse;
