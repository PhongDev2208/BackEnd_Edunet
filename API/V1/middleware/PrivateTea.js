const User = require("../model/User.model")
module.exports.index = async (req,res,next) => {
   try {
    const token = req.headers.authorization.split(" ")
    const Check = await User.findOne({
        token : token[1]
    })
    if(!Check){
      return res.json({ 
         status : false,
         type : "token",
         error : 100,
         data : "Đây là token ảo"
      })
    }
    if(Check.role_id != "tea"){
        return res.json({
            status : false,
            type : "token",
            error : 100,
            data : "Đây là token ảo"
        })
    }
    res.locals.token = token[1]
    res.locals.user_id = Check._id
   } catch 
    {
        return res.json({ 
            status : false,
            type : "token",
            erro : 500,
            data : "Lỗi Khi xác thực token"
         })
   }
   next()
}