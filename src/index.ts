import 'dotenv/config'
import { client } from './lib/client'
import { player } from './lib/player'
import './events/playerEvents'
import { GuildMember, REST, Routes } from 'discord.js'
import { commands } from './command'
import { DefaultExtractors } from '@discord-player/extractor'
import { play } from './commands/player/play'
import { pause } from './commands/player/pause'
import { skip } from './commands/player/skip'
import { nowplaying } from './commands/player/nowplaying'
import { mainqueue } from './commands/player/queue'
import { shuffle } from './commands/player/shuffle'
import { stop } from './commands/player/stop'
import { handleKick } from './commands/admin/handleKick'
import { handleBan } from './commands/admin/handleBan'
import { handleMute } from './commands/admin/handleMute'
import { handleWarn } from './commands/admin/handleWarn'
import { handlePurge } from './commands/admin/handlePurge'

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN!)

client.once('ready', async () => {
    console.log(`🤖 Logged in as ${client.user?.tag}`)
})

client.on('interactionCreate', async (interaction) => {
    try {
        interaction
        if (!interaction.isChatInputCommand()) return
        await interaction.deferReply({ ephemeral: false })

        const queue =
            player.nodes.get(interaction.guildId!) ||
            player.nodes.create(interaction.guildId!, {
                metadata: {
                    channel: interaction.channel,
                    requestedBy: interaction.user,
                },
                selfDeaf: true,
                volume: 50,
                leaveOnEmpty: true,
                leaveOnEnd: true,
            })

        switch (interaction.commandName) {
            case 'play':
                play({ interaction, queue })
                break
            case 'pause':
                pause({ interaction, queue })
                break
            case 'skip':
                skip({ interaction, queue })
                break
            case 'nowplaying':
                nowplaying({ interaction, queue })
                break
            case 'queue':
                mainqueue({ interaction, queue })
                break
            case 'shuffle':
                shuffle({ interaction, queue })
                break
            case 'stop':
                stop({ interaction, queue })
                break
            // case 'kick':
            //     await handleKick(interaction)
            //     break
            // case 'ban':
            //     await handleBan(interaction)
            //     break
            // case 'mute':
            //     await handleMute(interaction)
            //     break
            // case 'warn':
            //     await handleWarn(interaction)
            //     break
            // case 'purge':
            //     await handlePurge(interaction)
            //     break

            default:
                return interaction.reply('❌ Unknown command!')
        }
    } catch (error) {
        console.error('Interaction error:', error)
    }
})

async function main() {
    try {
        await player.extractors.loadMulti(DefaultExtractors)
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
            body: commands,
        })
        await client.login(process.env.CLIENT_TOKEN)
    } catch (error) {
        console.error('Failed to initialize bot:', error)
        process.exit(1)
    }
}

main()
