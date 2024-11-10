import { Prisma, PrismaClient } from '@prisma/client';

export default async function (prisma: PrismaClient) {
  const zodiacData: Prisma.MstZodiacUpsertArgs[] = [
    {
      where: {
        value: 'capricorn',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'capricorn',
      },
    },
    {
      where: {
        value: 'aquarius',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'aquarius',
      },
    },
    {
      where: {
        value: 'pisces',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'pisces',
      },
    },
    {
      where: {
        value: 'aries',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'aries',
      },
    },
    {
      where: {
        value: 'taurus',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'taurus',
      },
    },
    {
      where: {
        value: 'gemini',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'gemini',
      },
    },
    {
      where: {
        value: 'cancer',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'cancer',
      },
    },
    {
      where: {
        value: 'leo',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'leo',
      },
    },
    {
      where: {
        value: 'virgo',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'virgo',
      },
    },
    {
      where: {
        value: 'libra',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'libra',
      },
    },
    {
      where: {
        value: 'scorpio',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'scorpio',
      },
    },
    {
      where: {
        value: 'sagitarius',
      } as unknown as Prisma.MstZodiacWhereUniqueInput,
      update: {},
      create: {
        value: 'sagitarius',
      },
    },
  ];

  await Promise.all(
    zodiacData.map(async (data) => {
      if (!(await prisma.mstZodiac.findFirst({ where: data.where }))) {
        await prisma.mstZodiac.create({ data: data.create });
      }
    })
  );

  return prisma;
}
