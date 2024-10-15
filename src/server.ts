import express from 'express'
import { errorHandler } from './middleware/errorHandler'

export function createServer(): express.Application {
  const app = express()

  app.use(express.json())
  // app.use(auth)
  app.use(errorHandler)

  return app
}
