const express = require("express")
const router = express.Router()
const controller = require("../controller/Review.controller")
const AuthenticationST = require("../middleware/AuthenticationST")
router.get("/GetAll/:id",controller.GetAll)
router.post("/Post",AuthenticationST,controller.Post)
module.exports = router
