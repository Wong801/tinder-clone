import { Prisma, PrismaClient } from '@prisma/client';

export default async function (prisma: PrismaClient) {
  const genderData: Prisma.MstGenderUpsertArgs[] = [
    {
      where: {
        value: 'male',
      } as unknown as Prisma.MstGenderWhereUniqueInput,
      update: {},
      create: {
        value: 'male',
      },
    },
    {
      where: {
        value: 'female',
      } as unknown as Prisma.MstGenderWhereUniqueInput,
      update: {},
      create: {
        value: 'female',
      },
    },
  ];

  await Promise.all(
    genderData.map(async (data) => {
      if (!(await prisma.mstGender.findFirst({ where: data.where }))) {
        await prisma.mstGender.create({ data: data.create });
      }
    })
  );

  return prisma;
}
