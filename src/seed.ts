import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {

  await prisma.brand.upsert({
    create: {
      id: 1,
      name: 'Samsung',
    },
    update: {},
    where: { id: 1 },
  });

  await prisma.brand.upsert({
    create: {
      id: 2,
      name: 'Motorola',
    },
    update: {},
    where: { id: 2 },
  });

  await prisma.product.upsert({
    create: {
      id: '30f4df8e-ed99-4056-965a-a8c82beb063d',
      description: 'Galaxy S22',
      unitValue: 7999,
      qtd: 10,
      brandId: 1,
    },
    update: {},
    where: { id: '30f4df8e-ed99-4056-965a-a8c82beb063d' },
  });

  await prisma.product.upsert({
    create: {
      id: 'ebcadfe7-9407-46e0-af71-e335514b4649',
      description: 'Galaxy S22 Ultra',
      unitValue: 9999,
      qtd: 10,
      brandId: 1,
    },
    update: {},
    where: { id: 'ebcadfe7-9407-46e0-af71-e335514b4649' },
  });
}