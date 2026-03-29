const mongoose = require('mongoose');
const { mongoose: mongooseConfig } = require('./env');

const connectDB = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  };

  const attemptConnection = async (retries = 5) => {
    try {
      await mongoose.connect(mongooseConfig.url, options);
      console.log('MongoDB connected successfully');
    } catch (err) {
      if (retries === 0) {
        console.error('Failed to connect to MongoDB after 5 retries. Exiting.');
        process.exit(1);
      }
      console.error(`Error connecting to MongoDB: ${err.message}. Retrying...`);
      setTimeout(() => attemptConnection(retries - 1), 5000);
    }
  };

  attemptConnection();
};

module.exports = connectDB;
