const express = require("express")
const router = express.Router()
const aC = require("./analytics.controller")

router.get('/cashflow', aC.getCashflow)
router.get('/monthly-expenses', aC.getMonthlyExpenses)
router.get('/category-breakdown', aC.getCatBreakdown)

module.exports = router