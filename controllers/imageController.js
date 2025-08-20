const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const uploadImage = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'Image uploaded successfully!',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed'});
  }
};

module.exports = { uploadImage };
