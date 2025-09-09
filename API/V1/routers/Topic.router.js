const express = require("express");
const router = express.Router();
const controller = require("../controller/Topic.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
router.get("/get-all/:key", authenticationStudent, controller.GetAll);
module.exports = router;
