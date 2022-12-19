import { PrismaClient, Brand } from '@prisma/client';

import { BrandDto } from '@domain/dtos/brand';

const prisma = new PrismaClient();


// Classe para criar uma Marca de um Produto e salvar no Bando de Dados
export class CreateBrandUseCase {
  constructor() {}

  async handle(brand: Omit<BrandDto, 'id'>): Promise<Brand> {
    const createdBrand = await prisma.brand.create({
      data: {
        name: brand.name,
      },
    });
    console.log(createdBrand)
    return createdBrand;
  }
}