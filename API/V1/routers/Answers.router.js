const express = require("express")
const router = express.Router()
const controller = require("../controller/Answer.controller")
const authenticationStudent = require("../middleware/authenticationStudent")
router.get("/GetAll/:key",authenticationStudent,controller.GetAll)
router.get("/GetDetail/:key",authenticationStudent,controller.Detail)
router.post("/Post",authenticationStudent,controller.Post)


module.exports = router
 