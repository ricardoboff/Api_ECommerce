import { PrismaClient, Product } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

const prisma = new PrismaClient();

// função assincrona para Listar somente 1 produto
export class GetProductUseCase {
  constructor() {}

  async handle(id: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        brand: true,
      }
    });

    if (!product) {
      throw new NotFoundException('Product not found!');
    
    } 

    return product;

  }
}