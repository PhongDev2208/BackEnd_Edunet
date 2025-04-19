const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  user_id: String, // Liên kết với bảng user
  degree: { type: String }, // Bằng cấp
  major: { type: String }, // Chuyên ngành
  name: { type: String}, // Tên sinh viên
  age: { type: Number }, // Tuổi sinh viên
  deleted_at: { type: String }, // Ngày xoá
  deleted_by: { type: String }, // Người xoá
  created_at: { type: String }, // Người cập nhật
  created_by: { type: String } // Người tạo
}, {
  timestamps: true
});

const Student = mongoose.model("Student", StudentSchema, "Student");
module.exports = Student;
