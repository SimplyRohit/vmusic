import 'dotenv/config'
import { client } from './lib/client'
import { player } from './lib/player'
import './events/playerEvents'
import { GuildMember, REST, Routes } from 'discord.js'
import { commands } from './command'
import { DefaultExtractors } from '@discord-player/extractor'

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN!)

client.once('ready', async () => {
    console.log(`🤖 Logged in as ${client.user.tag}`)
})

client.on('interactionCreate', async (interaction) => {
    try {
        interaction
        if (!interaction.isChatInputCommand()) return
        await interaction.deferReply({ ephemeral: false })

        const { commandName, options, guildId, member } = interaction
        const voiceChannel = (member as GuildMember)?.voice.channel

        if (!voiceChannel) {
            return interaction.editReply('❌ You must be in a voice channel!')
        }

        const queue =
            player.nodes.get(guildId!) ||
            player.nodes.create(guildId!, {
                metadata: {
                    channel: interaction.channel,
                    requestedBy: interaction.user,
                },
                selfDeaf: true,
                volume: 50,
                leaveOnEmpty: true,
                leaveOnEnd: true,
                disableEqualizer: true,
            })

        switch (commandName) {
            case 'play': {
                const songQuery = options.getString('song', true)
                const searchResult = await player.search(songQuery, {
                    requestedBy: interaction.user,
                })

                if (!searchResult.hasTracks()) {
                    return interaction.editReply('❌ No results found!')
                }

                try {
                    if (!queue.connection) await queue.connect(voiceChannel)
                } catch (error) {
                    console.error('Connection error:', error)
                    return interaction.editReply(
                        '❌ Failed to join voice channel!'
                    )
                }

                searchResult.playlist
                    ? queue.addTrack(searchResult.tracks)
                    : queue.addTrack(searchResult.tracks[0])

                if (!queue.isPlaying()) await queue.node.play()

                return interaction.editReply(
                    searchResult.playlist
                        ? `🎶 Added playlist **${searchResult.playlist.title}** (${searchResult.tracks.length} tracks)`
                        : `🎶 Added **${searchResult.tracks[0].title}** to queue`
                )
            }

            case 'pause': {
                if (!queue.isPlaying()) {
                    return interaction.editReply('❌ No music is playing!')
                }
                queue.node.pause()
                return interaction.editReply('⏸️ Playback paused')
            }

            case 'skip': {
                if (!queue.currentTrack) {
                    return interaction.editReply('❌ No track to skip!')
                }
                queue.node.skip()
                return interaction.editReply('⏭️ Skipped current track')
            }

            case 'nowplaying': {
                if (!queue.currentTrack) {
                    return interaction.editReply('❌ No track is playing!')
                }

                const track = queue.currentTrack
                const progress = queue.node.createProgressBar()

                return interaction.editReply(
                    `**Now Playing**\n` +
                        `Title: ${track.title}\n` +
                        `URL: ${track.url}\n` +
                        `Duration: ${track.duration}\n` +
                        `Progress: ${progress}\n` +
                        `Requested by: ${track.requestedBy?.toString()}`
                )
            }

            case 'queue': {
                if (!queue.tracks.size) {
                    return interaction.editReply('❌ Queue is empty!')
                }

                const tracks = queue.tracks.toArray()
                const current = queue.currentTrack!

                const queueList = tracks
                    .slice(0, 10)
                    .map(
                        (track, i) =>
                            `${i + 1}. ${track.title} (${track.duration})`
                    )
                    .join('\n')

                return interaction.editReply(
                    `**Current Track**\n${current.title}\n\n` +
                        `**Up Next**\n${queueList}\n\n` +
                        `${tracks.length > 10 ? `+ ${tracks.length - 10} more tracks` : ''}`
                )
            }

            case 'shuffle': {
                if (queue.tracks.size < 2) {
                    return interaction.editReply(
                        '❌ Not enough tracks to shuffle!'
                    )
                }

                queue.tracks.shuffle()
                return interaction.editReply('🔀 Queue shuffled!')
            }

            default:
                return interaction.editReply('❌ Unknown command!')
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
