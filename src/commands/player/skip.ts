export const skip = async ({ interaction, queue }) => {
    if (!queue.currentTrack) {
        return interaction.editReply('❌ No track to skip!')
    }
    queue.node.skip()
    return interaction.editReply('⏭️ Skipped current track')
}
