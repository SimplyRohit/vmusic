import { logAction } from './logAction'

export async function handleWarn(interaction) {
    const targetUser = interaction.options.getUser('user')
    const reason = interaction.options.getString('reason')

    // Store warning
    if (!warnings.has(targetUser.id)) warnings.set(targetUser.id, [])
    warnings.get(targetUser.id).push({
        reason,
        moderator: interaction.user.tag,
        date: new Date(),
    })

    await interaction.editReply(`⚠️ Warned ${targetUser.tag}`)
    logAction('Warn', targetUser, interaction.user, reason)
}
