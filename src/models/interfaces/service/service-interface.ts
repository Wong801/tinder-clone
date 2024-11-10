import { PrismaClient } from '@prisma/client';

export interface ServiceConstructor {
  prisma: PrismaClient;
}

export interface ExtendedServiceConstructor {
  prisma?: PrismaClient;
}
