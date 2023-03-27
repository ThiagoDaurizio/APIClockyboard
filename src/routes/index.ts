import { Router } from 'express'

import UserControllers from '../app/controllers/UserController'

const routes = Router()

routes.post('/signup', UserControllers.signup)
routes.post('/login', UserControllers.login)

export default routes