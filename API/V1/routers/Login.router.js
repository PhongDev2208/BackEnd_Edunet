const express = require("express")
const router = express.Router()
const controller = require("../controller/Login.controller")
router.post("/",controller.GetAll)


module.exports = router
