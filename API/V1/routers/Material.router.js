const express = require("express")
const router = express.Router()
const controller = require("../controller/Material.controller")
const PrivateTea = require("../middleware/PrivateTea")
const private = require("../middleware/Private")
router.post("/Post",PrivateTea.index,controller.Post)
router.post("/PostChild",PrivateTea.index,controller.PostChildren)
router.get("/Getall",private.index ,controller.GetAll)
module.exports = router
