
import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TransactionForm } from './components/TransactionForm';
import { PredictionResult } from './components/PredictionResult';
import { DashboardMetrics } from './components/DashboardMetrics';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { detectFraud } from './services/geminiService';
import type { TransactionInput, Prediction } from './types';
import { InfoIcon, LightBulbIcon } from './components/Icons';

const App: React.FC = () => {
  const [transaction, setTransaction] = useState<TransactionInput | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.API_KEY;

  const handleSubmitTransaction = useCallback(async (data: TransactionInput) => {
    if (!apiKey) {
      setError("API Key is not configured. Please set the API_KEY environment variable.");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setTransaction(data);

    try {
      const result = await detectFraud(data, apiKey);
      setPrediction(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to get prediction: ${err.message}`);
      } else {
        setError("An unknown error occurred.");
      }
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  const handleClear = () => {
    setTransaction(null);
    setPrediction(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {!apiKey && (
             <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-lg flex items-start">
              <LightBulbIcon className="h-6 w-6 mr-3 flex-shrink-0 text-yellow-400" />
              <div>
                <h3 className="font-semibold">API Key Not Found</h3>
                <p className="text-sm">The Gemini API key is not configured. Please ensure the <code>API_KEY</code> environment variable is set for the application to function correctly.</p>
              </div>
            </div>
          )}

          <div className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-10 mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Credit Card Fraud Detector
            </h1>
            <p className="text-center text-slate-400 mb-8 text-sm sm:text-base">
              Enter transaction details below to assess its likelihood of being fraudulent using AI.
            </p>
            <TransactionForm onSubmit={handleSubmitTransaction} isLoading={isLoading} onClear={handleClear} />
          </div>

          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {prediction && <PredictionResult prediction={prediction} transaction={transaction} />}
          
          <div className="mt-16">
             <div className="flex items-center text-2xl font-semibold text-slate-300 mb-6">
                <InfoIcon className="h-7 w-7 mr-3 text-blue-400" />
                <h2>Understanding Fraud Detection</h2>
            </div>
            <DashboardMetrics />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
    