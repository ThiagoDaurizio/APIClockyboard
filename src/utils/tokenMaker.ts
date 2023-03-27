import * as jwt from 'jsonwebtoken'

export type autheticationData = {
  id: string
}

const TokenMaker = {
  generate (input: autheticationData): string {
    const token = jwt.sign(
      input,
      process.env.JWT_KEY!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    return token
  }
}

export default TokenMaker