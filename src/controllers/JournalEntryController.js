"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntryController = void 0;
const JournalEntry_1 = require("../entities/JournalEntry");
const User_1 = require("../entities/User");
class JournalEntryController {
}
exports.JournalEntryController = JournalEntryController;
_a = JournalEntryController;
JournalEntryController.createEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, category, date } = req.body;
    const userId = res.locals.jwtPayload.userId;
    const user = yield User_1.User.findOne({ where: { id: userId } });
    if (!user) {
        return res.status(404).send("User not found");
    }
    const entry = new JournalEntry_1.JournalEntry();
    entry.title = title;
    entry.content = content;
    entry.category = category;
    entry.date = new Date(date);
    entry.user = user;
    yield entry.save();
    res.status(201).send(entry);
});
JournalEntryController.getEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.jwtPayload.userId;
    const entries = yield JournalEntry_1.JournalEntry.find({ where: { user: { id: userId } } });
    res.send(entries);
});
JournalEntryController.updateEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, category, date } = req.body;
    const entry = yield JournalEntry_1.JournalEntry.findOne({ where: { id: Number(id) } });
    if (!entry) {
        return res.status(404).send("Entry not found");
    }
    entry.title = title || entry.title;
    entry.content = content || entry.content;
    entry.category = category || entry.category;
    entry.date = date ? new Date(date) : entry.date;
    yield entry.save();
    res.send(entry);
});
JournalEntryController.deleteEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const entry = yield JournalEntry_1.JournalEntry.findOne({ where: { id: Number(id) } });
    if (!entry) {
        return res.status(404).send("Entry not found");
    }
    yield entry.remove();
    res.send("Entry deleted");
});
