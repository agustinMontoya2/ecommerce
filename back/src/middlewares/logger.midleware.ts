import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const date = new Date();
  const fecha = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  console.log(
    `A request of the type ${req.method} has been made to route ${req.url} on day ${fecha}`,
  );

  next();
}
