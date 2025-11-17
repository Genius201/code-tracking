import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface Config {
  app: {
    name: string;
    env: string;
    port: number;
    version: string;
  };
  server: {
    port: number;
    host: string;
  };
  database: {
    url: string;
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    ssl: boolean;
  };
  redis: {
    url: string;
    host: string;
    port: number;
    password?: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  cors: {
    origin: string | string[];
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  email: {
    provider: string;
    apiKey: string;
    from: string;
    fromName: string;
  };
... (truncated for brevity)