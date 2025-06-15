
import React, { useState } from 'react';
import type { TransactionInput } from '../types';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { TagIcon } from './icons/TagIcon';
import { ClockIcon } from './icons/ClockIcon';

interface TransactionFormProps {
  onSubmit: (data: TransactionInput) => void;
  isLoading: boolean;
  isApiKeySet: boolean;
}

const merchantCategories = [
  "Groceries", "Electronics", "Clothing", "Restaurants", "Travel", 
  "Utilities", "Healthcare", "Entertainment", "Online Subscription", 
  "Financial Services", "Automotive", "Home Improvement", "Other"
];

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, isLoading, isApiKeySet }) => {
  const [amount, setAmount] = useState<string>('');
  const [merchantCategory, setMerchantCategory] = useState<string>(merchantCategories[0]);
  const [hourOfDay, setHourOfDay] = useState<string>(new Date().getHours().toString()); // Default to current hour
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parsedAmount = parseFloat(amount);
    const parsedHour = parseInt(hourOfDay, 10);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError("Please enter a valid positive amount.");
      return;
    }
    if (isNaN(parsedHour) || parsedHour < 0 || parsedHour > 23) {
      setFormError("Please enter a valid hour (0-23).");
      return;
    }
    if (!merchantCategory) {
      setFormError("Please select a merchant category.");
      return;
    }

    onSubmit({
      amount: parsedAmount,
      merchantCategory,
      hourOfDay: parsedHour,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-400 mb-6 text-center">Enter Transaction Details</h2>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
          Amount (USD)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSignIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 text-gray-100"
            placeholder="e.g., 125.50"
            min="0.01"
            step="0.01"
            required
            disabled={isLoading || !isApiKeySet}
          />
        </div>
      </div>

      <div>
        <label htmlFor="merchantCategory" className="block text-sm font-medium text-gray-300 mb-1">
          Merchant Category
        </label>
         <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <TagIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            id="merchantCategory"
            value={merchantCategory}
            onChange={(e) => setMerchantCategory(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-gray-100"
            required
            disabled={isLoading || !isApiKeySet}
          >
            {merchantCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="hourOfDay" className="block text-sm font-medium text-gray-300 mb-1">
          Hour of Day (0-23)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ClockIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="hourOfDay"
            value={hourOfDay}
            onChange={(e) => setHourOfDay(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 text-gray-100"
            placeholder="e.g., 14 for 2 PM"
            min="0"
            max="23"
            step="1"
            required
            disabled={isLoading || !isApiKeySet}
          />
        </div>
      </div>
      
      {formError && <p className="text-sm text-red-400">{formError}</p>}

      <button
        type="submit"
        disabled={isLoading || !isApiKeySet}
        className={`w-full font-semibold py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm text-white 
                    ${isLoading || !isApiKeySet ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition duration-150 ease-in-out'}
                    transform hover:scale-105 active:scale-95`}
      >
        {isLoading ? 'Analyzing...' : 'Detect Fraud'}
      </button>
      {!isApiKeySet && <p className="text-xs text-yellow-400 text-center mt-2">API Key not configured. Fraud detection is disabled.</p>}
    </form>
  );
};
    