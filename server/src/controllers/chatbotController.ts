import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const handleChat = async (req: Request, res: Response) => {
    const { message } = req.body;
    const maxRetries = 3; 

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

   
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await model.generateContent(message);
            const response = await result.response;
            const text = response.text();

            return res.json({ reply: text }); 

        } catch (error: any) {
            if (error.status === 503 && attempt < maxRetries) {
                console.log(`Attempt ${attempt} failed with 503. Retrying in ${attempt * 1000}ms...`);
                await sleep(attempt * 1000);
            } else {
                console.error(`Error with AI model after ${attempt} attempts:`, error);
                return res.status(500).json({ error: 'Failed to get response from AI model. Please try again later.' });
            }
        }
    }
};