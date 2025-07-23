const express = require("express")
const router = express.Router()
const controller = require("../controller/Topic.controller")
const AuthenticationST = require("../middleware/AuthenticationST")
router.get("/GetAll/:key",AuthenticationST,controller.GetAll)
module.exports = router
