const mongoose = require("mongoose");

// Schema đơn giản
const MaterialSchema = new mongoose.Schema({
  title: { type: String },
  course_id: { type: String }, // Liên kết với khóa học bằng ID số
  status: { type: Number, default: 1 }, // 1 = active, 0 = inactive
  position: { type: Number },
  created_at: { type: String, default: null },
  deleted_at: { type: String, default: null },
  deleted_by: { type: String, default: null },
  updated_at: { type: String, default: null },
  updated_by: { type: String, default: null },
  created_by: { type: String, default: null },
});

// Tạo model
const Material = mongoose.model("Material", MaterialSchema);

module.exports = Material;
