export const mainqueue = async ({ interaction, queue }) => {
    if (!queue.tracks.size) {
        return interaction.editReply('❌ Queue is empty!')
    }

    const tracks = queue.tracks.toArray()
    const current = queue.currentTrack!

    const queueList = tracks
        .slice(0, 10)
        .map((track, i) => `${i + 1}. ${track.title} (${track.duration})`)
        .join('\n')

    return interaction.editReply(
        `**Current Track**\n${current.title}\n\n` +
            `**Up Next**\n${queueList}\n\n` +
            `${tracks.length > 10 ? `+ ${tracks.length - 10} more tracks` : ''}`
    )
}
