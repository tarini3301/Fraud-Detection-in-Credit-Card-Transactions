
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { TransactionInput, FraudReport } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "fallback_key_if_not_set_for_initialization_only" }); // Fallback to prevent crash if not set, but calls will fail.

export const analyzeTransaction = async (transaction: TransactionInput): Promise<FraudReport> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured.");
  }

  const model = ai.models; // Access models through the ai instance

  const prompt = `
Analyze the following credit card transaction for potential fraud.
Transaction Details:
- Amount: ${transaction.amount} USD
- Merchant Category: ${transaction.merchantCategory}
- Hour of Day (0-23): ${transaction.hourOfDay}

Respond ONLY with a JSON object matching this TypeScript interface:
interface FraudAssessment {
  isFraudulent: boolean; // true if fraudulent, false otherwise
  confidenceScore: number; // A score between 0.0 (low confidence) and 1.0 (high confidence) that this assessment is correct.
  assessmentSummary: string; // A brief summary (max 50 words) explaining the reasoning behind the classification.
}
Do not include any other text, explanations, or markdown formatting like \`\`\`json ... \`\`\` outside the JSON object itself.
Ensure the confidenceScore reflects how sure the model is about its 'isFraudulent' classification based on the provided details.
For example, a transaction at 3 AM for a large amount in 'Electronics' might be suspicious.
A small amount for 'Groceries' at 2 PM might be less suspicious.
`;

  try {
    const response: GenerateContentResponse = await model.generateContent({
        model: "gemini-2.5-flash-preview-04-17", // Ensure this is the correct and available model
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            temperature: 0.3, // Lower temperature for more deterministic/factual response
        }
    });

    let jsonStr = response.text.trim();
    // Gemini sometimes wraps JSON in ```json ... ``` even with responseMimeType
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr) as FraudReport;

    // Basic validation of the parsed data structure
    if (typeof parsedData.isFraudulent !== 'boolean' ||
        typeof parsedData.confidenceScore !== 'number' ||
        parsedData.confidenceScore < 0 || parsedData.confidenceScore > 1 ||
        typeof parsedData.assessmentSummary !== 'string') {
      throw new Error("Received malformed JSON response from AI model.");
    }
    
    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof Error) {
        // Check for specific Gemini API error messages if available
        if (error.message.includes("API key not valid")) {
             throw new Error("Invalid Gemini API Key. Please check your configuration.");
        }
         throw new Error(`AI API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the AI model.");
  }
};
    