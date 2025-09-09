const express = require("express");
const router = express.Router();
const controller = require("../controller/Answer.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
router.get("/get-all/:key", authenticationStudent, controller.GetAll);
router.get("/get-detail/:key", authenticationStudent, controller.Detail);
router.post("/post", authenticationStudent, controller.Post);

module.exports = router;
