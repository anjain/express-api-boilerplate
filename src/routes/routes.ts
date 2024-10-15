import express from 'express'
import { DynamicController } from '../controllers/DynamicController'
// import { authorize } from '../middleware/authorize'

export function setupRoutes(
  dynamicController: DynamicController,
): express.Router {
  const router = express.Router()

  router.post('/:model', dynamicController.create)
  router.get('/:model', dynamicController.getAll)
  router.put('/:model/:id', dynamicController.update)
  router.delete('/:model/:id', dynamicController.delete)

  return router
}
