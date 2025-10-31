import { Request, Response, NextFunction } from 'express'

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: 'Email, password, and name are required.',
    })
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Name must be a non-empty string.',
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format.' })
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' })
  }

  next()
}

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Title and content are required.',
    })
  }

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Title must be a non-empty string.',
    })
  }

  if (typeof content !== 'string' || content.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Content must be a non-empty string.',
    })
  }

  next()
}