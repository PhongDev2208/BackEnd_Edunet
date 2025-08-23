const express = require("express");
const router = express.Router();
const controller = require("../controller/course.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
const authenticationTeacher = require("../middleware/authenticationTeacher");
const checkoverlapping = require("../middleware/checkoverlapping ");
router.get("/GetAll", controller.GetAll);
router.get("/GetCourseTea", authenticationTeacher, controller.GetCourseTea);
router.get("/Getdetailcourse/:key", controller.Getdetail);
router.get("/GetSchedule", authenticationStudent, controller.GetSchedule);
router.post("/Post", authenticationStudent, controller.Post);
router.patch("/edit", authenticationTeacher, controller.EditCourse);

module.exports = router;
