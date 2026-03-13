const express = require("express")
const router = express.Router()
const cC = require("./categories.controller")

router.post('/', cC.createCat)
router.get('/', cC.getCats)
router.get('/:id', cC.getCat)
router.delete("/:id", cC.deleteCat)

module.exports = router