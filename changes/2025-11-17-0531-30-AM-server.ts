import 'dotenv/config';
import App from './app';
import { logger } from '@/utils/logger';
import { gracefulShutdown } from '@/utils/gracefulShutdown';

async function startServer(): Promise<void> {
  try {
    const app = new App();
    
    // Initialize the application
    await app.initialize();
    
    // Start listening for requests
    app.listen();

    // Setup graceful shutdown
    gracefulShutdown();

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});