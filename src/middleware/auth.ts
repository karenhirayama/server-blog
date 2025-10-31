import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../types/user'

import { ENV } from '../config/env'

export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  }

  const options: jwt.SignOptions = {
    expiresIn: ENV.JWT_EXPIRES_IN || '1d',
  }

  return jwt.sign(payload, ENV.JWT_SECRET, options)
}

export const verifyToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as jwt.JwtPayload
    return {
      id: decoded.id,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
    } as User
  } catch (error) {
    return null
  }
}

export const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  console.log('req.isAuthenticated()', req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/login')
}

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated() && (req.user as User)?.isAdmin) {
    return next()
  }
  res.redirect('/')
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1] as string

    try {
      const user = verifyToken(token)
      if (user) {
        req.user = user
        return next()
      }
    } catch (error) {
      res.status(403).json({ success: false, message: 'Invalid token' })
      return
    }
  }

  res.status(401).json({ success: false, message: 'Authentication required' })
}