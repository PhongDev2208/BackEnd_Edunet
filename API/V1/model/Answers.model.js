const mongoose = require("mongoose");

const AnswersSchema = new mongoose.Schema(
  {
    userid_id: {
      type: String, // Tham chiếu đến bảng User
    },
    answers: [
      {
        Question_id: String,
        results: Array,
      },
    ], // Mảng chứa câu trả lời của người dùng
    date: String,
    topic_id: {
      type: String, // Tham chiếu đến bảqng Topic
    },
    updated_at: String,
    created_at: String,
  },
  {
    timestamps: true,
  }
);

const Answers = mongoose.model("Answers", AnswersSchema, "answers");
module.exports = Answers;
