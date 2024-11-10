import type { Express } from 'express';
import { Prisma } from '@prisma/client';
import * as defaultFs from 'fs';
import crypto from 'crypto';
import ApiError from 'api/api-error';
import db from 'engine/db/prisma';
import {
  ProfileUpdatePayload,
  ProfileUpdatePreferencePayload,
} from 'models/interfaces/joi';
import { ExtendedServiceConstructor } from 'models/interfaces/service/service-interface';
import Service from 'services';
import { findZodiacSign, initPrismaDate, randomPick } from 'utils';

export default class ProfileService extends Service {
  constructor({ prisma = db }: ExtendedServiceConstructor = {}) {
    super({ prisma });
  }

  async update({ id, json }: { id: string; json: ProfileUpdatePayload }) {
    const user = await this.prisma.user.findFirst({
      where: {
        userId: id,
      },
      select: {
        userId: true,
      },
    });

    if (!user) throw new ApiError('User not found', 400);

    const { userProfileId, ...existingProfile } =
      await this.prisma.userProfile.findFirst({
        where: {
          userId: user.userId,
        },
      });

    const newProfileData: Prisma.UserProfileUncheckedCreateInput = {
      ...existingProfile,
      ...json,
      ...(json.birthDate && {
        birthDate: initPrismaDate(new Date(json.birthDate)),
      }),
    };

    if (newProfileData.birthDate) {
      const birthDate = new Date(newProfileData.birthDate);
      const zodiac = findZodiacSign(birthDate.getDate(), birthDate.getMonth());

      const zodiacData = await this.prisma.mstZodiac.findFirst({
        where: {
          value: zodiac,
        },
      });
      if (zodiacData) {
        newProfileData.zodiacId = zodiacData.zodiacId;
      }
    }

    const updateProfile = await this.prisma.userProfile.update({
      where: {
        userProfileId: userProfileId,
      },
      data: newProfileData,
      include: {
        gender: true,
        zodiac: true,
      },
    });
    return updateProfile;
  }

  async processImages({
    fs = defaultFs,
    folder,
    images = [],
  }: {
    fs?: typeof defaultFs;
    folder?: string;
    images?: Express.Multer.File[];
  } = {}) {
    const publicPath = 'public/images/' + folder;

    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    const imagePaths = await Promise.all(
      images.map((image) => {
        const extArray = image.mimetype.split('/');
        const filename =
          crypto.randomBytes(8).toString('hex') +
          '.' +
          extArray[extArray.length - 1];

        fs.writeFileSync(`${publicPath}/${filename}`, image.buffer);

        return filename;
      })
    );

    return imagePaths;
  }

  async updatePhoto({ id, photos = [] }: { id: string; photos?: string[] }) {
    await this.prisma.userProfile.update({
      where: {
        userId: id,
      },
      data: {
        photo: photos,
      },
    });
    return true;
  }

  async getRandomProfile({
    id,
    exclude,
    count = 1,
  }: {
    id: string;
    exclude: string[];
    count?: number;
  }) {
    const currentProfile = await this.prisma.user.findFirst({
      where: {
        userId: id,
      },
      select: {
        userId: true,
        userProfile: {
          select: {
            genderId: true,
          },
        },
        userPreference: true,
      },
    });

    const whereProfile: Prisma.UserProfileWhereInput = {
      userId: {
        notIn: [currentProfile.userId, ...exclude],
      },
    };

    if (currentProfile.userPreference) {
      whereProfile.genderId = currentProfile.userPreference.genderId;
    } else if (currentProfile.userProfile.genderId) {
      whereProfile.genderId = {
        not: currentProfile.userProfile.genderId,
      };
    }

    const profileCount = await this.prisma.userProfile.count({
      where: whereProfile,
    });
    const userProfileFields = Object.keys(Prisma.UserProfileScalarFieldEnum);
    const skip = Math.max(0, Math.floor(Math.random() * profileCount) - count);
    const orderBy = randomPick(userProfileFields);
    const orderDir = randomPick([Prisma.SortOrder.asc, Prisma.SortOrder.desc]);

    const [randomProfile] = await this.prisma.userProfile.findMany({
      where: whereProfile,
      include: {
        zodiac: true,
        gender: true,
      },
      take: count,
      skip,
      orderBy: { [orderBy]: orderDir },
    });

    return randomProfile;
  }

  async updatePreference({
    id,
    json,
  }: {
    id: string;
    json: ProfileUpdatePreferencePayload;
  }) {
    await this.prisma.userPreference.upsert({
      where: {
        userId: id,
      },
      create: {
        maxAge: json.maxAge,
        minAge: json.minAge,
        radius: json.radius,
        genderId: json.genderId,
        userId: id,
      },
      update: {
        maxAge: json.maxAge,
        minAge: json.minAge,
        radius: json.radius,
        genderId: json.genderId,
        userId: id,
      },
    });
    return true;
  }
}
