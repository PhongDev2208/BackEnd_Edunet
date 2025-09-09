const express = require("express");
const router = express.Router();
const controller = require("../controller/category.controller");
router.get("/get-all", controller.GetAll);

module.exports = router;
