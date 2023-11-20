const SquareBaseURL = require("../apiConstrains/apiList");

const createOrder = async (req, res) => {
  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }
    const { idempotency_key, order } = req.body;

    // Check if required fields are present in the request body
    if (!idempotency_key || !order || !order.location_id) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const response = await SquareBaseURL.post("/orders", {
      idempotency_key,
      order,
    });

    // Log the Square API response to the console
    console.log("141541");
    console.log(response.data);
    // Send the Square API response to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error placing Square order:", error.message);
    if (error.response && error.response.data) {
      console.error("Square API error response:", error.response.data);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
};

// {
// "idempotency_key": "bfe1e216-cff2-43e6-8a6a-458b35d72537",
// "order": {
// "location_id": "L6802Q6YS5C32",
// "customer_id": "7P5JW2RG5F1R6CXKDTSPRFE7S4",
// "fulfillments": [
// {
// "state": "PROPOSED",
// "type": "DELIVERY",
// "uid": "6465476546546",
// "delivery_details": {
// "recipient": {
// "customer_id": "7P5JW2RG5F1R6CXKDTSPRFE7S4",
// "display_name": "Muhammad Osama",
// "email_address": "usmahafiz8@gmail.com",
// "phone_number": "+923326551460",
// "address": {
// "address_line_1": "address 1",
// "postal_code": "5060"
// }
// },
// "deliver_at": "2023-11-20T07:17:14.814Z"
// }
// }
// ],
// "line_items": [
// {
// "quantity": "1",
// "base_price_money": {
// "amount": 12,
// "currency": "USD"
// },
// "name": "burger roll"
// }
// ]
// }
// }
