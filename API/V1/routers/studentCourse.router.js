const express = require("express");
const router = express.Router();
const controller = require("../controller/studentCourse.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
const authenticationTeacher = require("../middleware/authenticationTeacher");
const checkoverlapping = require("../middleware/checkoverlapping ");
router.get(
  "/Getstudentcourse",
  authenticationStudent,
  controller.GetstudentCourse
);
router.get("/GetStudent/:id", authenticationStudent, controller.GetStudent);
router.get(
  "/GetscheduleStudent",
  authenticationStudent,
  controller.GetscheduleStudent
);
router.post(
  "/registerstudencourse",
  authenticationStudent,
  checkoverlapping,
  controller.registerstudencourse
);
router.patch("/editstatus", authenticationTeacher, controller.editstatus);
module.exports = router;
