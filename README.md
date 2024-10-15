# Express API Boilerplate

This project is an Express.js API boilerplate with TypeScript, designed to provide a scalable and extensible foundation for building robust APIs.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB or any SQL database

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. For development:

```bash
npm run dev
```

2. For production:

```bash
npm run compile
npm start
```

## Project Structure

The project follows a modular structure:

- `src/`: Contains the source code

  - `config/`: Configuration files
  - `controllers/`: Controllers handle incoming HTTP requests, interact with services to process data, and send responses back to the client.

  - `facades/`: Complex operations involving multiple services
  - `factories/`: Factory classes are responsible for creating and configuring services. They handle dependency injection and ensure that services are properly initialized.

  - `middleware/`: Custom middleware
  - `models/`: Database models that represent the data structure of your application. They define the schema for your database documents and provide an interface for interacting with the data.

  - `repositories/`: Data access layer that handles data access operations. They abstract the database interactions and provide methods for CRUD operations.

  - `routes/`: API routes
  - `services/`: Services contain the business logic of your application. They use repositories to fetch and manipulate data, and implement the core functionality of your API.

  - `utils/`: Utility functions and classes
  - `validators/`: Validators ensure that incoming data meets the required structure and constraints before it's processed by the application.

## Extending the Framework

### Adding New Services

1. Create a new model in `src/models/`
2. Create a new repository in `src/repositories/` extending `BaseRepository`
3. Create a new validator in `src/validators/` extending `BaseValidator`
4. Create a new service factory in `src/factories/` extending `ServiceFactory`
5. Add the new service to `src/config/services.ts`
   Example:

```typescript
import { IUser } from 'models/User'
import { UserRepository } from '../repositories/UserRepository'
import { UserValidator } from '../validators/UserValidator'
import { ServiceFactory } from './ServiceFactory'

export class UserServiceFactory extends ServiceFactory<IUser> {
  protected createValidator() {
    return new UserValidator()
  }

  protected createRepository() {
    return new UserRepository()
  }
}
```

### Adding Custom Routes

1. Create a new controller in `src/controllers/`
2. Add new routes in `src/routes/routes.ts`
   Example:

```ts
import express from 'express'
import { DynamicController } from '../controllers/DynamicController'

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
```

### Adding Custom Middleware

1. Create a new middleware file in `src/middleware/`
2. Use the middleware in your routes or app configuration

Example (Auth Middleware):

```ts
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
```

## Key Features

- Dynamic service registration and routing
- Base classes for models, repositories, and services
- Centralized error handling
- Input validation using Joi
- Logging with Winston
- Authentication middleware
- Message bus for event-driven architecture

## Best Practices

- Use dependency injection for better testability and modularity
- Follow the Single Responsibility Principle
- Use TypeScript for better type safety and developer experience
- Implement proper error handling and logging
- Use environment variables for configuration
