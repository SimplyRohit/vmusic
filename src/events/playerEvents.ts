import { player } from '../lib/player'

player.events.on('playerStart', (queue, track) => {
    queue.metadata.channel.send(`🎵 Now playing: **${track.title}**`)
})

player.events.on('audioTrackAdd', (queue, track) => {
    queue.metadata.channel.send(`➕ Added to queue: **${track.title}**`)
})

player.events.on('disconnect', (queue) => {
    queue.metadata.channel.send('❌ Disconnected from the voice channel.')
})

player.events.on('error', (queue, error) => {
    console.error('Player error:', error)
    queue.metadata.channel.send('⚠️ An error occurred with the music player.')
})
