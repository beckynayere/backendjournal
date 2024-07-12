const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/journals', journalRoutes);

const PORT = process.env.PORT || 3000;

// Ensure sequelize is connected before starting the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
