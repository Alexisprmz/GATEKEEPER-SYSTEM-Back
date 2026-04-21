import express from 'express'
import cors from 'cors'
import routerAcceso from './routerAcceso'
import db from './config/db'
import dotenv from 'dotenv'

dotenv.config()

async function connectDB() {
  try {
    await db.authenticate()
    await db.sync()
    console.log('Conexion Exitosa')
  } catch (error) {
    console.log(error)
    console.log('Hubo un error al conectar')
  }
}

connectDB()

const server = express()

server.use(cors())
server.use(express.json())

server.get('/', (_req, res) => {
  res.json({ ok: true, message: 'API funcionando' })
})

server.use('/api', routerAcceso)

export default server