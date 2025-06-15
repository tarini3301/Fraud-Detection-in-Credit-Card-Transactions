
export interface TransactionInput {
  amount: number;
  merchantCategory: string;
  hourOfDay: number; // 0-23
  isInternational: boolean;
  cardPresent: boolean;
  userHistoryScore: number; // 0-100, a mock score for user's past behavior
}

export interface Prediction {
  isFraudulent: boolean;
  reason: string;
  confidenceScore?: number; // Optional, if Gemini can provide
}

// For ROC Chart
export interface ROCDataPoint {
  fpr: number; // False Positive Rate
  tpr: number; // True Positive Rate
}

// For Confusion Matrix
export interface ConfusionMatrixData {
  TP: number; // True Positives
  FP: number; // False Positives
  FN: number; // False Negatives
  TN: number; // True Negatives
}
    