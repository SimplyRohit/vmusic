export const handlePurge = async (interaction) => {
    const amount = interaction.options.getInteger('amount')
    if (amount < 1 || amount > 100) {
        return interaction.editReply(
            '❌ Invalid amount! Please enter a value between 1 and 100.'
        )
    }

    try {
        await interaction.channel?.bulkDelete(amount)
        await interaction.editReply(
            `✅ Successfully purged ${amount} messages!`
        )
    } catch (error) {
        console.error('Purge Error:', error)
        await interaction.editReply(
            '❌ Failed to purge messages. Ensure messages are within 14 days old.'
        )
    }
}
