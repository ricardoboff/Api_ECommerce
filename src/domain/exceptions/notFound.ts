import { IException } from './iException';

// exporta o erro NotFound que implementa o modelo de exceção criado em IEXCEPTION

export class NotFoundException implements IException {
  statusCode: number = 404;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}