import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import journalEntryRoutes from './routes/JournalEntryRoutes';



createConnection().then(() => {
  const app = express();

  app.use(bodyParser.json());

  app.use("/api/users", userRoutes);
  app.use("/api/journal-entries", journalEntryRoutes);

  app.listen(3000, () => {
    console.log("Server started on port 3000!");
  });
}).catch(error => console.log(error));
