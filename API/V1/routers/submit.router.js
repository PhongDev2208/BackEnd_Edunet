const express = require("express");
const router = express.Router();
const controller = require("../controller/Submit.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
const authenticationTeacher = require("../middleware/authenticationTeacher");
router.get("/get-all/:id", authenticationTeacher, controller.GetAll);
router.get("/get-detail/:id", authenticationTeacher, controller.GetDetail);
router.post("/post", authenticationStudent, controller.Post);
module.exports = router;
