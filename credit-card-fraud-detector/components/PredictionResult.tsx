
import React from 'react';
import type { Prediction, TransactionInput } from '../types';
import { CheckCircleIcon, XCircleIcon, CurrencyDollarIcon, ShoppingCartIcon, ClockIcon, GlobeAltIcon, CreditCardIcon, UserCircleIcon } from './Icons';

interface PredictionResultProps {
  prediction: Prediction;
  transaction: TransactionInput | null;
}

const DetailItem: React.FC<{ icon: React.ReactNode, label: string, value: string | number | boolean }> = ({ icon, label, value }) => (
  <div className="flex items-start py-2">
    <span className="text-blue-400 mr-3 mt-1 flex-shrink-0">{icon}</span>
    <div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-base font-medium text-slate-100">
        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
      </p>
    </div>
  </div>
);


export const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, transaction }) => {
  const isFraudulent = prediction.isFraudulent;
  const cardBgColor = isFraudulent ? 'bg-red-500/10 border-red-500/30' : 'bg-green-500/10 border-green-500/30';
  const textColor = isFraudulent ? 'text-red-400' : 'text-green-400';
  const Icon = isFraudulent ? XCircleIcon : CheckCircleIcon;

  return (
    <div className={`mt-10 mb-8 p-6 rounded-xl shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.01] ${cardBgColor}`}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <Icon className={`h-16 w-16 sm:h-20 sm:w-20 mr-0 sm:mr-6 mb-4 sm:mb-0 flex-shrink-0 ${textColor}`} />
        <div className="text-center sm:text-left">
          <h2 className={`text-2xl sm:text-3xl font-bold ${textColor}`}>
            Transaction Assessed: {isFraudulent ? 'Potentially Fraudulent' : 'Likely Legitimate'}
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">{prediction.reason}</p>
          {prediction.confidenceScore && (
            <p className="mt-1 text-xs text-slate-400">
              Confidence: {(prediction.confidenceScore * 100).toFixed(0)}%
            </p>
          )}
        </div>
      </div>

      {transaction && (
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-200 mb-3">Transaction Summary:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            <DetailItem icon={<CurrencyDollarIcon className="h-5 w-5"/>} label="Amount" value={`$${transaction.amount.toFixed(2)}`} />
            <DetailItem icon={<ShoppingCartIcon className="h-5 w-5"/>} label="Merchant Category" value={transaction.merchantCategory} />
            <DetailItem icon={<ClockIcon className="h-5 w-5"/>} label="Hour of Day" value={`${transaction.hourOfDay}:00`} />
            <DetailItem icon={<GlobeAltIcon className="h-5 w-5"/>} label="International" value={transaction.isInternational} />
            <DetailItem icon={<CreditCardIcon className="h-5 w-5"/>} label="Card Present" value={transaction.cardPresent} />
            <DetailItem icon={<UserCircleIcon className="h-5 w-5"/>} label="User History Score" value={transaction.userHistoryScore} />
          </div>
        </div>
      )}
    </div>
  );
};
    