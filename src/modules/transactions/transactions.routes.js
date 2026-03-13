const express = require("express");
const router = express.Router();
const tC = require("./transactions.controller");

router.post("/", tC.createTransaction);
router.get("/", tC.getTransactions);
router.get("/:id", tC.getTransaction);
router.put("/:id", tC.updateTransaction);
router.delete("/:id", tC.deleteTransaction);

module.exports = router;