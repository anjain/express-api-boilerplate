import { config } from 'dotenv'
import 'source-map-support/register'
import { connectToDatabase } from './config/database'
import { setupMessageHandlers } from './config/messageHandlers'
import { serviceConfigs } from './config/services'
import { DynamicController } from './controllers/DynamicController'
import { morganMiddleware } from './middleware/morganMiddleware'
import { ServiceRegistry } from './registry/ServiceRegistry'
import { setupRoutes } from './routes/routes'
import { createServer } from './server'
import logger from './utils/logger'
import { globalMessageBus } from './utils/MessageBus'

async function startServer() {
  config()
  await connectToDatabase()

  const app = createServer()
  app.use(morganMiddleware)

  // Enable these to implement authentication as per your need
  // app.use(cookieParser())
  // app.use(csrf({ cookie: true }))
  // app.use(auth) // Apply authentication globally
  // app.use(authorize(['user'])) // Apply a base level of authorization globally

  // Set up ServiceRegistry
  const serviceRegistry = new ServiceRegistry(globalMessageBus)
  serviceConfigs.forEach(config => {
    console.log(config.name + ' registered')
    serviceRegistry.registerService(config.name, config.type)
  })

  // Create DynamicController
  const dynamicController = new DynamicController(serviceRegistry)

  // Set up routes
  const routes = setupRoutes(dynamicController)
  app.use('/api', routes)

  // Set up message handlers
  setupMessageHandlers(globalMessageBus)

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`)
  })
}

startServer().catch(error => {
  logger.error('Failed to start server:', error)
  // eslint-disable-next-line n/no-process-exit
  process.exit(1)
})
