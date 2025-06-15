
export interface TransactionInput {
  amount: number;
  merchantCategory: string;
  hourOfDay: number; // 0-23
}

export interface FraudReport {
  isFraudulent: boolean;
  confidenceScore: number; // 0.0 to 1.0
  assessmentSummary: string;
}

// For Recharts data, ensure it's an array of objects
export interface ROCDataPoint {
  fpr: number; // False Positive Rate
  tpr: number; // True Positive Rate
}

export interface ConfusionMatrixData {
  tn: number; // True Negatives
  fp: number; // False Positives
  fn: number; // False Negatives
  tp: number; // True Positives
}
    