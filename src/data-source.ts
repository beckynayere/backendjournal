import { DataSource } from 'typeorm';
import { JournalEntry } from './entities/JournalEntry';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myuser',
  password: 'mypassword',
  database: 'mydatabase',
  synchronize: true,
  logging: true,
  entities: [JournalEntry],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
