const express = require('express');
const router = express.Router();
const {signUp, verifyOtp,login,forgotPassword,resetPassword} = require('../controllers/authController.js');





router.get('/', (req, res) => {
  res.send('Hello from Auth route');
});       

//----------------------------------------Signup Route 
router.post('/signUp',signUp);
       
//-------------------------------------------otp verification--
router.post('/verify-otp',verifyOtp);

//-----------------------------Login-Api--------------------
router.post('/user-login',login);

// --------------------Forgot-password-----------------
router.post('/forgot-password',forgotPassword);

// -----------------------_Reset-password----------------------
router.post('/reset-password',resetPassword);


module.exports = router; 