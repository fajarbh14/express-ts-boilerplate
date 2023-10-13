import { Router } from 'express'
import AuthController from '../../controllers/auth.controller'
import { loginSchema } from '../../dto'
import { validate } from '../../utils'
const router = Router()
const authController = new AuthController()
router.post('/login', validate(loginSchema), authController.login)
router.post('/register', authController.register)
export default router
