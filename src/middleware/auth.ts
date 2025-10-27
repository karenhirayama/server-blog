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
