import { PrismaClient } from '@prisma/client';
import zodiacSeed from './zodiac-seed';
import genderSeed from './gender-seed';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

zodiacSeed(prisma)
  .then(async () => {
    await genderSeed(prisma);
  })
  .catch(async (err) => {
    console.log('Seeder Failed:', err.message);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Seed data complete!');
  });
