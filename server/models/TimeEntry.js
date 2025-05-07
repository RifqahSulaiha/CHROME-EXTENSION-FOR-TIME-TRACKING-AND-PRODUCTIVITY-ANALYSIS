const mongoose = require('mongoose');

const TimeEntrySchema = new mongoose.Schema({
  url: String,
  duration: Number
}, { timestamps: true });

module.exports = mongoose.model('TimeEntry', TimeEntrySchema);