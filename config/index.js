import dotenv from 'dotenv'

dotenv.config();

export const {
    DB_URL,
    JWT_SECRET
} = process.env