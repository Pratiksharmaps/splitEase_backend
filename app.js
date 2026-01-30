const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const authRoutes = require('./routes/authRoutes.js');
const profileRoutes = require('./routes/profileRoute.js');
const imageRoutes = require('./routes/imageRoute.js');
// const cloudinary = require('cloudinary').v2
const groupRoutes = require('./routes/group_route.js');
const path = require('path');
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env_prod' : '.env_dev',
});

const app = express();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  res.send('Node API Running');
});
app.get('/check-headers', (req, res) => {
  res.json({
    headers: req.headers
  });
});

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/images',imageRoutes)
app.use('/api/group',groupRoutes);
module.exports = app;
