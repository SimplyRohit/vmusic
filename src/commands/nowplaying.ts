export const nowplaying = async ({ interaction, queue }) => {
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
