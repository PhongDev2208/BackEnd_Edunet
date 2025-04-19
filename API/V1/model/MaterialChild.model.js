const mongoose = require('mongoose');
const MaterialChildSchema  = new mongoose.Schema({
    resource_id: { type: String }, // Liên kết với resource bằng ID số
    title: { type: String },
    status: { type: Number}, // 1 = active, 0 = inactive
    position: { type: Number },
    file: { type: Array , default : null}, // Đường dẫn file hoặc nội dung file ở dạng string
    Link: { type: String , default : null}, // Đường dẫn file hoặc nội dung file ở dạng string
    created_at: { type: String },
    deleted_at: { type: String },
    deleted_by: { type: String },
    updated_at: { type: String },
    updated_by: { type: String },
    created_by: { type: String }
  });
  
  // Tạo model
  const MaterialChild = mongoose.model('MaterialChild', MaterialChildSchema);
  
  module.exports = MaterialChild;
  