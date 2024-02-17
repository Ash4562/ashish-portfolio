const { regiter } = require("../controller/emailController")

const router = require("express").Router()
router
    .post("/send-email", regiter)
module.exports = router