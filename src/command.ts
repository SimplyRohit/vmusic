import { PermissionsBitField } from 'discord.js'

export const commands = [
    {
        name: 'play',
        description: 'Play a song in a voice channel',
        options: [
            {
                name: 'song',
                description: 'The song to play',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'pause',
        description: 'Pause the currently playing song',
    },

    {
        name: 'skip',
        description: 'Skip the currently playing song',
    },

    { name: 'nowplaying', description: 'Show the currently playing song' },
    { name: 'queue', description: 'Show the queue' },
    { name: 'shuffle', description: 'Shuffle the queue' },
    { name: 'stop', description: 'Stop the player' },

    {
        name: 'mod',
        description: 'Moderation commands',
        options: [
            {
                name: 'kick',
                description: 'Kick a user from the server',
                type: 1,
                options: [
                    {
                        name: 'user',
                        description: 'User to kick',
                        type: 6,
                        required: true,
                    },
                    {
                        name: 'reason',
                        description: 'Reason for kick',
                        type: 3,
                        required: false,
                    },
                ],
            },
            {
                name: 'ban',
                description: 'Ban a user from the server',
                type: 1,
                options: [
                    {
                        name: 'user',
                        description: 'User to ban',
                        type: 6,
                        required: true,
                    },
                    {
                        name: 'reason',
                        description: 'Reason for ban',
                        type: 3,
                        required: false,
                    },
                    {
                        name: 'days',
                        description: 'Days of messages to delete',
                        type: 4,
                        required: false,
                    },
                ],
            },
            {
                name: 'mute',
                description: 'Mute a user',
                type: 1,
                options: [
                    {
                        name: 'user',
                        description: 'User to mute',
                        type: 6,
                        required: true,
                    },
                    {
                        name: 'duration',
                        description: 'Mute duration (minutes)',
                        type: 4,
                        required: true,
                    },
                    {
                        name: 'reason',
                        description: 'Reason for mute',
                        type: 3,
                        required: false,
                    },
                ],
            },
            {
                name: 'warn',
                description: 'Warn a user',
                type: 1,
                options: [
                    {
                        name: 'user',
                        description: 'User to warn',
                        type: 6,
                        required: true,
                    },
                    {
                        name: 'reason',
                        description: 'Reason for warning',
                        type: 3,
                        required: true,
                    },
                ],
            },
            {
                name: 'purge',
                description: 'Delete multiple messages',
                type: 1,
                options: [
                    {
                        name: 'amount',
                        description: 'Number of messages to delete',
                        type: 4,
                        required: true,
                    },
                ],
            },
        ],
    },
]
