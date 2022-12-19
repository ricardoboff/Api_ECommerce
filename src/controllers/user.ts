import { Request, Response } from 'express';

import { UserDto } from '../domain/dtos/user';
import { ListUsersUseCase, GetUserUseCase, CreateUserUseCase, UpdateUserUseCase, DeleteUserUseCase } from '@useCases/user';


// Função assincrona que lista usuário, chamando o useCase criado para isso.
export async function listUsers(req: Request, res: Response) {
  const useCase = new ListUsersUseCase();
  const users = await useCase.handle();
  return res.json(users);
}

// Função que busca o usuário por ID e lista as informações do usuário.
export async function getUser(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = new GetUserUseCase();
  const user = await useCase.handle(id);
  return res.json(user);
}

export async function createUser(req: Request<{}, {}, UserDto>, res: Response) {
  const user = req.body;
  const useCase = new CreateUserUseCase();
  const createdUser = await useCase.handle(user);
  return res.json(createdUser);
}

export async function updateUser( req: Request<{ id: string }, {}, Omit<UserDto, 'id'>>, res: Response ) {
  const { id } = req.params;
  const userData = req.body;

  const useCase = new UpdateUserUseCase();
  const updatedUser = await useCase.handle({
    id,
    ...userData,
  });

  return res.json(updatedUser);
}

export async function deleteUser(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const useCase = new DeleteUserUseCase();
  await useCase.handle(id);

  return res.json({
    message: 'User deleted succeeded!',
  });
}