const mongoose = require('mongoose');

const studentCourseSchema = new mongoose.Schema({

  course_id: {
    type: String,
    required: true
  },
  date_register: {
    type: Date,
    default: Date.now
  },
  student_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'active'
  },
  deleted_by: {
    type: String,
    default: null
  },
  deleted_at: {
    type: Date,
    default: null
  },
  updated_by: {
    type: String,
    default: null
  },
  updated_at: {
    type: Date,
    default: null
  },
  created_by: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema);

module.exports = StudentCourse;
