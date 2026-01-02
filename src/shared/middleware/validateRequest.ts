import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

export const validateRequest =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
    } catch (error) {
      next(error);
    }
  };
