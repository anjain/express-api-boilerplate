import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'

interface JwtPayload {
  id: string
  role: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    throw new AppError(401, 'No token provided')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.user = decoded
    next()
  } catch (error) {
    throw new AppError(401, 'Invalid token')
  }
}
