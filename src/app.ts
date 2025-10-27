import express from 'express'
import passport from 'passport'
import { authRoutes } from './routes/auth'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

// Routes
app.use('/api/auth', authRoutes)

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', success: true, message: 'Server is healthy', timestamp: new Date() })
})

export default app
