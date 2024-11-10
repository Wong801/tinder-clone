import { PrismaClient } from '@prisma/client';
import { ServiceConstructor } from 'models/interfaces/service/service-interface';

export default class Service {
  readonly prisma: PrismaClient;

  constructor({ prisma }: ServiceConstructor) {
    this.prisma = prisma;
  }
}
