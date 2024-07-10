const express = require("express");

const{createEntry, getEntries, updateEntry, deleteEntry} = require('../controllers/journals');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createEntry);
router.get('/', auth , getEntries);
router.put('/:id', auth, updateEntry);
router.delete('/:id', auth, deleteEntry);

module.exports = router;