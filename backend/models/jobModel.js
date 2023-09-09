const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  name: String,
  complexity: Number,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', jobSchema);