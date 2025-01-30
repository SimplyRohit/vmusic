import { EmbedBuilder } from 'discord.js'

export function logAction(action, target, moderator, reason) {
    const logChannel = moderator.guild.channels.cache.get('YOUR_LOG_CHANNEL')
    if (!logChannel) return

    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${action} Action`)
        .addFields(
            { name: 'User', value: `${target.tag} (${target.id})` },
            { name: 'Moderator', value: moderator.tag },
            { name: 'Reason', value: reason || 'No reason provided' }
        )
        .setTimestamp()

    logChannel.send({ embeds: [embed] })
}
