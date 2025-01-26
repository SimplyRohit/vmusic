import { Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
})

client.login(process.env.CLIENT_TOKEN!)
