import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

// função para listar todos os produtos cadastrados
export class ListProductsUseCase {
  constructor() {}

  async handle(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
      },
    });

    return products;
  }
}