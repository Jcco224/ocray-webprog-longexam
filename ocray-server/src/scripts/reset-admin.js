import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import User from '../models/userModel.js';

async function resetAdmin() {
  if (!process.env.SEED_ADMIN_PASSWORD) {
    throw new Error('SEED_ADMIN_PASSWORD is required in .env');
  }

  await connectDatabase();
  let admin = await User.findOne({ username: 'bulldogadmin' }).select('+passwordHash');

  if (!admin) {
    admin = new User({
      username: 'bulldogadmin',
      firstName: 'BulldogEx',
      lastName: 'Administrator',
    });
  }

  admin.email = 'ocray@admin.com';
  admin.passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 12);
  admin.role = 'admin';
  admin.isActive = true;
  await admin.save();

  const passwordMatches = await bcrypt.compare(
    process.env.SEED_ADMIN_PASSWORD,
    admin.passwordHash,
  );
  if (!passwordMatches) throw new Error('Admin password verification failed after reset');

  console.log('Admin reset complete: ocray@admin.com');
}

resetAdmin()
  .then(disconnectDatabase)
  .catch(async (error) => {
    console.error(error.message);
    await disconnectDatabase();
    process.exitCode = 1;
  });
