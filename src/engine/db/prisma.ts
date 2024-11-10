import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
  omit: {
    user: {
      pin: true,
    },
    userProfile: {
      genderId: true,
      zodiacId: true,
    },
  },
});

export type PrismaTransaction = Parameters<
  Parameters<typeof db.$transaction>[0]
>[0];

export default db;
