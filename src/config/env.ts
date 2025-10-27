import { config } from 'dotenv'

config()

export const ENV = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN) || (60 * 60 * 24),
  NODE_ENV: process.env.NODE_ENV || 'development',
}
