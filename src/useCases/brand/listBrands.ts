import { PrismaClient, Brand } from '@prisma/client';

const prisma = new PrismaClient();

// função para listar todos os produtos cadastrados
export class ListBrandsUseCase {
  constructor() {}

  async handle(): Promise<Brand[]> {
    const brandExist = await prisma.brand.findMany();

    return brandExist;
  }
}