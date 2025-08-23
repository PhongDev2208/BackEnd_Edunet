const mongoose = require("mongoose");
const MaterialChildSchema = new mongoose.Schema({
  resource_id: { type: String },
  title: { type: String },
  status: {
    type: Number,
    default: 1,
  },
  position: { type: Number },
  file: { type: Array, default: null },
  link: { type: String, default: null },
  created_at: { type: String },
  deleted_at: { type: String },
  deleted_by: { type: String },
  updated_at: { type: String },
  updated_by: { type: String },
  created_by: { type: String },
});

// Tạo model
const MaterialChild = mongoose.model("MaterialChild", MaterialChildSchema);

module.exports = MaterialChild;
