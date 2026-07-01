const mongoose = require('mongoose');

require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

if (!mongoURL) {
  console.error('Missing MONGODB_URL in .env');
  process.exit(1);
}

mongoose.connect(mongoURL, {
  serverSelectionTimeoutMS: 10000,
})
  .then(() => {
    console.log('Connected to MongoDB Server');
  })
  .catch((err) => {
    console.error('MongoDB Connection error:', err.message || err);
    console.error('Verify your Atlas network access and IP whitelist.');
    process.exit(1);
  });
        

module.exports = mongoose;