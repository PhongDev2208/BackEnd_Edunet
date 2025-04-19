const express = require("express")
const router = express.Router()
const controller = require("../controller/Topic.controller")
const PrivateRouter = require("../middleware/Private")
router.get("/GetAll",PrivateRouter.index,controller.GetAll)
module.exports = router
