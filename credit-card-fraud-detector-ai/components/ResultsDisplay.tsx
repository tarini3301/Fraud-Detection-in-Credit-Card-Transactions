
import React from 'react';
import type { TransactionInput, FraudReport } from '../types';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ResultsDisplayProps {
  transaction: TransactionInput;
  report: FraudReport;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ transaction, report }) => {
  const confidencePercentage = (report.confidenceScore * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Fraud Assessment Result
      </h2>

      <div className={`p-6 rounded-xl shadow-lg ${report.isFraudulent ? 'bg-red-800 bg-opacity-40 border border-red-700' : 'bg-green-800 bg-opacity-40 border border-green-700'}`}>
        <div className="flex items-center justify-center mb-4">
          {report.isFraudulent ? (
            <AlertTriangleIcon className="h-12 w-12 text-red-400 mr-3" />
          ) : (
            <CheckCircleIcon className="h-12 w-12 text-green-400 mr-3" />
          )}
          <p className={`text-3xl font-bold ${report.isFraudulent ? 'text-red-300' : 'text-green-300'}`}>
            {report.isFraudulent ? 'Potentially Fraudulent' : 'Likely Not Fraudulent'}
          </p>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-sm text-gray-400">AI Confidence Score</p>
          <p className={`text-2xl font-semibold ${report.isFraudulent ? 'text-red-400' : 'text-green-400'}`}>{confidencePercentage}%</p>
        </div>
        
        <p className="text-gray-300 text-center leading-relaxed">{report.assessmentSummary}</p>
      </div>

      <div className="bg-gray-700 bg-opacity-50 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-600 pb-2">Transaction Details Reviewed</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-400">Amount: </span>
            <span className="text-gray-100">${transaction.amount.toFixed(2)}</span>
          </div>
          <div>
            <span className="font-medium text-gray-400">Merchant Category: </span>
            <span className="text-gray-100">{transaction.merchantCategory}</span>
          </div>
          <div>
            <span className="font-medium text-gray-400">Hour of Day: </span>
            <span className="text-gray-100">{String(transaction.hourOfDay).padStart(2, '0')}:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
    