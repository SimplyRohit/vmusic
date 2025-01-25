import { Client, GuildMember, Intents } from 'discord.js'
import '../config.json'
import { Player, QueryType } from 'discord-player'

const client = new Client({
    intents: [
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
    ],
})
client.login(config.token)

client.once('ready', () => {
    console.log('Ready!')
})

client.on('error', console.error)
client.on('warn', console.warn)
