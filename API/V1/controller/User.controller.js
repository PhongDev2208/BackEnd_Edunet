require("dotenv").config();
const User = require("../model/User.model")
const Student = require("../model/Student.model.js")
const Teacher = require("../model/Teacher.model.js")
const OTP = require("../model/OTP.model.js")

const helper = require("../../../Helper/helper.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validate = require("../middleware/validate.js")
const SECRET_KEY = process.env.JWT_SECRET;

module.exports.Getdetail = async (req, res) => {
    try {
     const data = await User.findOne({
         _id: req.user.userId
     })
     return res.json({
         status: true,
         type: "user",
         error: null,
         data: data
     })
    } catch (error) {
     if (error.name == "MongoServerError") {
         return res.json({
             status: false,
             type: "Data",
             error: 300,
             data: null
         })
     }
     return res.json({
         status: false,
         type: "User",
         error: 500,
         data: null
     })
    }
 
 }
module.exports.Post = async (req, res) => {
    try {
        const { email, password, Phone, Name, age, Major, degree } = req.body
        const requiredFields = ["email", "password", "Phone", "Name", "age", "Major", "degree"];
        const respondvalidate = validate.isValidRequest(req.body, requiredFields)
        if (respondvalidate == false) {
            return res.json({
                status: false,
                type: "Data",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                error: 300,
                data: null
            })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const DataUser = {
            email: email,
            password: hashedPassword,
            phone: Phone,
            role_id: "st",
            deleted: true,
            createdat: helper.timenow(),
        }
        const saveuser = new User(DataUser)
        await saveuser.save()

        const Datastudent = {
            user_id: saveuser._id,
            degree: degree,
            major: Major,
            name: Name,
            age: age,
            created_at: helper.timenow()
        }

        const savestudent = new Student(Datastudent)
        await savestudent.save()
        const token = jwt.sign(
            { userId: saveuser._id, role: DataUser.role_id, email: DataUser.email },
            SECRET_KEY,
            { expiresIn: "50m" }
        );
        res.cookie("Token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 50 * 60 * 1000
        });
        const newOTP = {
            id_user : saveuser._id,
            otp: helper.generateRandomNumber(6)
        }
        const saveotp = new OTP(newOTP)
        await saveotp.save()

        const content = `Mã OTP từ GiaSuWeb , vui lòng không cung cấp cho một ai ${newOTP.otp}`
        helper.SendMail(email, "Bạn Có Một Thông Báo Gia Sư Web", content)
        return res.json({
            status: true,
            type: "User",
            error: null,
            data: null
        })
    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }
        return res.json({
            status: false,
            type: "User",
            error: 5000,
            data: null
        })
    }
}
module.exports.ConfirmOTP = async (req, res) => {
    try {
        const { otp } = req.body
        console.log(otp)
        console.log(req.user.userId)
        const Exits = await OTP.findOne({
            id_user: req.user.userId,
            otp: otp
        })
        console.log(Exits)
        if (!Exits) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }
        const user = await User.findOne({
            _id: req.user.userId,
        })
        user.deleted = false,
            await user.save()

        return res.json({
            status: true,
            type: "User",
            error: null,
            data: null
        })
    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }
        return res.json({
            status: false,
            type: "User",
            error: 500,
            data: null
        })
    }
}

module.exports.PostTeacher = async (req, res) => {
    try {
        const { email, password, phone, name, age, Major, degree, cv } = req.body;
        const requiredFields = ["email", "password", "phone", "name", "age", "Major", "degree", "cv"];
        const respondvalidate = validate.isValidRequest(req.body, requiredFields)
        if (respondvalidate == false) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const DataUser = {
            deleted : true,
            email: email,
            password: hashedPassword,
            phone: phone,
            role_id: "tea",
            created_at: helper.timenow(),
        }
        const NewdataUser = new User(DataUser)
        await NewdataUser.save()


        const DataTeacher = {
            user_id: NewdataUser._id,
            degree: degree,
            major: Major,
            name: name,
            age: age,
            cv: cv,
            create_at: helper.timenow()
        }

        const NewdataTeacher = new Teacher(DataTeacher)
        await NewdataTeacher.save()


        return res.json({
            status: true,
            type: "user",
            error: null,
            data: null
        })

    } catch (error) {
        if (error.name == "MongoServerError") {
            return res.json({
                status: false,
                type: "Data",
                error: 300,
                data: null
            })
        }
        return res.json({
            status: false,
            type: "User",
            error: 500,
            data: null
        })
    }
}
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const Account = await User.findOne({
            email: email,
            deleted: false,

        })
        const isMatch = await bcrypt.compare(password, Account.password);

        if (!isMatch) {
            return res.json({
                status: false,
                type: "User",
                error: 200,
                data: null
            })
        }
        if (Account.status == 2) {
            return res.json({
                status: false,
                type: "Login",
                error: 800,
                data: null
            })
        }
        const token = jwt.sign(
            { userId: Account._id, role: Account.role_id, email: Account.email },
            SECRET_KEY,
            { expiresIn: "50m" }
        );
        res.cookie("Token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 50 * 60 * 1000
        });
        return res.json({
            status: true,
            type: "User",
            error: null,
            data: null
        })
    } catch (error) {
        return res.json({
            status: false,
            type: "User",
            error: 500,
            data: null
        })
    }
}

module.exports.logout = (req, res) => {
    try {
        res.cookie("Token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            expires: new Date(0)
        });
        return res.json({
            status: true,
            type: "Login",
            error: null,
            data: []
        });
    } catch (error) {
        return res.json({
            status: false,
            type: "Login",
            error: 500,
            data: null
        })
    }
};