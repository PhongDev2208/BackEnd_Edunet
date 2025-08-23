const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    title: String,
    course_id: String,
    description: String,
    status: {
      type: Number,
      default: 1,
    },
    date: String,
    created_at: String,
    created_by: String,
    deleted_at: String,
    deleted_by: String,
    updated_at: String,
    updated_by: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", TopicSchema, "topics");
module.exports = Topic;
