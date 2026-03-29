const app = require('./src/app');
const connectDB = require('./src/config/db');
const { port } = require('./src/config/env');

const startServer = async () => {
  try {
    // 1. Connect to Database with Retry Logic
    await connectDB();

    // 2. Start Express Application
    const server = app.listen(port, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
    });

    // Handle Graceful Shutdown
    const gracefulExit = () => {
      console.log('Stopping server...');
      server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulExit);
    process.on('SIGINT', gracefulExit);

  } catch (err) {
    console.error(`Fatal Server Error: ${err.message}`);
    process.exit(1);
  }
};

startServer();
