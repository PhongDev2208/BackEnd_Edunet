const express = require("express");
const router = express.Router();
const controller = require("../controller/Review.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
router.get("/get-all/:id", controller.GetAll);
router.post("/post", authenticationStudent, controller.Post);
module.exports = router;
