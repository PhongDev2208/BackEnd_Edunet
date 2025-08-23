const express = require("express");
const router = express.Router();
const controller = require("../controller/Review.controller");
const authenticationStudent = require("../middleware/authenticationStudent");
router.get("/GetAll/:id", controller.GetAll);
router.post("/Post", authenticationStudent, controller.Post);
module.exports = router;
