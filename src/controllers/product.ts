import { Request, Response } from 'express';

import { ProductDto } from '@domain/dtos/product';
import { ListProductsUseCase, GetProductUseCase, CreateProductUseCase, UpdateProductUseCase, DeleteProductUseCase } from '@useCases/product';


// Lista todos os produtos.
export async function listProducts(req: Request, res: Response) {
  const useCase = new ListProductsUseCase();
  const products = await useCase.handle();
  return res.json(products);
}

// Busca o produto por ID e lista as informações do produto.
export async function getProduct(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = new GetProductUseCase();
  const product = await useCase.handle(id);
  return res.json(product);
}

// Cria o produto
export async function createProduct(req: Request<{}, {}, ProductDto>, res: Response) {
  const product = req.body;
  const useCase = new CreateProductUseCase();
  const createdProduct = await useCase.handle(product);
  return res.json(createdProduct);
}

// Atualiza as informações de 1 produto, consultando pelo ID.
export async function updateProduct( req: Request<{ id: string }, {}, Omit<ProductDto, 'id'>>, res: Response ) {
  const { id } = req.params;
  const productData = req.body;

  const useCase = new UpdateProductUseCase();
  const updatedProduct = await useCase.handle({
    id,
    ...productData,
  });

  return res.json(updatedProduct);
}

// Exclui um produto cadastrado, pesquisando pelo ID.
export async function deleteProduct(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = new DeleteProductUseCase();
  await useCase.handle(id);

  return res.json({
    message: 'Product deleted succeeded!',
  });
}