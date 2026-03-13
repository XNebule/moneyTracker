const express = require("express");
const router = express.Router();

const aC = require("./auth.controller");
const {
  registerValidator,
} = require("../../../middleware/validators/auth.validator");
const validate = require("../../../middleware/validate.middleware");

router.get("/", aC.getCreds);
router.get("/:id", aC.getCred);
router.post("/register", registerValidator, validate, aC.regCred);
router.post("/login", aC.loginCred);
router.delete("/:id", aC.delCred);

module.exports = router;
