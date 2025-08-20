const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const authRoutes = require('./routes/authRoutes.js');
const profileRoutes = require('./routes/profileRoute.js');
const imageRoutes = require('./routes/imageRoute.js');
const cloudinary = require('cloudinary').v2

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
app.use('/api/profile',profileRoutes);
app.use('/api/images',imageRoutes)

module.exports = app;
