const express = require("express");
const router = express.Router();
const controller = require("../controller/course.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
const authenticationTeacher = require("../middleware/authenticationTeacher");
const checkoverlapping = require("../middleware/checkoverlapping ");
router.get("/get-all", controller.GetAll);
router.get("/get-course-tea", authenticationTeacher, controller.GetCourseTea);
router.get("/get-detail-course/:key", controller.Getdetail);
router.get("/get-schedule", authenticationStudent, controller.GetSchedule);
router.post("/post", authenticationStudent, controller.Post);
router.patch("/edit", authenticationTeacher, controller.EditCourse);

module.exports = router;
