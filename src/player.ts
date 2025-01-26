import { Player } from 'discord-player'
import { client } from './client'
import { DefaultExtractors } from '@discord-player/extractor'

export const player = new Player(client)
