const db = require('../models');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const { User } = db;
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const getProfile = async (req, res) =>{
  console.log('Headers:', req.headers);
console.log('Body:', req.body);
console.log("req.body =", req.body); 
  // const { email } = req.body;
   if (!req.user) {
      return res.status(401).json({ error: 'User not attached to request' });
    }

  try {
    const user =req.user;
    // const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist!' });
    }
    return res.status(200).json({
      statusCode: 200,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      user_group: user.groups,
      favorites: user.favFriends,
      profilePicUrl: user.profilePicUrl,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'Server failed to fulfill request.',
    });
  }
};

const addProfilePic = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not attached to request' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // clean up local file

    req.user.profilePicUrl = result.secure_url;
    await req.user.save();

    res.status(200).json({
      message: 'Profile picture uploaded successfully',
      url: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image upload failed' });
  }
};

module.exports = { getProfile,addProfilePic};
