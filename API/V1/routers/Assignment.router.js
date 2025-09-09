const express = require("express");
const router = express.Router();
const controller = require("../controller/Assignment.controller");
const authenticationTeacher = require("../middleware/authenticationTeacher");
const authenticationStudent = require("../middleware/authenticationStudent");

router.get("/get-all/:id", authenticationStudent, controller.GetAll);
router.get("/get-detail/:id", authenticationStudent, controller.GetDetail);
router.post("/post", authenticationTeacher, controller.Post);

module.exports = router;
