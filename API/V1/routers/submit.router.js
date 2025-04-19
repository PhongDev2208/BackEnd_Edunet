const express = require("express")
const router = express.Router()
const controller = require("../controller/Submit.controller")
const PrivateRouter = require("../middleware/Private")
const PrivateTea = require("../middleware/PrivateTea")
router.get("/getall/:id",PrivateTea.index,controller.GetAll)
router.get("/getdetail/:id",PrivateTea.index, controller.GetDetail)
router.post("/Post",PrivateRouter.index,controller.Post)
module.exports = router
