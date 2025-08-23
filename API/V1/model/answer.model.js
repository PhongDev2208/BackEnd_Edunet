const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    userid: {
      type: String, // Tham chiếu đến bảng User
    },
    answers: [
      {
        question_id: String,
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

const Answer = mongoose.model("Answer", AnswerSchema, "answers");
module.exports = Answer;
