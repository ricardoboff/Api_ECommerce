import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

const prisma = new PrismaClient();

// função assincrona para deletar o usuário
export class DeleteUserUseCase {
  constructor() {}

  async handle(id: string) {
    // Verificar se o usuário existe
    const userExist = await this.checkUserExist(id);

    if (!userExist) {
      throw new NotFoundException('User not found!');
    }

    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  //Função que verifica se o usuário existe
  async checkUserExist(id: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    
    return user !== null;
  }
}