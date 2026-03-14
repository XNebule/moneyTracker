
const express = require("express");
const router = express.Router();
const tC = require("./transactions.controller");
const tV = require("./validator/transactions.validator");

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post("/", tV.createTransactionValidator, tC.createTransaction);

/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/", tC.getTransactions);

/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Get single transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/:id", tC.getTransaction);

/**
 * @swagger
 * /transaction/{id}:
 *   put:
 *     summary: Update transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", tV.updateTransactionValidator, tC.updateTransaction);

/**
 * @swagger
 * /transaction/{id}:
 *   delete:
 *     summary: Delete transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", tC.deleteTransaction);

module.exports = router;
