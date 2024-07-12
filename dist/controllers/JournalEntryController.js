"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntryController = void 0;
const JournalEntry_1 = require("../entities/JournalEntry");
const User_1 = require("../entities/User");
class JournalEntryController {
    static createEntry = async (req, res) => {
        const { title, content, category, date } = req.body;
        const userId = res.locals.jwtPayload.userId;
        const user = await User_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const entry = new JournalEntry_1.JournalEntry();
        entry.title = title;
        entry.content = content;
        entry.category = category;
        entry.date = new Date(date);
        entry.user = user;
        await entry.save();
        res.status(201).send(entry);
    };
    static getEntries = async (req, res) => {
        const userId = res.locals.jwtPayload.userId;
        const entries = await JournalEntry_1.JournalEntry.find({ where: { user: { id: userId } } });
        res.send(entries);
    };
    static updateEntry = async (req, res) => {
        const { id } = req.params;
        const { title, content, category, date } = req.body;
        const entry = await JournalEntry_1.JournalEntry.findOne({ where: { id: Number(id) } });
        if (!entry) {
            return res.status(404).send("Entry not found");
        }
        entry.title = title || entry.title;
        entry.content = content || entry.content;
        entry.category = category || entry.category;
        entry.date = date ? new Date(date) : entry.date;
        await entry.save();
        res.send(entry);
    };
    static deleteEntry = async (req, res) => {
        const { id } = req.params;
        const entry = await JournalEntry_1.JournalEntry.findOne({ where: { id: Number(id) } });
        if (!entry) {
            return res.status(404).send("Entry not found");
        }
        await entry.remove();
        res.send("Entry deleted");
    };
}
exports.JournalEntryController = JournalEntryController;
