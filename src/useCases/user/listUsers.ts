import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// função para listar todos os usuários cadastrados
export class ListUsersUseCase {
  constructor() {}

  async handle(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
}