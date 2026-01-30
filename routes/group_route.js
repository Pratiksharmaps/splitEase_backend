const express = require('express');
const router = express.Router();
const {createGroup,getUserGroups,getGroupUsers, addUserToGroup} = require('../controllers/groupController');
const authMiddleware= require('../middlewares/auth_middleware');

router.get('/', (req, res) => {
  res.send('Hello from Group route');
});      

// ----------create-Group-Api
router.post('/createGroup',authMiddleware ,createGroup);
 
// ---------get-Users_group----------
router.get('/getUserGroups',authMiddleware,getUserGroups);

// ----Add User to Group ------
router.post('/addUser',authMiddleware,addUserToGroup);


// ----Get Group Users
router.post('/getGroupUsers',authMiddleware,getGroupUsers);

module.exports = router; 
 