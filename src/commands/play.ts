import { GuildMember } from 'discord.js'
import { player } from '../lib/player'

export const play = async ({ interaction, queue }) => {
    const { options, member } = interaction
    const voiceChannel = (member as GuildMember)?.voice.channel

    if (!voiceChannel) {
        return interaction.editReply('❌ You must be in a voice channel!')
    }
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
        return interaction.editReply('❌ Failed to join voice channel!')
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
