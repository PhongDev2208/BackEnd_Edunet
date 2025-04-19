const express = require("express")
const router = express.Router()
const controller = require("../controller/course.controller")
const private = require("../middleware/Private")
const privateTea = require("../middleware/PrivateTea")
router.get("/GetAll",controller.GetAll)
router.post("/Post",private.index,controller.Post)
router.get("/GetCourseTea",privateTea.index,controller.GetCourseTea)
router.get("/Getdetailcourse" , controller.Getdetail)
router.get("/GetSchedule",private.index,controller.GetSchedule)
router.patch("/edit",privateTea.index,controller.EditCourse)

module.exports = router
