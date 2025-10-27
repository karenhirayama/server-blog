import { Router } from 'express'
import passport from 'passport'
import { validateRegister } from '../middleware/validation'
import { authController } from '../controllers/authController'

const router = Router()

router.post('/register', validateRegister, authController.register)
router.post('/login', authController.login)
router.get('/profile', passport.authenticate('jwt', { session: false }), authController.getProfile)
router.post('/logout', passport.authenticate('jwt', { session: false }), authController.logout)

export const authRoutes = router
