/**
 * @swagger

 * /orders/create:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             idempotency_key: '8193148c-9586-11e6-99f9-28cfe92138cf'
 *             order:
 *               reference_id: 'my-order-001'
 *               location_id: '057P5VYJ4A5X1'
 *               line_items:
 *                 - name: 'New York Strip Steak'
 *                   quantity: '1'
 *                   base_price_money:
 *                     amount: 1599
 *                     currency: 'USD'
 *                 - quantity: '2'
 *                   catalog_object_id: 'BEMYCSMIJL46OCDV4KYIKXIB'
 *                   modifiers:
 *                     - catalog_object_id: 'CHQX7Y4KY6N5KINJKZCFURPZ'
 *                   applied_discounts:
 *                     - discount_uid: 'one-dollar-off'
 *               taxes:
 *                 - uid: 'state-sales-tax'
 *                   name: 'State Sales Tax'
 *                   percentage: '9'
 *                   scope: 'ORDER'
 *               discounts:
 *                 - uid: 'labor-day-sale'
 *                   name: 'Labor Day Sale'
 *                   percentage: '5'
 *                   scope: 'ORDER'
 *                 - uid: 'membership-discount'
 *                   catalog_object_id: 'DB7L55ZH2BGWI4H23ULIWOQ7'
 *                   scope: 'ORDER'
 *                 - uid: 'one-dollar-off'
 *                   name: 'Sale - $1.00 off'
 *                   amount_money:
 *                     amount: 100
 *                     currency: 'USD'
 *                   scope: 'LINE_ITEM'
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             
 */

const express = require('express');
const router = express.Router();
const ordersController = require('../controlers/orderControler');


// Define order route
router.post('/create', ordersController.createOrder);

module.exports = router;
