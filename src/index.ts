import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './models';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import journalRoutes from './routes/journalRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/journals', journalRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
