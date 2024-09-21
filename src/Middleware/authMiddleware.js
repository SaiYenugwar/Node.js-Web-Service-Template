const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const dotenv = require('dotenv');

dotenv.config();

exports.authenticateToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET);

      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      // console.error(err);
      res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: Token missing' });
  }
};
