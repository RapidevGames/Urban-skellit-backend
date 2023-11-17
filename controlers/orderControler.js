const SquareBaseURL = require('../apiConstrains/apiList');

const createOrder = async (req, res) => {
  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is missing' });
    }
    const { idempotency_key, order } = req.body;

    // Destructure idempotency_key and order only if they exist in req.body

    // Check if required fields are present in the request body
    if (!idempotency_key || !order || !order.location_id) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    const response = await SquareBaseURL.post('/orders', {
      idempotency_key,
      order,
    });

    // Log the Square API response to the console
    console.log('141541');
    console.log(response.data);
    // Send the Square API response to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error placing Square order:', error.message);
    if (error.response && error.response.data) {
      console.error('Square API error response:', error.response.data);
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder
};
