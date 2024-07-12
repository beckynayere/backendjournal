import 'reflect-metadata';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createConnection } = require('typeorm');
const User = require('./src/entities/User');
const JournalEntry = require('./src/entities/JournalEntry');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
createConnection().then(() => {
  console.log('Connected to the database');

  // Routes
  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = new User();
      user.username = username;
      user.password = password; // Hash password in real implementation
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (user && user.password === password) { // Validate password in real implementation
        res.status(200).send(user);
      } else {
        res.status(400).send('Invalid credentials');
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/entries', async (req, res) => {
    const { title, content, category, date, userId } = req.body;
    try {
      const user = await User.findOne(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      const entry = new JournalEntry();
      entry.title = title;
      entry.content = content;
      entry.category = category;
      entry.date = new Date(date);
      entry.user = user;
      await entry.save();
      res.status(201).send(entry);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/entries', async (req, res) => {
    try {
      const entries = await JournalEntry.find({ relations: ['user'] });
      res.status(200).send(entries);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error connecting to the database', err);
});
