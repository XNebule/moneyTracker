const express = require("express");
const router = express.Router();

const aC = require("./auth.controller");
const aV = require("./validator/auth.validator")
const validate = require("../../../middleware/validate.middleware");

router.get("/", aC.getCreds);
router.get("/:id", aC.getCred);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/register", aV.registerValidator, validate, aC.regCred);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login success
 */
router.post("/login", aV.loginValidator, aC.loginCred);
router.delete("/:id", aC.delCred);

module.exports = router;
