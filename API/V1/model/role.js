const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  id: { type: String, required: true }, 
  name: { type: String, required: true }, 
  description: { type: String } ,
  premission : Array,
  deleted_at: { type: Date }, 
  deleted_by: { type: String }, 
  updated_by: { type: String }, 
  updated_at: { type: Date }, 
  created_by: { type: String }, 
  created_at: { type: Date}, 
}, {
  timestamps: true 
});

const Role = mongoose.model("Role", RoleSchema, "role");
module.exports = Role;
