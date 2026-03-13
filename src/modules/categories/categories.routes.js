const express = require("express")
const router = express.Router()
const cC = require("./categories.controller")
const cV = require("./validator/categories.validator")

router.post('/', cV.createValidator, cC.createCat)
router.put("/", cV.updateValidator, cC.updateCat);
router.get('/', cC.getCats)
router.get('/:id', cC.getCat)
router.delete("/:id", cC.deleteCat)

module.exports = router