const express = require("express")
const router = express.Router()
const controller = require("../controller/Assignment.controller")
const PrivateTea = require("../middleware/PrivateTea")
const Private = require("../middleware/Private")
router.post("/Post",PrivateTea.index,controller.Post)
router.get("/Getall/:id",Private.index,controller.GetAll)
router.get("/GetDetail/:id",Private.index,controller.GetDetail)
module.exports = router
 