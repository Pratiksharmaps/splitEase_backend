const express = require('express');
const router = express.Router();
const {createGroup} = require('../controllers/groupController');
const authMiddleware= require('../middlewares/auth_middleware');

router.get('/', (req, res) => {
  res.send('Hello from Group route');
});      

// ----------create-Group-Api
router.post('/createGroup',authMiddleware  ,createGroup); 

module.exports = router; 
