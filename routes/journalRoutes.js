const express = require("express");

const{createEntry, getEntries, updateEntry, deleteEntry} = require('../controllers/journals');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createEntry);
router.get('/', auth , getEntries);
router.put('/:id', auth, updateEntry);
router.delete('/:id', auth, deleteEntry);

// router.use(auth);
// router.post('/', journalController.createJournal);
// router.get('/', journalController.getAllJournals);
// router.get('/:id', journalController.getJournalById);
// router.put('/:id', journalController.updateJournal);
// router.delete('/:id', journalController.deleteJournal);


module.exports = router;