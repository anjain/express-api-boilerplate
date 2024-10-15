import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'
import logger from '../utils/logger'
import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }

  logger.error(err)
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}
