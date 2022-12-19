import { PrismaClient, Purchase } from '@prisma/client';

const prisma = new PrismaClient();

// função para listar todos os produtos cadastrados
export class ListPurchasesUseCase {
  constructor() {}

  async handle(): Promise<Purchase[]> {
    const purchases = await prisma.purchase.findMany({
      include: {
        items: true,
      },
    });

    return purchases;
  }
}