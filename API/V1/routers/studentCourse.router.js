const express = require("express");
const router = express.Router();
const controller = require("../controller/studentCourse.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
const authenticationTeacher = require("../middleware/authenticationTeacher");
const checkoverlapping = require("../middleware/checkoverlapping ");
router.get(
  "/get-student-course",
  authenticationStudent,
  controller.GetstudentCourse
);
router.get("/get-student/:id", authenticationStudent, controller.GetStudent);
router.get(
  "/get-schedule-student",
  authenticationStudent,
  controller.GetscheduleStudent
);
router.post(
  "/register-studen-course",
  authenticationStudent,
  checkoverlapping,
  controller.registerstudencourse
);
router.patch("/edit-status", authenticationTeacher, controller.editstatus);
module.exports = router;
