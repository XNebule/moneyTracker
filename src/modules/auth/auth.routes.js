const express = require("express");
const router = express.Router();

const aC = require("./auth.controller");
const aV = require("./validator/auth.validator")
const validate = require("../../../middleware/validate.middleware");

router.get("/", aC.getCreds);
router.get("/:id", aC.getCred);
router.post("/register", aV.registerValidator, validate, aC.regCred);
router.post("/login", aV.loginValidator, aC.loginCred);
router.delete("/:id", aC.delCred);

module.exports = router;
