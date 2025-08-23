const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  time: {
    start_time: Date,
    end_time: Date,
    start_display: String,
    end_display: String,
  },
  status: { type: Boolean, default: 1 },
  course_id: { type: String },
  created_at: String,
  created_by: String,
  deleted_at: String,
  deleted_by: String,
  updated_at: String,
  updated_by: String,
});

const Assignment = mongoose.model(
  "Assignment",
  AssignmentSchema,
  "assignments"
);
module.exports = Assignment;
