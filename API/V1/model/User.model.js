const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  status: { type: Number, default: 1 },
  duration: { type: String, default: null },
  role_id: { type: String },
  deleted: { type: String, default: false },
  deleted_at: { type: String, default: null },
  deleted_by: { type: String, default: null },
  updated_at: { type: String, default: null },
  updated_by: { type: String, default: null },
  created_at: { type: String },
});

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;
