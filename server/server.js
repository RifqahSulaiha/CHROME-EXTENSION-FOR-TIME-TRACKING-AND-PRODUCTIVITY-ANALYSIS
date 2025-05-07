const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TimeEntry = require('./models/TimeEntry');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/productivity',{ useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.post('/api/time', async (req, res) => {
  const { url, duration } = req.body;
  const newEntry = new TimeEntry({ url, duration });
  await newEntry.save();
  res.sendStatus(200);
});

app.get('/api/time', async (req, res) => {
  const entries = await TimeEntry.find().sort({ createdAt: -1 }).limit(50);
  res.json(entries);
});

app.listen(3000, () => console.log("Server started on http://localhost:3000"));