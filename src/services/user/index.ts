import { ExtendedServiceConstructor } from 'models/interfaces/service/service-interface';
import Service from '..';
import db from 'engine/db/prisma';
import {
  UserEmailCheckPayload,
  UserPhoneNumberCheckPayload,
} from 'models/interfaces/joi';
import ApiError from 'api/api-error';
import { Prisma, UserProfile } from '@prisma/client';

export default class UserService extends Service {
  constructor({ prisma = db }: ExtendedServiceConstructor = {}) {
    super({ prisma });
  }

  async checkUser({
    json,
  }: {
    json: UserEmailCheckPayload | UserPhoneNumberCheckPayload;
  }) {
    const where: Prisma.UserWhereInput = {};

    if ((json as UserEmailCheckPayload).email) {
      where.email = (json as UserEmailCheckPayload).email;
    }
    if ((json as UserPhoneNumberCheckPayload).phoneNumber) {
      where.phoneNumber = (json as UserPhoneNumberCheckPayload).phoneNumber;
    }

    let userCount: number;

    if (where.email && where.phoneNumber) {
      userCount = await this.prisma.user.count({
        where: {
          OR: [
            {
              email: where.email,
            },
            {
              phoneNumber: where.phoneNumber,
            },
          ],
        },
      });
    } else {
      userCount = await this.prisma.user.count({
        where,
      });
    }

    if (userCount) {
      throw new ApiError(
        `User with specified ${
          (json as UserEmailCheckPayload).email ? 'email' : 'phone number'
        } already exists`,
        409
      );
    }

    return true;
  }

  async get({ id }: { id: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        userId: id,
      },
      include: {
        userProfile: {
          include: {
            zodiac: true,
            gender: true,
          },
        },
      },
    });

    if (!user) throw new ApiError('User not found', 400);

    return {
      ...user,
      userProfile: user.userProfile || ({} as UserProfile),
    };
  }
}
