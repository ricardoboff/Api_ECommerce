import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

const prisma = new PrismaClient();

// função assincrona para deletar a marca
export class DeleteBrandUseCase {
  constructor() {}
  
  async handle(id: number) {
    // Verificar se a Marca existe
    const brandExist = await this.checkBrandExist(id);
    console.log(id)
    if (!brandExist) {
      throw new NotFoundException('Brand not found!');
    }

    await prisma.brand.delete({
      where: {
        id: id,
      },
    });
  }

  //Função que verifica se a marca existe
  async checkBrandExist(id: number): Promise<boolean> {
    const brand = await prisma.brand.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    
    return brand !== null;
  }
}