const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    const existingUserName = await User.findOne({ username });

    if (existingUser) {
      return res.status(200).json({ message: 'User Already Exists', success: false });
    }

    if (existingUserName) {
      return res.status(200).json({ message: 'Username is already taken', success: false });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.status(200).json({ message: 'Registration successful', success: true });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};




exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(200).json({ message: 'User does not exist', success: false });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(200).json({ message: 'Incorrect Password', success: false });
    }

    if (!existingUser.isActive) {
      return res.status(200).json({ message: 'Your account is deactivated', success: false });
    }

    existingUser.lastLogin = new Date();
    await existingUser.save();


    const token = jwt.sign({ userId: existingUser._id, username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });


    res.status(200).json({ message: 'Login Successful', success: true, username: existingUser.username, email: email, token: token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};



