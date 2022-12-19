import { PrismaClient, Brand } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

import { BrandDto } from '@domain/dtos/brand';

const prisma = new PrismaClient();

// funçao para atualizar informações de 1 marca
export class UpdateBrandUseCase {
  constructor() {}

  async handle({ id, name }: BrandDto): Promise<Brand> {
    // Verificar se o produto existe
    const brandExist = await this.checkBrandExist(id);

    if (!brandExist) {
      throw new NotFoundException('Brand not found!');
    }

    const updatedBrand = await prisma.brand.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });

    return updatedBrand;
  }


  // Verifica se a marca existe
    async checkBrandExist(id: number): Promise<boolean> {
    const brand = await prisma.brand.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return !!brand // outra forma de retornar que o usuario é diferente de Null
    
  }
}