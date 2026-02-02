import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
