import { PrismaClient, Purchase } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

const prisma = new PrismaClient();

// função assincrona para Listar somente 1 produto
export class GetPurchaseUseCase {
  constructor() {}

  async handle(id: string): Promise<Purchase | null> {
    const purchase = await prisma.purchase.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        items: true,
      }
    });

    if (!purchase) {
      throw new NotFoundException('Purchase not found!');
    
    } 

    return purchase;

  }
}