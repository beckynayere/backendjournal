const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.register = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };  
  exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
     
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
    
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
     
      res.status(200).json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
