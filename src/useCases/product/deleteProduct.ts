import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

const prisma = new PrismaClient();

// função assincrona para deletar o produto
export class DeleteProductUseCase {
  constructor() {}

  async handle(id: string) {
    // Verificar se o produto existe
    const productExist = await this.checkProductExist(id);

    if (!productExist) {
      throw new NotFoundException('Product not found!');
    }

    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  }

  //Função que verifica se o produto existe
  async checkProductExist(id: string): Promise<boolean> {
    const product = await prisma.product.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    
    return product !== null;
  }
}