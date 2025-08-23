const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema(
  {
    id_user: String, // Liên kết với bảng user
    otp: { type: Number }, // Bằng cấp
    expire_at: { type: Date, default: Date.now, expires: 180 },
    deleted_at: { type: Date }, // Ngày xoá
    deleted_by: { type: String }, // Người xoá
    created_at: { type: String }, // Người cập nhật
    created_by: { type: String }, // Người tạo
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("otp", OTPSchema, "otps");
module.exports = OTP;
