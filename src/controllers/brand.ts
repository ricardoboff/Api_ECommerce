import { Request, Response } from 'express';

import { BrandDto } from '@domain/dtos/brand';
import { ListBrandsUseCase, GetBrandUseCase, CreateBrandUseCase, UpdateBrandUseCase, DeleteBrandUseCase } from '@useCases/brand';


// Lista todos as marcas.
export async function listBrands(req: Request, res: Response) {
  const useCase = new ListBrandsUseCase();
  const brands = await useCase.handle();
  return res.json(brands);
}

// Busca a marca por ID e lista as informações da marca.
export async function getBrand(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = new GetBrandUseCase();
  const brand = await useCase.handle(Number(id));
  return res.json(brand);
}

// Cria a Marca
export async function createBrand(req: Request<{}, {}, BrandDto>, res: Response) {
  const brand = req.body;
  const useCase = new CreateBrandUseCase();
  const createdBrand = await useCase.handle(brand);
  return res.json(createdBrand);
}

// Atualiza as informações da Marca consultando pelo ID.
export async function updateBrand( req: Request<{ id: string }, {}, Omit<BrandDto, 'id'>>, res: Response ) {
  const { id } = req.params
  const brandData = req.body;
  const useCase = new UpdateBrandUseCase();
  const updatedBrand = await useCase.handle({
    id: Number(id),
    ...brandData,
  });

  return res.json(updatedBrand);
}

// Exclui uma Marca cadastrada, pesquisando pelo ID.
export async function deleteBrand(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = new DeleteBrandUseCase();
  await useCase.handle(Number(id));

  return res.json({
    message: 'Brand deleted succeeded!',
  });
}