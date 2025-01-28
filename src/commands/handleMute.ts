export async function handleMute(interaction) {
    const targetUser = interaction.options.getUser('user')
    const duration = interaction.options.getInteger('duration')
    const reason =
        interaction.options.getString('reason') || 'No reason provided'

    try {
        const member = await interaction.guild.members.fetch(targetUser.id)
        const muteRole = interaction.guild.roles.cache.find(
            (r) => r.name === 'Muted'
        )

        if (!muteRole) {
            return interaction.editReply('❌ Mute role not found')
        }

        await member.roles.add(muteRole)
        await interaction.editReply(
            `⏳ Muted ${targetUser.tag} for ${duration} minutes`
        )

        setTimeout(async () => {
            try {
                await member.roles.remove(muteRole)
            } catch (error) {
                console.error('Auto-unmute failed:', error)
            }
        }, duration * 60000)
    } catch (error) {
        console.error(error)
        interaction.editReply('❌ Mute failed')
    }
}
