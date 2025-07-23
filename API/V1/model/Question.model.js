const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    topic_id: String,
    type : {
        type : String,
        default : "Single"
    },
    question: String,
    answers: Array, // Danh sách câu trả lời
    correct_answers: Array, // Danh sách đáp án đúng
    updated_by: String,
    status: {
        type : Number ,
        default : 1
    },
    updated_at: String,
    created_by: String,
    created_at: String,
}, {
    timestamps: true,
});

const Question = mongoose.model("Question", QuestionSchema, "Questions");
module.exports = Question;
