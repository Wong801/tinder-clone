import ApiError from 'api/api-error';
import db from 'engine/db/prisma';
import { ExtendedServiceConstructor } from 'models/interfaces/service/service-interface';
import Service from 'services';
import { initPrismaDate } from 'utils';

export default class PremiumService extends Service {
  constructor({ prisma = db }: ExtendedServiceConstructor = {}) {
    super({ prisma });
  }

  async requestPremium({ id }: { id: string }) {
    await this.prisma.userPremiumRequest.upsert({
      where: {
        userId: id,
      },
      create: {
        userId: id,
      },
      update: {
        requestedAt: initPrismaDate(new Date()),
      },
    });

    return true;
  }

  async activate({ id }: { id: string }) {
    await this.prisma.userProfile.update({
      where: {
        userId: id,
      },
      data: {
        isPremium: true,
      },
    });

    return true;
  }

  async process({ id }: { id: string }) {
    // TODO: process premium logic
    const updatedRequest = await this.prisma.userPremiumRequest.update({
      where: {
        userId: id,
      },
      data: {
        isProcessed: true,
      },
    });

    if (updatedRequest.isProcessed) {
      return await this.activate({ id });
    }

    throw new ApiError(
      'There is a problem occured when trying to process your request',
      500
    );
  }
}
