const express = require("express")
const router = express.Router()
const authMid = require("../../../middleware/auth.middleware");
const { getExps, getExp, inputExp, deleteExp, updateExp } = require("./expenses.controller")

router.use(authMid);
router.post("/", inputExp)
router.get("/", getExps)
router.get("/:id", getExp)
router.delete("/:id", deleteExp)
router.put("/:id", updateExp)

module.exports = router