const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth_middleware');
const {getProfile, addProfilePic} = require('../controllers/profileController');
const upload = require('../utils/multer');
// -------------------------Get-User_profile-------------

router.post('/t',(req,res)=>{
    console.log('rprofileeeee');
}

);

router.get('/getProfile',authMiddleware,getProfile); 
router.post('/upload-image',authMiddleware,upload.single('image'),addProfilePic);

module.exports = router;