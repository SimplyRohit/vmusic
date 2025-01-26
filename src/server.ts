import { client } from './client'
import { player } from './player'

import { ai } from './ai'
import { DefaultExtractors } from '@discord-player/extractor'
import {
    joinVoiceChannel,
    createAudioPlayer,
    VoiceReceiver,
} from '@discordjs/voice'
import { SpeechClient } from '@google-cloud/speech'
import { rest } from './cmd'
import { Routes } from 'discord.js'
import { useMainPlayer } from 'discord-player'

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`)
})

client.on('interactionCreate', (interaction) => {
    console.log(interaction)
})
client.on('error', console.error)
client.on('warn', console.warn)

//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

player.events.on('playerStart', (queue, track) => {
    queue.metadata.send(`Started playing: **${track.title}**`)
})

player.events.on('audioTrackAdd', (queue, track) => {
    queue.metadata.send(`Track **${track.title}** queued`)
})

player.events.on('audioTracksAdd', (queue, track) => {
    queue.metadata.send(`Multiple Track's queued`)
})

player.events.on('playerSkip', (queue, track) => {
    queue.metadata.send(`Skipping **${track.title}** due to an issue!`)
})

player.events.on('disconnect', (queue) => {
    queue.metadata.channel.send('Disconnected from the voice channel.')
})
;(async () => {
    await player.extractors.loadMulti(DefaultExtractors)
})()

//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const commands = [
    {
        name: 'play',
        description: 'Plays a song in your voice channel.',
        options: [
            {
                name: 'query',
                type: 3, // STRING
                description: 'The song name or URL',
                required: true,
            },
        ],
    },
    {
        name: 'skip',
        description: 'Skips the currently playing song.',
    },
    {
        name: 'queue',
        description: 'Displays the current music queue.',
    },
    {
        name: 'stop',
        description: 'Stops the music and clears the queue.',
    },
]

;(async () => {
    try {
        console.log('Started refreshing application (/) commands.')
        await rest.put(Routes.applicationCommands('1266946967528013874'), {
            body: commands,
        })
        console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
        console.error(error)
    }
})()

//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
