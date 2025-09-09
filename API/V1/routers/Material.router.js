const express = require("express");
const router = express.Router();
const controller = require("../controller/Material.controller");
const authenticationTeacher = require("../middleware/authenticationTeacher");
const authenticationStudent = require("../middleware/authenticationStudent");
router.get("/get-all/:id", authenticationStudent, controller.GetAll);
router.post("/post", authenticationTeacher, controller.Post);
router.post("/post-child", authenticationTeacher, controller.PostChildren);
module.exports = router;
