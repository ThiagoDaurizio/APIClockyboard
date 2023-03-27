import { autheticationData } from "../../utils/tokenMaker";
import HashManager from "../../utils/hashManager";
import IdMaker from "../../utils/idMaker";
import TokenMaker from "../../utils/tokenMaker";
import InputVerifications from '../../helpers/inputVerifications'
import { PrismaClient } from '@prisma/client'
import { DTOUserLogin, DTOUserSingup } from "../../types/DTO/DTOuser";

const prisma = new PrismaClient()

const UserBusiness = {
  async signup (input: DTOUserSingup):Promise<any> {
    const { name, email, password } = input

    let message: string = "Account created with sucess"
    let status: number = 201

    if(!name || !email || !password) {
      status = 406
      message = "'name', 'email' and 'password' must be prodided"
      return {status, message}
    }

    const userData = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    })

    if(userData) {
      status = 409 
      message = 'This email already registered'
      return {status, message}
    }

    if(!InputVerifications.EmailVerification(email)) {
      status = 400
      message = "This dont is an valid email format"
      return {status, message}
    }

    const id = IdMaker.generate()

    const hashedPassword = await HashManager.hash(password)

    const body = {
      id: id,
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword
    }

    await prisma.user.create({ data: body })

    const token = TokenMaker.generate({ id: id })

    return {token, status, message}
  },
  async login (input: DTOUserLogin):Promise<any> {
    const { email, password } = input

    let message: string = 'Account logged with success'
    let status: number = 200

    if(!email || !password) {
      message = "'email' and 'password' must be provided"
      status = 406
      return {status, message}
    }

    const userData = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    })

    if(!userData) {
      status = 409 
      message = 'Invalid credentials'
      return {status, message}
    }

    const comparedPassword: boolean = await HashManager.compare(password, userData.password)

    if(!comparedPassword) {
      status = 409 
      message = 'Invalid credentials'
      return {status, message}
    }

    const token: string = TokenMaker.generate( { id: userData.id } )

    return {token, status, message}
  }
}

export default UserBusiness