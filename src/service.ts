import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"

dotenv.config()

import routes from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', routes)

const port = process.env.API_PORT

try{
  app.listen(port, () => console.log(`${process.env.API_SERVERUP_MESSAGE}${port}/`))
} catch (error) {
  console.error(error)
}

export default app