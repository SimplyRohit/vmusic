import { REST, Routes } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

export const rest = new REST({ version: '10' }).setToken(
    process.env.CLIENT_TOKEN!
)
