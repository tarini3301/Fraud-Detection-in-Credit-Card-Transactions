
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { TransactionInput, Prediction } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

export async function detectFraud(transaction: TransactionInput, apiKey: string): Promise<Prediction> {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Analyze the following credit card transaction for potential fraud.
    Provide your assessment as "Fraudulent" or "Legitimate".
    Also, provide a brief, one-sentence reasoning for your assessment.
    Optionally, if you can estimate, provide a confidence score between 0.0 and 1.0 (e.g., Confidence: 0.85).

    Transaction Details:
    - Amount: $${transaction.amount.toFixed(2)}
    - Merchant Category: ${transaction.merchantCategory}
    - Hour of Day (0-23, 0 being midnight): ${transaction.hourOfDay}
    - International Transaction: ${transaction.isInternational ? 'Yes' : 'No'}
    - Card Physically Present: ${transaction.cardPresent ? 'Yes' : 'No'}
    - User Historical Behavior Score (0-100, lower is riskier, higher is safer): ${transaction.userHistoryScore}

    Based on these details, assess the transaction.
    Format your response STRICTLY as:
    Assessment: [Fraudulent/Legitimate]
    Reason: [Your one-sentence reason]
    (Optional) Confidence: [Your confidence score, e.g., 0.XX]
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
    });
    
    const text = response.text;
    
    // Parse the response
    const lines = text.split('\n');
    let isFraudulent = false;
    let reason = "Could not determine reason.";
    let confidenceScore: number | undefined = undefined;

    const assessmentLine = lines.find(line => line.toLowerCase().startsWith("assessment:"));
    if (assessmentLine) {
        const assessmentValue = assessmentLine.substring("assessment:".length).trim().toLowerCase();
        if (assessmentValue === "fraudulent") {
            isFraudulent = true;
        }
    }

    const reasonLine = lines.find(line => line.toLowerCase().startsWith("reason:"));
    if (reasonLine) {
        reason = reasonLine.substring("reason:".length).trim();
    }
    
    const confidenceLine = lines.find(line => line.toLowerCase().startsWith("confidence:"));
    if (confidenceLine) {
        const scoreStr = confidenceLine.substring("confidence:".length).trim();
        const score = parseFloat(scoreStr);
        if (!isNaN(score) && score >= 0 && score <= 1) {
            confidenceScore = score;
        }
    }


    // Fallback if structured parsing fails but text is available
    if (!assessmentLine && text.toLowerCase().includes("fraudulent")) {
        isFraudulent = true;
        reason = text; // Use full text as reason if parsing specific line fails
    } else if (!assessmentLine && text.toLowerCase().includes("legitimate")) {
        isFraudulent = false;
        reason = text;
    }


    return {
      isFraudulent,
      reason,
      confidenceScore
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("Invalid API Key. Please check your configuration.");
    }
    throw new Error("Failed to communicate with the AI model. Please try again later.");
  }
}
    