import { v4 } from 'uuid';
import { PrismaClient, Purchase } from '@prisma/client';

import { PurchaseDto } from '@domain/dtos/purchase'

const prisma = new PrismaClient();


// Classe para criar a Compra e salvar no Bando de Dados
export class CreatePurchaseUseCase {
  constructor() {}

  async handle(purchase: Omit<PurchaseDto, 'id'>): Promise<Purchase> {

    const productsIds = purchase.items.map((x) => x.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsIds
        }
      }
    })
    
    let totalValue = 0;
    for (let i = 0; i < purchase.items.length; i++) {
      const item = purchase.items[i];

      // Obter o produto do array acima
      const product = products.find((x) => x.id == item.productId);

      if (!product) continue;

      totalValue += Number(product.unitValue) * item.qtd;
    }

    const purchaseId = v4();

    // Salvar a compra
    const createdPurchase = await prisma.purchase.create({
      data: {
        id: purchaseId,
        userId: purchase.userId,
        totalValue: totalValue,
      },
    });

    // Salvar os itens da compra
    for (let i = 0; i < purchase.items.length; i++) {
      const item = purchase.items[i];
      const product = products.find((x) => x.id == item.productId);

      if (!product) continue;

      await prisma.purchaseItems.create({
        data: {
          purchaseId: purchaseId,
          productId: item.productId,
          qtd: item.qtd,
          unitValue: product?.unitValue,
        },
      });
    }
  
    return createdPurchase;
  }

}