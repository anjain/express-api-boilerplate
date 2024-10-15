import { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/AppError'
import logger from '../utils/logger'

/* This is a very basic auth middleware to demonstrated RBAC
 * You are expected to implement a more elaborative approach */

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      logger.warn(`Unauthorized access attempt: ${req.ip}`)
      throw new AppError(401, 'Unauthorized')
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(
        `Forbidden access attempt: ${req.user.id} tried to access ${req.path}`,
      )
      throw new AppError(403, 'Forbidden')
    }

    logger.info(`Authorized access: ${req.user.id} accessed ${req.path}`)
    next()
  }
}
