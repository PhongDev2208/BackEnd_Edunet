const express = require("express")
const router = express.Router()
const controller = require("../controller/Answer.controller")
const AuthenticationST = require("../middleware/AuthenticationST")
router.get("/GetAll/:key",AuthenticationST,controller.GetAll)
router.get("/GetDetail/:key",AuthenticationST,controller.Detail)
router.post("/Post",AuthenticationST,controller.Post)


module.exports = router
 