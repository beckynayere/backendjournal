"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const JournalEntry_1 = require("./entities/JournalEntry");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
    synchronize: true,
    logging: true,
    entities: [JournalEntry_1.JournalEntry],
    migrations: [],
    subscribers: [],
});
exports.default = AppDataSource;
