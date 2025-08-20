const express = require('express');
const router = express.Router();
const upload = require('../utils/multer'); 
const auth_middleware = require('../middlewares/auth_middleware')
const {uploadImage} = require('../controllers/imageController')

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router; 