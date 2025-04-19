const User = require("../model/User.model")
const Student = require("../model/Student.model.js")
const Teacher = require("../model/Teacher.model.js")
const OTP = require("../model/OTP.model.js")
const helper = require("../../../Helper/helper.js")
const Respond = require("../../../Helper/Object.js")
Respond.type = "User",
module.exports.Post = async(req,res) => {
 
  try {
    const {email,password,Phone,Name,age,Major,degree} = req.body
   const DataUser = {
    email : email,
    password : password,
    phone : Phone,
    token : helper.generateRandomStringNumber(30),
    role_id : "st",
    createdat : helper.timenow(),
   }
   const NewdataUser = new User(DataUser)
   await NewdataUser.save()
   const Datastudent = {
    user_id : NewdataUser.id ,
    degree : degree,
    major : Major,
    name : Name,
    age : age,
    created_at : helper.timenow()
   }
   const NewdataStudent = new Student(Datastudent)
   await NewdataStudent.save()

   const newOTP = {
    token : DataUser.token,
    otp : helper.generateRandomNumber(6)
   }
   const otp = new OTP(newOTP)
   await otp.save()
   const content = `Mã OTP từ GiaSuWeb , vui lòng không cung cấp cho một ai ${newOTP.otp}`
   helper.SendMail(email,"Bạn Có Một Thông Báo Gia Sư Web",content)
   return res.json({
    status: true,
    type: "User",
    error: null,
    data: [{
        token : NewdataUser.token
    }]
})
  } catch (error) {
    Respond.status = false
    Respond.error = 500
    return res.json(Respond)
  }
}
module.exports.ConfirmOTP = async(req,res) => {
    try {
    const {otp} = req.body
    const Exits = await OTP.findOne({
        token : res.locals.token,
        otp : otp
    })
    if(!Exits){
        Respond.status = false
        Respond.error = 500
        return res.json(Respond)
    }
    const user = await User.findOne({
        token : res.locals.token
    })
    user.status = true,
    await user.save()
    Respond.status = true

     return res.json(Respond)  
    } catch (error) {
        Respond.status = false
        Respond.error = 500
        return res.json(Respond)
    }
}

module.exports.PostTeacher = async(req,res) => {

    const {email,password,phone,name,age,Major,degree, cv} = req.body;
    const DataUser = {
        email : email,
        password : password,
        phone : phone,
        token : helper.generateRandomStringNumber(30),
        role_id : "tea",
        created_at : helper.timenow(),
       }
       const NewdataUser = new User(DataUser)
       await NewdataUser.save()
       const DataTeacher  = {
        user_id : NewdataUser.id ,
        degree : degree,
        major : Major,
        name : name,
        age : age,
        cv : cv,
        create_at : helper.timenow()
       }

       const NewdataTeacher = new Teacher(DataTeacher)
       await NewdataTeacher.save()
       Respond.status = true
       return res.json(Respond)

  
    }
module.exports.Getdetail = async(req,res) => {
        const DataUser = await User.findOne({
            _id : res.locals.user_id
        })
        Respond.status = true
        Respond.data = DataUser
        return res.json(Respond)
  
}