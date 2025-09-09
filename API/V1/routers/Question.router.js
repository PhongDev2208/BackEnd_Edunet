const express = require("express");
const router = express.Router();
const controller = require("../controller/Question.controller");
router.get("/get-all/:key", controller.GetAll);
router.post("/post", controller.Post);

module.exports = router;
