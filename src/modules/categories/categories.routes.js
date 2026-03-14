const express = require("express")
const router = express.Router()
const cC = require("./categories.controller")
const cV = require("./validator/categories.validator")

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', cV.createValidator, cC.createCat)

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.put("/", cV.updateValidator, cC.updateCat);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', cC.getCats)

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get single categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', cC.getCat)

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", cC.deleteCat)

module.exports = router