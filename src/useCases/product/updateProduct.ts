import { PrismaClient, Product } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

import { ProductDto } from '@domain/dtos/product';

const prisma = new PrismaClient();

// funçao para atualizar informações de 1 produto
export class UpdateProductUseCase {
  constructor() {}

  async handle({ id, description, unitValue, qtd, brandId }: ProductDto): Promise<Product> {
    // Verificar se o produto existe
    const productExist = await this.checkProductExist(id);

    if (!productExist) {
      throw new NotFoundException('Product not found!');
    }

    const updatedProduct = await prisma.product.update({
      data: {
        description,
        unitValue,
        qtd,
        brandId,
      },
      where: {
        id,
      },
    });

    return updatedProduct;
  }


  // Verifica se o produto existe
    async checkProductExist(id: string): Promise<boolean> {
    const product = await prisma.product.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return !!product // outra forma de retornar que o usuario é diferente de Null
    
  }
}