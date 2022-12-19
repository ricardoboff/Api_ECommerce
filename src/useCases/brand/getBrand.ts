import { PrismaClient, Brand } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

const prisma = new PrismaClient();

// função assincrona para Listar somente 1 marca
export class GetBrandUseCase {
  constructor() {}

  async handle(id: number): Promise<Brand | null> {
    const brand = await prisma.brand.findFirst({
      where: {
        id: {
          equals: id,
        },
      }
    });

    if (!brand) {
      throw new NotFoundException('Brand not found!');
    
    } 

    return brand;

  }
}