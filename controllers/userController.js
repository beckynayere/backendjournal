const res = require('express/lib/response');
const User = require('../models/user');
const updateProfile = async(req, res) => {
    try {
        const {username, newPassword } = req.body;
        const user = await User.findByPk(req.user.id);

        if (username) user.username = username;
        if (newPassword) user.password = newPassword

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateProfile };