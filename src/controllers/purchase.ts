import { Request, Response } from 'express';

import { PurchaseDto } from '@domain/dtos/purchase';
import { CreatePurchaseUseCase, GetPurchaseUseCase, ListPurchasesUseCase, DeletePurchaseUseCase } from '@useCases/purchase'

// Cria a Compra
export async function createPurchase(req: Request<{}, {}, PurchaseDto>, res: Response) {
  const purchase = req.body;
  const useCase = new CreatePurchaseUseCase();
  const createdPurchase = await useCase.handle(purchase);
  return res.json(createdPurchase);
}

// Busca o Compra por ID e lista as informações do produto.
export async function getPurchase(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = new GetPurchaseUseCase();
  const purchase = await useCase.handle(id);
  return res.json(purchase);
}

// Lista todos as Compras.
export async function listPurchases(req: Request, res: Response) {
  const useCase = new ListPurchasesUseCase();
  const purchases = await useCase.handle();
  return res.json(purchases);
}

// Exclui uma compra cadastrada, pesquisando pelo ID.
export async function deletePurchase(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = new DeletePurchaseUseCase();
  await useCase.handle(id);

  return res.json({
    message: 'Purchase deleted succeeded!',
  });
}