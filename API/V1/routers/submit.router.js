const express = require("express")
const router = express.Router()
const controller = require("../controller/Submit.controller")
const AuthenticationST = require("../middleware/AuthenticationST")
const AuthenticationTea = require("../middleware/AuthenticationTea")
router.get("/getall/:id",AuthenticationTea,controller.GetAll)
router.get("/getdetail/:id",AuthenticationTea, controller.GetDetail)
router.post("/Post",AuthenticationST,controller.Post)
module.exports = router
