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
]
