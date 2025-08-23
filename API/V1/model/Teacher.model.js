const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  age: { type: Number, required: true },
  cv: { type: Array, required: true },
  rate: { type: Number, default: 0 },
  status: { type: String, default: false },
  seo: { type: Number, default: 0 },
  degree: { type: String, required: true },
  major: { type: String, require: true },
  name: { type: String, required: true },
  blog: [{ type: String, default: null }],
  created_at: { type: Date, default: Date.now },
  created_by: { type: String },
  updated_at: { type: Date },
  updated_by: { type: String },
  deleted_at: { type: Date },
  deleted_by: { type: String },
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
