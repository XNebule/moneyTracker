const express = require("express");
const router = express.Router();

const {
  getCreds,
  getCred,
  regCred,
  delCred,
  loginCred,
} = require("./auth.controller");
const {
  registerValidator,
} = require("../../../middleware/validators/auth.validator");
const validate = require("../../../middleware/validate.middleware");

router.get("/", getCreds);
router.get("/:id", getCred);
router.post("/register", registerValidator, validate, regCred);
router.post("/login", loginCred);
router.delete("/:id", delCred);

module.exports = router;
