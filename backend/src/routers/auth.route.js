import {Router} from 'express'
import { googleLogin, login, logout, register } from '../controllers/user.controller.js'

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/google-auth', googleLogin)
authRouter.post('/logout', logout)

export default authRouter