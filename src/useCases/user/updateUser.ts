import { PrismaClient, User } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

import { UserDto } from '@domain/dtos/user';

const prisma = new PrismaClient();

// funçao para atualizar informações de 1 usuario
export class UpdateUserUseCase {
  constructor() {}

  async handle({ id, name, email, password, address, city, uf }: UserDto): Promise<User> {
    // Verificar se o usuário existe
    const userExist = await this.checkUserExist(id);

    if (!userExist) {
      throw new NotFoundException('User not found!');
    }

    const updatedUser = await prisma.user.update({
      data: {
        name,
        email,
        password,
        address,
        city,
        uf
      },
      where: {
        id,
      },
    });

    return updatedUser;
  }


  // Verifica se o usuário existe
    async checkUserExist(id: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return !!user // outra forma de retornar que o usuario é diferente de Null
    
  }
}