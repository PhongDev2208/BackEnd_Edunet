const express = require("express")
const router = express.Router()
const controller = require("../controller/Stu_course.controller")
const PrivateRouter = require("../middleware/Private")
const privateTea = require("../middleware/PrivateTea")
const privatecourse = require("../middleware/PrivateCourse")
router.get("/GetCourse",PrivateRouter.index,controller.GetCourse)
router.get("/GetStudent",PrivateRouter.index,controller.GetStudent)
router.post("/",PrivateRouter.index,privatecourse.CheckSchedule,controller.Post)
router.patch("/editstatus",privateTea.index,controller.editstatus)
router.get("/GetscheduleStudent", PrivateRouter.index,controller.GetscheduleStudent)

module.exports = router
