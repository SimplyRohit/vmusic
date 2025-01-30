export const stop = async ({ interaction, queue }) => {
    if (!queue.isPlaying()) {
        return interaction.editReply('❌ No music is playing!')
    }
    queue.node.stop()
    return interaction.editReply('⏸️ stopped')
}
