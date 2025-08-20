// middlewares/auth_middleware.js
const jwt = require('jsonwebtoken');
const db = require('../models');
const { User } = db;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) return res.status(404).json({ error: 'User not found' });

    req.user = user; // ✅ This line MUST be here
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
