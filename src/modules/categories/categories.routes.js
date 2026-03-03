const express = require("express")
const router = express.Router()
const authMid = require("../../../middleware/auth.middleware")
const { createCat, getCats, getCat, deleteCat } = require("./categories.controller")

router.post('/', createCat)
router.get('/', getCats)
router.get('/:id', getCat)
router.delete("/:id", deleteCat)

module.exports = router