const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên role
  description: String,
  permissions: {
    type: Array,
    default: []
  },
  deleted_at: { type: Date }, // Ngày xoá
  deleted_by: { type: String }, // Người xoá
  updated_at: { type: Date }, // Ngày cập nhật
  updated_by: { type: String }, // Người cập nhật
  created_at: { type: Date, default: Date.now }, // Ngày tạo
  created_by: { type: String } // Người tạo
}, {
  timestamps: true
});

const Role = mongoose.model("Role", RoleSchema, "Role");
module.exports = Role;
