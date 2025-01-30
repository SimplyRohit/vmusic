export const shuffle = async ({ interaction, queue }) => {
    if (queue.tracks.size < 2) {
        return interaction.editReply('❌ Not enough tracks to shuffle!')
    }

    queue.tracks.shuffle()
    return interaction.editReply('🔀 Queue shuffled!')
}
