import { Request, Response } from "express";
import { JournalEntry } from "../entities/JournalEntry";
import { User } from "../entities/User";

export class JournalEntryController {
  static createEntry = async (req: Request, res: Response) => {
    const { title, content, category, date } = req.body;
    const userId = res.locals.jwtPayload.userId;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const entry = new JournalEntry();
    entry.title = title;
    entry.content = content;
    entry.category = category;
    entry.date = new Date(date);
    entry.user = user;
    await entry.save();
    res.status(201).send(entry);
  };

  static getEntries = async (req: Request, res: Response) => {
    const userId = res.locals.jwtPayload.userId;
    const entries = await JournalEntry.find({ where: { user: { id: userId } } });
    res.send(entries);
  };

  static updateEntry = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, category, date } = req.body;
    const entry = await JournalEntry.findOne({ where: { id: Number(id) } });
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

  static deleteEntry = async (req: Request, res: Response) => {
    const { id } = req.params;
    const entry = await JournalEntry.findOne({ where: { id: Number(id) } });
    if (!entry) {
      return res.status(404).send("Entry not found");
    }
    await entry.remove();
    res.send("Entry deleted");
  };
}
