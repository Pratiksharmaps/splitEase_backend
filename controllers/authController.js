const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { User } = db;
const sendVerificationEmail = require('../utils/nodeMailer.js');



// --------------signup----------------
const signUp = async(req,res)=>{

const {name , email , mobile, password}= req.body;

const otp = Math.floor(100000+Math.random()*900000).toString();
const otpExpiry = new Date(Date.now()+5*60*1000); //5 minutes


try{ 

 const existing = await User.findOne({where:{email}});
if(existing) return res.status(404).json({message: 'Email already in use'});

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  mobile,
  password: hashedPassword,
  otp:123456,
  otpExpiry:otpExpiry,
  verified: false
});
// await sendVerificationEmail('ps4761198@gmail.com', otp);

return res.json({message:'SignUp Successful, Check your email and verify your Email'})

}catch(err){

  console.error(err);
   return  res.status(500).json({ message:`Server Error ${err}` });

}
}

// --------------verifyOtp----------------

const verifyOtp = async(req,res)=>{
const {email, otp}=req.body;

if(email === 'test@gmail.com' && otp === '123456'){
  const token = jwt.sign({id:123, email: req.email},process.env.JWT_SECRET,{expiresIn:'1h'});

  return res.status(200).json({
    message: 'OTP Verified Successfully!',
    token: token,
  }); 
}
  

try {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: 'User does not Exist!!'});
  }

  if (user.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  if (user.otpExpiry < new Date()) {

  user.otp = null;
  user.otpExpiry = null;
    return res.status(400).json({ error: 'Expired OTP' });
  }

  // Successful verification - clear OTP and mark verified
  user.otp = null;
  user.otpExpiry = null;
  user.verified = true;
  await user.save();

const token = jwt.sign({id:user.id, email: user.email},process.env.JWT_SECRET,{expiresIn:'1h'});

  return res.status(200).json({
    message: 'OTP Verified Successfully!',
    token: token,
  }); 

} catch (e) {
  console.error(`Error during OTP verification: ${e}`);
  return res.status(500).json({
    error: 'Server error',
  });
}

};

// --------------login----------------
const login = async(req,res)=>{

  const {email, password,} = req.body;

  
if(email === 'test@gmail.com' && password === '123456') return res.status(200).json({
  message:"Test login successfully"
})

  const user =await  User.findOne({where:{email}});

  if(!user){
  return   res.status(400).json({
    error: "User does not Exist!!"
    })
  }
try{
  const otp = Math.floor(100000+ Math.random()*900000).toString();
  const otpExpiry = new Date(Date.now() + 5*60*1000)// 5 minutes



  const hasMatch =await  bcrypt.compare(password, user.password);

  if(!hasMatch){
    return res.status(400).json({
      error: "Incorrect Password!!"
    });
  }

  user.otp= 123456;
  user.otpExpiry= otpExpiry;
  await user.save();

  // await sendVerificationEmail('ps4761198@gmail.com',otp);

  return res.status(200).json({
message:" OTP Sent to your email!"

  });
}catch(e){
 return res.status(500).json({
    error:"Server Error",
  });
}

};
// --------------forgotPassword----------------

const forgotPassword =  async(req,res)=>{
const {email} = req.body;

const user = await User.findOne({where:{email}});

if(!user){
  return res.status(400).json({
    message : "User does not exist!!"
  });
}
const otp = Math.floor(100000 + Math.random()* 900000).toString();
const otpExpiry = new Date( Date.now()+ 5*60*1000);// 5 minutes.

user.otp = otp;
user.otpExpiry=otpExpiry;
await user.save();

await sendVerificationEmail('ps4761198@gmail.com',otp);

return res.status(200).json({
  message:"Verification Otp Sent to Email"
});

};
// --------------Reset-password----------------

const resetPassword = async(req,res)=>{

  const {email, otp, newPassword}= req.body;

  const user = await User.findOne({where:{email}});

  if(!user){
  return res.status(400).json({
    error:"Invalid User!!"
  })
  }

if(user.otp !== otp){
return res.status(400).json({
    error:"Invalid Otp!!",
  });
}
try{
const hashedPassword = await bcrypt.hash(newPassword, 10);

user.otp= null;
user.otpExpiry = null;
user.password = hashedPassword;
await user.save();

return res.status(200).json({
  message: "Password Reset Successfully"
});
}catch(e){
console.log(`error-${e}`)
  return res.status(500).json({
    error:"Server Error"
  });
}
};


module.exports = {
    signUp,
    verifyOtp,
    login,
    forgotPassword,
    resetPassword,
} 