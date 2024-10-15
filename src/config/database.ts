import mongoose from 'mongoose'
import logger from '../utils/logger'

export async function connectToDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/apitest',
    )
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('MongoDB connection error:', error)
    // eslint-disable-next-line n/no-process-exit
    process.exit(1)
  }
}
