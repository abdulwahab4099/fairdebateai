// Gemini API client configuration
import { GoogleGenAI } from '@google/genai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined');
}

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const MODEL_NAME = 'gemini-2.5-flash';

export const generateContent = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      temperature: 0.6,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
  });
  
  if (!response.text) {
    throw new Error('No response text received from Gemini API');
  }
  
  return response.text;
};
