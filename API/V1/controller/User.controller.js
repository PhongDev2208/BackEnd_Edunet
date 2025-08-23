require("dotenv").config();
const User = require("../model/user.model.js");
const Student = require("../model/student.model.js");
const Teacher = require("../model/teacher.model.js");
const OTP = require("../model/otp.model.js");

const helper = require("../../../Helper/helper.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validate = require("../middleware/validate.js");
const SECRET_KEY = process.env.JWT_SECRET;

module.exports.Getdetail = async (req, res) => {
  try {
    const data = await User.findOne({
      _id: req.user.userId,
    });
    return res.json({
      status: true,
      type: "User",
      error: null,
      data: data,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "User",
      error: 500,
      data: null,
    });
  }
};
module.exports.Post = async (req, res) => {
  try {
    const { email, password, Phone, Name, age, Major, degree } = req.body;
    const requiredFields = [
      "email",
      "password",
      "Phone",
      "Name",
      "age",
      "Major",
      "degree",
    ];
    const respondValidate = validate.isValidRequest(req.body, requiredFields);
    if (respondValidate == false) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const dataUser = {
      email: email,
      password: hashedPassword,
      phone: Phone,
      role_id: "st",
      deleted: true,
      created_at: helper.timenow(),
    };
    const savedUser = new User(dataUser);
    await savedUser.save();

    const dataStudent = {
      user_id: savedUser._id,
      degree: degree,
      major: Major,
      name: Name,
      age: age,
      created_at: helper.timenow(),
    };

    const savedStudent = new Student(dataStudent);
    await savedStudent.save();
    const token = jwt.sign(
      { userId: savedUser._id, role: dataUser.role_id, email: dataUser.email },
      SECRET_KEY,
      { expiresIn: "50m" }
    );
    res.cookie("Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 50 * 60 * 1000,
    });
    const newOTP = {
      id_user: savedUser._id,
      otp: helper.generateRandomNumber(6),
    };
    const savedOtp = new OTP(newOTP);
    await savedOtp.save();

    const content = `Mã OTP từ GiaSuWeb , vui lòng không cung cấp cho một ai ${newOTP.otp}`;
    helper.SendMail(email, "Bạn Có Một Thông Báo Gia Sư Web", content);
    return res.json({
      status: true,
      type: "User",
      error: null,
      data: null,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "User",
      error: 5000,
      data: null,
    });
  }
};
module.exports.ConfirmOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const exists = await OTP.findOne({
      id_user: req.user.userId,
      otp: otp,
    });
    if (!exists) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const user = await User.findOne({
      _id: req.user.userId,
    });
    (user.deleted = false), await user.save();

    return res.json({
      status: true,
      type: "User",
      error: null,
      data: null,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "User",
      error: 500,
      data: null,
    });
  }
};

module.exports.PostTeacher = async (req, res) => {
  try {
    const { email, password, phone, name, age, Major, degree, cv } = req.body;
    const requiredFields = [
      "email",
      "password",
      "phone",
      "name",
      "age",
      "Major",
      "degree",
      "cv",
    ];
    const respondValidate = validate.isValidRequest(req.body, requiredFields);
    if (respondValidate == false) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const dataUser = {
      deleted: true,
      email: email,
      password: hashedPassword,
      phone: phone,
      role_id: "tea",
      created_at: helper.timenow(),
    };
    const newDataUser = new User(dataUser);
    await newDataUser.save();

    const dataTeacher = {
      user_id: newDataUser._id,
      degree: degree,
      major: Major,
      name: name,
      age: age,
      cv: cv,
      create_at: helper.timenow(),
    };
    const newDataTeacher = new Teacher(dataTeacher);
    await newDataTeacher.save();

    return res.json({
      status: true,
      type: "User",
      error: null,
      data: null,
    });
  } catch (error) {
    if (error.name == "MongoServerError") {
      return res.json({
        status: false,
        type: "Data",
        error: 300,
        data: null,
      });
    }
    return res.json({
      status: false,
      type: "User",
      error: 500,
      data: null,
    });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Account = await User.findOne({
      email: email,
      deleted: false,
    });
    const isMatch = await bcrypt.compare(password, Account.password);

    if (!isMatch) {
      return res.json({
        status: false,
        type: "User",
        error: 200,
        data: null,
      });
    }
    if (Account.status == 2) {
      return res.json({
        status: false,
        type: "Login",
        error: 800,
        data: null,
      });
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
      maxAge: 50 * 60 * 1000,
    });
    return res.json({
      status: true,
      type: "User",
      error: null,
      data: null,
    });
  } catch (error) {
    return res.json({
      status: false,
      type: "User",
      error: 500,
      data: null,
    });
  }
};

module.exports.logout = (req, res) => {
  try {
    res.cookie("Token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(0),
    });
    return res.json({
      status: true,
      type: "Login",
      error: null,
      data: [],
    });
  } catch (error) {
    return res.json({
      status: false,
      type: "Login",
      error: 500,
      data: null,
    });
  }
};
