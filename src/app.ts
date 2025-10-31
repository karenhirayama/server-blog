import express from 'express'

import { authRoutes } from './routes/auth'
import { postRoutes } from './routes/post'
import { commentRoutes } from './routes/comment'

import passport from './config/passport'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

// Health Check Endpoint
app.get('/health', (req, res) => {
  console.log('Health check endpoint called')
  res.status(200).json({ status: 'OK', success: true, message: 'Server is healthy', timestamp: new Date() })
})

export default app
