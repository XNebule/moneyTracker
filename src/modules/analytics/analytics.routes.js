const express = require("express")
const router = express.Router()
const aC = require("./analytics.controller")

router.get('/cashflow', aC.getCashflow)

module.exports = router