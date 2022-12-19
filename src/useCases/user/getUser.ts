import { PrismaClient, User } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

const prisma = new PrismaClient();

// função assincrona para Listar somente 1 usuário
export class GetUserUseCase {
  constructor() {}

  async handle(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      }
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    
    } 

    return user;

  }
}