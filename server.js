const express = require ('express');
const app = express()
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes');
const { sync } = require('./models/user');
require('dotenv').config();

app.use(express.json());

app.use('./auth', authRoutes);
app.use('/users', userRoutes);
app.use('/journals', journalRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync(),then (() =>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => console.log(err));
