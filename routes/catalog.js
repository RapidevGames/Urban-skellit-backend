/**
 * @swagger
 * /catalog/location/{locationId}:
 *   get:
 *     summary: Get catalogs filtered by location
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         description: ID of the location to filter catalogs
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: '1'
 *                 name: 'Catalog 1'
 * 
 */
const express = require('express');
const router = express.Router();
const CatalogController = require('../controlers/catalogcontroler');

// Define location routes
router.get('/location/:locationId', CatalogController.filterCatalogsByLocation);

module.exports = router;
