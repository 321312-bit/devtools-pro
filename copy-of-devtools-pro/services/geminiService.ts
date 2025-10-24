
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = 'gemini-2.5-flash';

export const generateRegex = async (description: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: description,
      config: {
        systemInstruction: `You are an expert in regular expressions. 
Your task is to generate a regular expression based on the user's description. 
Provide only the regex pattern itself, without any explanations, code block fences (like \`\`\`), or language-specific delimiters (like /.../).
For example, if the user asks for "an email validator", you should only output "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$".`,
        temperature: 0.2,
      }
    });

    const regex = response.text.trim();
    // Clean up potential markdown formatting just in case
    return regex.replace(/^```(regex)?\n?|\n?```$/g, '');
  } catch (error) {
    console.error("Error generating regex:", error);
    throw new Error("Failed to generate regex. Please check your API key and network connection.");
  }
};

export const convertCode = async (code: string, from: string, to: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Translate the following ${from} code to ${to}:\n\n${code}`,
      config: {
        systemInstruction: `You are an expert code translator. Your task is to convert the given code snippet from the source language to the target language. 
Provide ONLY the raw code for the target language. 
Do not include any explanations, comments about the translation, or markdown code fences like \`\`\`. 
Your output must be ready to be compiled or executed directly.`,
        temperature: 0.1,
      }
    });
    
    const translatedCode = response.text.trim();
    return translatedCode.replace(/^```[a-zA-Z]*\n?|\n?```$/g, '');

  } catch (error) {
    console.error("Error converting code:", error);
    throw new Error("Failed to convert code. Please check your API key and network connection.");
  }
};
