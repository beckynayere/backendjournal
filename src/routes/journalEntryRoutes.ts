import { Router } from "express";
import { JournalEntryController } from "../controllers/JournalEntryController";
import { checkJwt } from '../middlewares/checkJwt';
import JournalEntry from '../models/journalEntry';

const router = Router();

const journalEntry = new JournalEntry();

router.post("/", [checkJwt], JournalEntryController.createEntry);
router.get("/", [checkJwt], JournalEntryController.getEntries);
router.put("/:id", [checkJwt], JournalEntryController.updateEntry);
router.delete("/:id", [checkJwt], JournalEntryController.deleteEntry);

export default router;

// import { Router } from 'express';
// import { checkJwt } from '../middlewares/checkJwt'; // Ensure casing matches file name
// import { JournalEntry } from '../models/journalEntry';
// import { User } from '../models/User';

// const router = Router();

// router.post('/entries', checkJwt, async (req, res) => {
//   const { title, content, category, date, userId } = req.body;
//   try {
//     const user = await User.findOne(userId);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     const entry = new JournalEntry();
//     entry.title = title;
//     entry.content = content;
//     entry.category = category;
//     entry.date = new Date(date);
//     entry.user = user;
//     await entry.save();
//     res.status(201).send(entry);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.get('/entries', checkJwt, async (req, res) => {
//   try {
//     const entries = await JournalEntry.find({ relations: ['user'] });
//     res.status(200).send(entries);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// export default router;
