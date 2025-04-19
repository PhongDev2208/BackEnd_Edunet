const express = require("express")
const router = express.Router()
const controller = require("../controller/User.controller")
const Private = require("../middleware/Private")
router.get("/Getdetail",Private.index,controller.Getdetail)
router.post("/Post",controller.Post)
router.post("/confirmOTP", Private.index,controller.ConfirmOTP)
router.post("/Post/teacher",controller.PostTeacher)
module.exports = router
