"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const JournalEntryRoutes_1 = __importDefault(require("./routes/JournalEntryRoutes"));
(0, typeorm_1.createConnection)().then(() => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use("/api/users", userRoutes_1.default);
    app.use("/api/journal-entries", JournalEntryRoutes_1.default);
    app.listen(3000, () => {
        console.log("Server started on port 3000!");
    });
}).catch(error => console.log(error));
