import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DB_URL! + '?sslmode=require', {
  dialect: 'postgres',
  models: [__dirname + '/../models/**/*.{ts,js}'],
  logging: false
})

export default db