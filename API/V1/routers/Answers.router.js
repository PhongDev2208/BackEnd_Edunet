const express = require("express")
const router = express.Router()
const controller = require("../controller/Answer.controller")
const Private = require("../middleware/Private")
router.get("/GetAll",Private.index,controller.GetAll)
router.get("/GetDetail",Private.index,controller.Detail)
router.post("/Post",Private.index,controller.Post)


module.exports = router
 