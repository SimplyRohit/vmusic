export const pause = async ({ interaction, queue }) => {
    if (!queue.isPlaying()) {
        return interaction.editReply('❌ No music is playing!')
    }
    queue.node.pause()
    return interaction.editReply('⏸️ Playback paused')
}
