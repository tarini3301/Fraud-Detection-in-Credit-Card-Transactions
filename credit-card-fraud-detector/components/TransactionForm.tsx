
import React, { useState } from 'react';
import type { TransactionInput } from '../types';
import { MERCHANT_CATEGORIES } from '../constants';
import { ArrowPathIcon, CheckCircleIcon, PaperAirplaneIcon } from './Icons';


interface TransactionFormProps {
  onSubmit: (data: TransactionInput) => void;
  isLoading: boolean;
  onClear: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, isLoading, onClear }) => {
  const [amount, setAmount] = useState<string>('');
  const [merchantCategory, setMerchantCategory] = useState<string>(MERCHANT_CATEGORIES[0]);
  const [hourOfDay, setHourOfDay] = useState<string>('14'); // Default to 2 PM
  const [isInternational, setIsInternational] = useState<boolean>(false);
  const [cardPresent, setCardPresent] = useState<boolean>(true);
  const [userHistoryScore, setUserHistoryScore] = useState<string>('75'); // Default score

  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    const parsedHour = parseInt(hourOfDay, 10);
    const parsedScore = parseInt(userHistoryScore, 10);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (isNaN(parsedHour) || parsedHour < 0 || parsedHour > 23) {
      alert("Please enter a valid hour (0-23).");
      return;
    }
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
      alert("Please enter a valid user history score (0-100).");
      return;
    }

    onSubmit({
      amount: parsedAmount,
      merchantCategory,
      hourOfDay: parsedHour,
      isInternational,
      cardPresent,
      userHistoryScore: parsedScore,
    });
    setSubmitted(true);
  };

  const handleClearForm = () => {
    setAmount('');
    setMerchantCategory(MERCHANT_CATEGORIES[0]);
    setHourOfDay('14');
    setIsInternational(false);
    setCardPresent(true);
    setUserHistoryScore('75');
    setSubmitted(false);
    onClear();
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-300 mb-1">
            Transaction Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-slate-100 placeholder-slate-400 transition duration-150"
            placeholder="e.g., 125.50"
            required
            min="0.01"
            step="0.01"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="merchantCategory" className="block text-sm font-medium text-slate-300 mb-1">
            Merchant Category
          </label>
          <select
            id="merchantCategory"
            value={merchantCategory}
            onChange={(e) => setMerchantCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-slate-100 transition duration-150"
            disabled={isLoading}
          >
            {MERCHANT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="hourOfDay" className="block text-sm font-medium text-slate-300 mb-1">
            Hour of Day (0-23)
          </label>
          <input
            type="number"
            id="hourOfDay"
            value={hourOfDay}
            onChange={(e) => setHourOfDay(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-slate-100 placeholder-slate-400 transition duration-150"
            placeholder="e.g., 14 for 2 PM"
            required
            min="0"
            max="23"
            step="1"
            disabled={isLoading}
          />
        </div>
         <div>
          <label htmlFor="userHistoryScore" className="block text-sm font-medium text-slate-300 mb-1">
            User History Score (0-100)
          </label>
          <input
            type="number"
            id="userHistoryScore"
            value={userHistoryScore}
            onChange={(e) => setUserHistoryScore(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-slate-100 placeholder-slate-400 transition duration-150"
            placeholder="Lower is riskier"
            required
            min="0"
            max="100"
            step="1"
            disabled={isLoading}
          />
           <p className="text-xs text-slate-500 mt-1">A mock score indicating past user behavior (0=very risky, 100=very safe).</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <input
            id="isInternational"
            type="checkbox"
            checked={isInternational}
            onChange={(e) => setIsInternational(e.target.checked)}
            className="h-5 w-5 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-offset-slate-800 transition duration-150"
            disabled={isLoading}
          />
          <label htmlFor="isInternational" className="text-sm font-medium text-slate-300">
            International Transaction?
          </label>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <input
            id="cardPresent"
            type="checkbox"
            checked={cardPresent}
            onChange={(e) => setCardPresent(e.target.checked)}
            className="h-5 w-5 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-offset-slate-800 transition duration-150"
            disabled={isLoading}
          />
          <label htmlFor="cardPresent" className="text-sm font-medium text-slate-300">
            Card Physically Present?
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 disabled:opacity-50 transition duration-150"
          disabled={isLoading || !amount}
        >
          {isLoading ? (
            <>
              <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
              Checking...
            </>
          ) : (
             <>
              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
              Check for Fraud
            </>
          )}
        </button>
        {(submitted || amount) && (
            <button
                type="button"
                onClick={handleClearForm}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-slate-600 text-base font-medium rounded-lg shadow-sm text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500 disabled:opacity-50 transition duration-150"
                disabled={isLoading}
            >
                Clear
            </button>
        )}
      </div>
    </form>
  );
};
    