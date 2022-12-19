import { IException } from '@domain/exceptions/iException';
import { Request, Response, NextFunction } from 'express';


// Função para validar se o Erro apresenção é uma exceção

function isIException(obj: any): obj is IException {
  return 'statusCode' in obj && 'message' in obj;
}

// Middleware de para verificar erro e retornando o codigo do erro e uma mensagem para o usuário
export default function errorsMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err);

  if (isIException(err)) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.json({
    message: 'Ocorreu um erro!!',
  });
}