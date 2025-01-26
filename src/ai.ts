import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()
const apiKey = process.env.AI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey!)

export const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
})

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
}

export const ai = model.startChat({
    generationConfig,
    history: [],
})
