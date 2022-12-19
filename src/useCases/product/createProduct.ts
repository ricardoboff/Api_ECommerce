import { v4 } from 'uuid';
import { PrismaClient, Product } from '@prisma/client';

import { ProductDto } from '@domain/dtos/product';

const prisma = new PrismaClient();


// Classe para criar Produto e salvar no Bando de Dados
export class CreateProductUseCase {
  constructor() {}

  async handle(product: Omit<ProductDto, 'id'>): Promise<Product> {
    const createdProduct = await prisma.product.create({
      data: {
        id: v4(),
        description: product.description,
        unitValue: product.unitValue,
        qtd: product.qtd,
        brandId: product.brandId,
      },
    });

    return createdProduct;
  }
}