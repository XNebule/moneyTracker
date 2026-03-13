const express = require("express");
const router = express.Router();
const dC = require("./dashboards.controller");

router.get("/", dC.getDashboard);

module.exports = router;
