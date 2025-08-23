const express = require("express");
const router = express.Router();
const controller = require("../controller/Topic.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
router.get("/GetAll/:key", authenticationStudent, controller.GetAll);
module.exports = router;
