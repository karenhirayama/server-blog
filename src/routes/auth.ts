import { Router } from 'express'

import { validateRegister } from '../middleware/validation'
import { authenticateJWT } from '../middleware/auth'

import { authController } from '../controllers/authController'

const router = Router()

router.post('/register', validateRegister, authController.register)
router.post('/login', authController.login)
router.get('/profile', authenticateJWT, authController.getProfile)
router.post('/logout', authenticateJWT, authController.logout)

export const authRoutes = router