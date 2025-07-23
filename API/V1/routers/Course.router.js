const express = require("express")
const router = express.Router()
const controller = require("../controller/course.controller")
const AuthenticationST = require("../middleware/AuthenticationST")
const AuthenticationTea = require("../middleware/AuthenticationTea")
const checkoverlapping = require("../middleware/checkoverlapping ")
router.get("/GetAll",controller.GetAll)
router.get("/GetCourseTea",AuthenticationTea,controller.GetCourseTea)
router.get("/Getdetailcourse/:key" , controller.Getdetail)
router.get("/GetSchedule",AuthenticationST,controller.GetSchedule)
router.post("/Post",AuthenticationST,controller.Post)
router.patch("/edit",AuthenticationTea,controller.EditCourse)

module.exports = router
