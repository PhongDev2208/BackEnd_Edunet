const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    user_id: String,
    degree: { type: String, required: true },
    major: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    deleted_at: { type: String },
    deleted_by: { type: String },
    created_at: { type: String },
    created_by: { type: String },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", StudentSchema, "Student");
module.exports = Student;
