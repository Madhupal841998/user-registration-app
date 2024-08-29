const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email, password, phone, profession } = req.body;
  try {
    const user = new User({ name, email, password, phone, profession });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'User registration failed!' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password!' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed!' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users!' });
  }
};

exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, profession } = req.body;
  
      if (!name || !phone) {
        return res.status(400).json({ message: 'Name and phone number are required.' });
      }
      console.log(profession)
  
      const user = await User.findByIdAndUpdate(id, { name, phone, profession }, { new: true });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({ message: 'User updated successfully.', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
    
        res.status(200).json({ message: 'User deleted successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
};
