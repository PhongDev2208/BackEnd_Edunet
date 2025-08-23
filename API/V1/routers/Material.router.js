const express = require("express");
const router = express.Router();
const controller = require("../controller/Material.controller");
const authenticationTeacher = require("../middleware/authenticationTeacher");
const authenticationStudent = require("../middleware/authenticationStudent");
router.get("/Getall/:id", authenticationStudent, controller.GetAll);
router.post("/Post", authenticationTeacher, controller.Post);
router.post("/PostChild", authenticationTeacher, controller.PostChildren);
module.exports = router;
