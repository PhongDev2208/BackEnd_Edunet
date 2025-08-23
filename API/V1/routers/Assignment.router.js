const express = require("express");
const router = express.Router();
const controller = require("../controller/Assignment.controller");
const authenticationTeacher = require("../middleware/authenticationTeacher");
const authenticationStudent = require("../middleware/authenticationStudent");

router.get("/Getall/:id", authenticationStudent, controller.GetAll);
router.get("/GetDetail/:id", authenticationStudent, controller.GetDetail);
router.post("/Post", authenticationTeacher, controller.Post);

module.exports = router;
