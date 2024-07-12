const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Define routes
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);

module.exports = router;
