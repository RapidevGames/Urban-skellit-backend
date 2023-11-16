const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const specs = require('./swaggerConfig'); 

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const locationsRoutes = require('./routes/location');
const catalogRoutes = require('./routes/catalog');
const ItemsRoutes = require('./routes/itemRoutes');


// Use routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/locations', locationsRoutes);
app.use('/catalog', catalogRoutes);
app.use('/items', ItemsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
