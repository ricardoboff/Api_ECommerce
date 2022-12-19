import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@domain/exceptions/notFound';

const prisma = new PrismaClient();

// função assincrona para deletar a compra
export class DeletePurchaseUseCase {
  constructor() {}

  async handle(id: string) {
    // Verificar se a Compra existe
    const purchaseExist = await this.checkPurchaseExist(id);

    if (!purchaseExist) {
      throw new NotFoundException('Purchase not found!');
    }

  
    let purchaseItemId = await prisma.purchaseItems.findFirst({
        where: {
            purchaseId: id,
        }
    })

    if (purchaseItemId !== null) { 
        let idItem = purchaseItemId.id
        while (idItem !== 0) {
            await prisma.purchaseItems.delete({
                where: {
                    id: idItem,
                },
            });
            purchaseItemId = await prisma.purchaseItems.findFirst({
                where: {
                    purchaseId: id,
                }
            })
            if(purchaseItemId !== null) 
                idItem = purchaseItemId?.id
            else
                idItem = 0
        }
    }

    await prisma.purchase.delete({
        where: {
          id: id,
        },
      });

    }
  
  //Função que verifica se o produto existe
  async checkPurchaseExist(id: string): Promise<boolean> {
    const purchase = await prisma.purchase.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    
    return purchase !== null;
  }
}