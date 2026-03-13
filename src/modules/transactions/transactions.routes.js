const express = require("express");
const router = express.Router();
const tC = require("./transactions.controller");
const tV = require("./validator/transactions.validator")

router.post("/", tV.createTransactionValidator, tC.createTransaction);
router.get("/", tC.getTransactions);
router.get("/:id", tC.getTransaction);
router.put("/:id", tV.updateTransactionValidator, tC.updateTransaction);
router.delete("/:id", tC.deleteTransaction);

module.exports = router;