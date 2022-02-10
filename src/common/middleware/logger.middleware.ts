import { Request, Response, NextFunction } from 'express';

export function loggerMiddleWare(req: Request, res: Response, next: NextFunction) {
  console.log(req.method);
  console.log(req.route.path);
  console.log(req.url);
  next();
};