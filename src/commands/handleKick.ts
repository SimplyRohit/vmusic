import { EmbedBuilder, PermissionsBitField } from 'discord.js'

export const handleKick = async (interaction) => {
    // Defer the reply to ensure we have time to process
    await interaction.deferReply({ ephemeral: true })

    const targetUser = interaction.options.getUser('user')
    const reason =
        interaction.options.getString('reason') || 'No reason provided'

    try {
        // Fetch member details from the guild
        const member = await interaction.guild.members.fetch(targetUser.id)

        // Check if the target is kickable
        if (!member.kickable) {
            return interaction.editReply(
                '❌ I cannot kick this user. They might have higher permissions than me.'
            )
        }

        // Check if the executor has permission to kick
        if (
            !interaction.memberPermissions.has(
                PermissionsBitField.Flags.KickMembers
            )
        ) {
            return interaction.editReply(
                '❌ You need the "Kick Members" permission to use this command.'
            )
        }

        // Attempt to kick the user
        await member.kick(reason)

        // Send confirmation message
        await interaction.editReply({
            content: `✅ Successfully kicked ${targetUser.tag} (${targetUser.id})`,
            allowedMentions: { users: [] }, // Prevent user mention
        })

        // Optional: Log the action in a channel
        const logChannel = interaction.guild.channels.cache.get(
            'YOUR_LOG_CHANNEL_ID'
        )
        if (logChannel?.isTextBased()) {
            await logChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xff0000)
                        .setTitle('Member Kicked')
                        .addFields(
                            {
                                name: 'User',
                                value: `${targetUser.tag} (${targetUser.id})`,
                            },
                            { name: 'Moderator', value: interaction.user.tag },
                            { name: 'Reason', value: reason }
                        )
                        .setTimestamp(),
                ],
            })
        }
    } catch (error) {
        console.error('Kick Command Error:', error)
        await interaction.editReply(
            '❌ Failed to kick user. Check my permissions and role hierarchy.'
        )
    }
}
