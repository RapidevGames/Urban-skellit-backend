/**
 * @swagger
 * /locations/list:
 *   get:
 *     summary: Get a list of locations
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: '1'
 *                 name: 'Location 1'
 *               - id: '2'
 *                 name: 'Location 2'
 */
const express = require('express');
const router = express.Router();
const locationsController = require('../controlers/locationControler');

// Define location routes
router.get('/list', locationsController.listLocations);

module.exports = router;
