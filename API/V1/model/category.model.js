const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: Array,
    status: {
      type: Number,
      default: 1,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    created_at: String,
    created_by: String,
    deleted_at: String,
    deleted_by: String,
    updated_at: String,
    updated_by: String,
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema, "categories");
module.exports = Category;
