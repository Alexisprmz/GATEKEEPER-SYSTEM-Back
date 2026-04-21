import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DB_URL!, {
  dialect: 'postgres',
  models: [__dirname + '/../models/**/*.{ts,js}'],
  logging: false
})

export default db