import { Request, Response, NextFunction } from 'express';

export function loggerMiddleWare(req: Request, res: Response, next: NextFunction) {
  console.log(`Request!`);
  next();
};