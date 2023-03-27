import { Request, Response } from 'express'
import { DTOUserLogin, DTOUserSingup } from '../../types/DTO/DTOuser'
import UserBusiness from '../business/UserBusiness'

const UserControllers = {
  async signup (req: Request, res: Response):Promise<void> {
    const { name, email, password }: DTOUserSingup = req.body

    const input = {
      name: name,
      email: email,
      password: password
    }

    try {
      const business = await UserBusiness.signup(input)

      res.status(business.status).send({message: business.message, token: business.token})
    } catch (error) {
      console.error(error)
    }
  }, 
  async login (req: Request, res: Response) {
    const { email, password }: DTOUserLogin = req.body

    const input = {
      email: email, 
      password: password
    }

    try {
      const business = await UserBusiness.login(input)

      res.status(business.status).send({message: business.message, token: business.token})
    } catch (error) {
      console.error(error)
    }
  }
}

export default UserControllers