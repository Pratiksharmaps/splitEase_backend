const express = require('express');
const router = express.Router();
const {signUp, verifyOtp,login,forgotPassword,resetPassword} = require('../controllers/authController.js');

// const authMiddleWare = require('../middlewares/auth_middleware.js')



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

router.get('/bg', async (req, res) => {
  const now = new Date().toISOString();

  console.log(`[${now}] bg called api loggingggg---`);

  res.status(200).json({
    success: true,
    time: now,
    message: 'bg api called',
  });
});
router.get('/sg', async (req, res) => {
  const now = new Date().toISOString();

  console.log(`[${now}] bg called api errorr6trty. ojijiloggingggg---`);

  res.status(200).json({
    success: true,
    time: now,
    message: 'bg api called',
  });
});

router.post('/hg', (req, res) => {
  const now = new Date().toISOString();
  const { error, screen, userId, appVersion } = req.body;

  console.error(
    `[${now}] Mobile Error |
     error: ${error}
     screen: ${screen}
     userId: ${userId}
     appVersion: ${appVersion}`
  );

  res.status(200).send(`Error logged at ${now}`);
});


module.exports = router; 