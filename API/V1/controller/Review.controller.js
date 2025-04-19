const review = require("../model/Review.model")
const User = require("../model/User.model")
const Student = require("../model/Student.model")
const Teacher = require("../model/Teacher.model")
const helper = require("../../../Helper/helper")
module.exports.GetAll = async(req,res) => {
    try {
        const {key,page} = req.query

        const total = await review.countDocuments({
            course_id : key
        });
        const pagination = helper.paginet(parseInt(page),2,total)
        const data = await review.find({
            course_id : key
        }).lean().skip(pagination.skip).limit(pagination.limit)
        for(const item of data){
            const id = await User.findOne({
                _id : item.student_id
            }).select("id role_id")
            let user = null
            if(id.role_id == "tea")
            {
                 user = await Teacher.findOne({
                    user_id : id._id
                })
            }
            else{
                user = await Student.findOne({
                    user_id : id._id
                })
            }
            item.user = user
            item.role = id.role_id
        }
        return res.json({
            status : true,
            type : "review",
            error : null,
            data : data,
            total : pagination
          })
    } catch (error) {
        return res.json({
            status : false,
            type : "review",
            error : 500,
            data : [],
            total : null
          })
    }
} 

module.exports.Post = async(req,res) => {
      
    try {
        const{course_id, rate,content,images} = req.body
        const check = await User.findOne({
            token : res.locals.token
        }).select("id")
        const sampleReview = {
            type: "null",     // Loại đánh giá (ví dụ: "course", "teacher", v.v.)
            course_id: course_id, // ID của khóa học mà đánh giá liên quan
            student_id: check.id, // ID của sinh viên viết đánh giá
            content: content, // Nội dung đánh giá
            rate: rate,           // Điểm đánh giá (giả sử thang điểm 5)
            images: images,
            date: new Date(),  // Ngày viết đánh giá (mặc định là ngày hiện tại)
            deleted_by: null,  // ID của người xóa review (nếu có)
            deleted_at: null,  // Thời gian xóa review (nếu có)
            updated_by: null,  // ID của người cập nhật review (nếu có)
            updated_at: new Date(), // Thời gian cập nhật
            created_by: "admin_001", // ID của người tạo review
            created_at: helper.timenow()   // Thời gian tạo review
        };
        const newdata = new review(sampleReview)
        await newdata.save()
    
        // Ví dụ sử dụng để lưu vào cơ sở dữ liệu
        return res.json({
            status : true,
            type : "review",
            error : null,
            data : newdata
          })
    } catch (error) {
        return res.json({
            status : false,
            type : "review",
            error : 500,
            data : []
          })
    }
    
  }