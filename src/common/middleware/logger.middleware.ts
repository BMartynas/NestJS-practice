import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function loggerMiddleWare(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger(loggerMiddleWare.name);
  logger.log(`Method: ${req.method} Route path: ${req.route.path}`)
  next();
};