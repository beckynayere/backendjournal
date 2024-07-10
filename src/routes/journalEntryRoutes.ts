import { Router } from "express";
import { JournalEntryController } from "../controllers/JournalEntryController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.post("/", [checkJwt], JournalEntryController.createEntry);
router.get("/", [checkJwt], JournalEntryController.getEntries);
router.put("/:id", [checkJwt], JournalEntryController.updateEntry);
router.delete("/:id", [checkJwt], JournalEntryController.deleteEntry);

export default router;
