const express = require("express")
const router = express.Router()
const controller = require("../controller/Material.controller")
const AuthenticationTea = require("../middleware/AuthenticationTea")
const AuthenticationST = require("../middleware/AuthenticationST")
router.get("/Getall/:id",AuthenticationST ,controller.GetAll)
router.post("/Post",AuthenticationTea,controller.Post)
router.post("/PostChild",AuthenticationTea,controller.PostChildren)
module.exports = router
