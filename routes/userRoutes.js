
const express = require('express');
const { updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

// router.put('/profile', auth, updateProfile);

router.use(auth);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;
