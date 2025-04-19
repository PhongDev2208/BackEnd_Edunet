const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String},  
  password: { type: String}, 
  phone: { type: String},
  token: { type: String }, 
  status: { type: Boolean, default: false },
  duration: { type: String , default : null}, 
  role_id: { type : String}, 
  deleted_at: { type: String }, 
  deleted_by: { type: String }, 
  updated_at: { type: String }, 
  updated_by: { type: String }, 
  createdat: { type: String}, 
});

const User = mongoose.model("User", UserSchema, "User");
module.exports = User;
