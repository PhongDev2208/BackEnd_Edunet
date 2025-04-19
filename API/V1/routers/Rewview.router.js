const express = require("express")
const router = express.Router()
const controller = require("../controller/Review.controller")
const private = require("../middleware/Private")

router.get("/GetAll",controller.GetAll)

router.post("/Post",private.index,controller.Post)


module.exports = router
