const nodemailer = require('nodemailer');

const sender = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for port 465, false for other ports

service: 'gmail',

  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASS,  // Consider storing in .env for security
  },
});

const sendVerificationEmail = (to, otp) => {

  // console.log(process.env.MAILER_EMAIL)
  // console.log(process.env.MAILER_PASS)
  
  const mailOptions = {  
    from: process.env.MAIL_TO,
    to: to,
    subject: 'Your OTP for SplitEase',
    html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  };
  return sender.sendMail(mailOptions);
};

module.exports = sendVerificationEmail; 