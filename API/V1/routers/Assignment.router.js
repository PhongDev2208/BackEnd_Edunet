const express = require("express")
const router = express.Router()
const controller = require("../controller/Assignment.controller")
const AuthenticationTea = require("../middleware/AuthenticationTea")
const AuthenticationST = require("../middleware/AuthenticationST")

router.get("/Getall/:id",AuthenticationST,controller.GetAll)
router.get("/GetDetail/:id",AuthenticationST,controller.GetDetail)
router.post("/Post",AuthenticationTea,controller.Post)

module.exports = router
 