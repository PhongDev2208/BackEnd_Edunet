const express = require("express");
const router = express.Router();
const controller = require("../controller/Submit.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
const authenticationTeacher = require("../middleware/authenticationTeacher");
router.get("/getall/:id", authenticationTeacher, controller.GetAll);
router.get("/getdetail/:id", authenticationTeacher, controller.GetDetail);
router.post("/Post", authenticationStudent, controller.Post);
module.exports = router;
