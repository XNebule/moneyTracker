const express = require("express")
const router = express.Router()

const { getExps, getExp, inputExp, deleteExp, updateExp } = require("../controllers/expensesController")

router.get("/", getExps)
router.get("/:id", getExp)
router.post("/", inputExp)
router.delete("/:id", deleteExp)
router.put("/:id", updateExp)

module.exports = router