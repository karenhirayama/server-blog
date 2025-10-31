import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { UserModel } from '../models/userModel'

import { generateToken } from '../middleware/auth'

import { User } from '../types/user'

import passport from '../config/passport'

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name, isAdmin = false } = req.body

      const existingUser = await UserModel.findByEmail(email)
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'User already exists.' })
      }

      const hashPassword = bcrypt.hashSync(password, 10)

      const newUser = await UserModel.create({ name, isAdmin, email, password: hashPassword })

      const token = generateToken(newUser)

      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            name: newUser.name,
          },
          token,
        },
      })
    } catch (error) {
      console.error('Error registering user:', error)
      res.status(500).json({ success: false, message: 'Internal server error.' })
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', { session: false }, (err: Error, user: User, info: { message: string }) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).json({ success: false, message: info?.message || 'Invalid email or password.' })
      }

      const token = generateToken(user)

      return res.status(200).json({
        success: true,
        message: 'User logged in successfully.',
        data: {
          user: {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            name: user.name,
          },
          token,
        },
      })
    })(req, res, next)
  },

  async loginManual(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' })
      }

      const user = await UserModel.findByEmail(email)
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' })
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' })
      }

      const token = generateToken(user)

      res.status(200).json({
        success: true,
        message: 'User logged in successfully.',
        data: {
          user: {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            name: user.name,
          },
          token,
        },
      })
    } catch (error) {
      console.error('Error logging in user:', error)
      res.status(500).json({ success: false, message: 'Internal server error.' })
    }
  },

  async getProfile(req: Request, res: Response) {
    res.json({
      success: true,
      message: 'User profile fetched successfully.',
      data: {
        id: (req.user as User)?.id,
        email: (req.user as User)?.email,
        name: (req.user as User)?.name,
        isAdmin: (req.user as User)?.isAdmin,
      },
    })
  },

  async logout(req: Request, res: Response) {
    res.json({ success: true, message: 'User logged out successfully.' })
  },
}
