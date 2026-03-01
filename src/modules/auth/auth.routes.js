const express = require("express")
const router = express.Router()

const { getCreds, getCred, regCred, delCred, loginCred } = require("./auth.controller");

router.get("/", getCreds)
router.get("/:id", getCred)
router.post("/register", regCred)
router.post("/login", loginCred)
router.delete("/:id", delCred)

module.exports = router