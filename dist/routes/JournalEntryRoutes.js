"use strict";
// import { Router } from "express";
// import { JournalEntryController } from "../controllers/JournalEntryController";
// import { checkJwt } from '../middlewares/checkJwt';
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.post("/", [checkJwt], JournalEntryController.createEntry);
// router.get("/", [checkJwt], JournalEntryController.getEntries);
// router.put("/:id", [checkJwt], JournalEntryController.updateEntry);
// router.delete("/:id", [checkJwt], JournalEntryController.deleteEntry);
// export default router;
const express_1 = require("express");
const checkJwt_1 = require("../middlewares/checkJwt"); // Ensure casing matches file name
const journal_1 = require("../models/journal");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.post('/entries', checkJwt_1.checkJwt, async (req, res) => {
    const { title, content, category, date, userId } = req.body;
    try {
        const user = await User_1.User.findOne(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const entry = new journal_1.JournalEntry();
        entry.title = title;
        entry.content = content;
        entry.category = category;
        entry.date = new Date(date);
        entry.user = user;
        await entry.save();
        res.status(201).send(entry);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.get('/entries', checkJwt_1.checkJwt, async (req, res) => {
    try {
        const entries = await journal_1.JournalEntry.find({ relations: ['user'] });
        res.status(200).send(entries);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.default = router;
