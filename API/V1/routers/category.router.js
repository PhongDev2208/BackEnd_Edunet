const express = require("express")
const router = express.Router()
const controller = require("../controller/category.controller")
router.get("/GetAll",controller.GetAll)


module.exports = router
