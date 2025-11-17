import { knex, Knex } from 'knex';
import { config } from './environment';
import { logger } from '@/utils/logger';

// Knex configuration
const knexConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true,
  pool: {
    min: 2,
    max: 10,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
  },
  migrations: {
    directory: './src/database/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
};

// Create Knex instance
export const db = knex(knexConfig);

// Initialize database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Test the connection
    await db.raw('SELECT 1');
    logger.info('Database connection established successfully');
    
    // Run migrations in production
    if (process.env['NODE_ENV'] === 'production') {
      await db.migrate.latest();
      logger.info('Database migrations completed');
    }
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
};

... (truncated for brevity)