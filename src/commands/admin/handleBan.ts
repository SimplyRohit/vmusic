import { logAction } from './logAction'

export async function handleBan(interaction) {
    const targetUser = interaction.options.getUser('user')
    const reason =
        interaction.options.getString('reason') || 'No reason provided'
    const days = interaction.options.getInteger('days') || 0

    try {
        const member = await interaction.guild.members.fetch(targetUser.id)

        if (!member.bannable) {
            return interaction.editReply('❌ Cannot ban this user')
        }

        await member.ban({ reason, deleteMessageDays: days })

        await interaction.editReply(`✅ Banned ${targetUser.tag}`)
        logAction('Ban', targetUser, interaction.user, reason)
    } catch (error) {
        console.error(error)
        interaction.editReply('❌ Ban failed')
    }
}
