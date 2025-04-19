const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    type: {
        type: String,
    },
    course_id: {
        type: String,
    },
    student_id: {
        type: String,
    },
    content: {
        type: String,
    },
    rate: {
        type: Number,
        min: 0,  // Điểm đánh giá tối thiểu
        max: 5   // Điểm đánh giá tối đa (giả sử thang điểm 5)
    },
    images: {
        type: [String],  // Lưu danh sách URL hình ảnh
    },
    date: {
        type: Date,
        default: Date.now  // Ngày viết đánh giá (mặc định là ngày hiện tại)
    },
    deleted_by: {
        type: String  // ID của người xóa review (nếu có)
    },
    deleted_at: {
        type: Date  // Thời gian xóa review
    },
    updated_by: {
        type: String  // ID của người cập nhật review (nếu có)
    },
    updated_at: {
        type: Date,
        default: Date.now  // Thời gian cập nhật
    },
    created_by: {
        type: String  // ID của người tạo review
    },
    created_at: {
        type: String,
    }
});

// Tạo model từ schema
const Review = mongoose.model('Review', reviewSchema,"Reviews");

module.exports = Review;  // Sử dụng export default
