const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const specs = require('./swaggerConfig'); 

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const locationsRoutes = require('./routes/locationRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const itemsRoutes = require('./routes/itemRoutes');
const ordresRoutes = require('./routes/orderRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/locations', locationsRoutes);
app.use('/catalog', catalogRoutes);
app.use('/items', itemsRoutes);
app.use('/orders', ordresRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
