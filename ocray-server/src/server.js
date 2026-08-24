import 'dotenv/config';
import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

const port = Number(process.env.PORT) || 5000;

async function start() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 24) {
    throw new Error('JWT_SECRET must contain at least 24 characters');
  }
  await connectDatabase();
  const server = app.listen(port, () => {
    console.log(`BE Backend running at http://localhost:${port}`);
  });

  async function shutdown(signal) {
    console.log(`${signal} received; shutting down`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  }
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});
