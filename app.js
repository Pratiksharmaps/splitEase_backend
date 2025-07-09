const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const authRoutes = require('./routes/authRoutes.js');

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env_prod' : '.env_dev',
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  res.send('Node API Running');
});

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/services', serviceRoutes);

module.exports = app;
