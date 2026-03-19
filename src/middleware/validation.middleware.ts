import { validate, type ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../error/errorHandler';

export const validationMiddleware = (type: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(type, req.body);
    const errors: ValidationError[] = await validate(dtoObj);
    
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => {
        return Object.values(error.constraints || {}).join(', ');
      }).join(', ');
      return next(new AppError(message, 400));
    }
    
    req.body = dtoObj;
    next();
  };
};
