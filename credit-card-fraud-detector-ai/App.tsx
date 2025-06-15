
import React, { useState, useCallback } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { MockAnalytics } from './components/MockAnalytics';
import { analyzeTransaction } from './services/geminiService';
import type { TransactionInput, FraudReport } from './types';
import { ApiKeyInfo } from './components/ApiKeyInfo';

const App: React.FC = () => {
  const [transactionInput, setTransactionInput] = useState<TransactionInput | null>(null);
  const [fraudReport, setFraudReport] = useState<FraudReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isApiKeySet = process.env.API_KEY && process.env.API_KEY !== "";

  const handleTransactionSubmit = useCallback(async (data: TransactionInput) => {
    if (!isApiKeySet) {
      setError("API Key is not configured. Please set the API_KEY environment variable.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setFraudReport(null); 
    setTransactionInput(data);

    try {
      const report = await analyzeTransaction(data);
      setFraudReport(report);
    } catch (err) {
      console.error("Error analyzing transaction:", err);
      if (err instanceof Error) {
        setError(`Failed to get fraud assessment: ${err.message}. Ensure your API key is valid and has access to the Gemini API.`);
      } else {
        setError("An unknown error occurred while analyzing the transaction.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [isApiKeySet]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Credit Card Fraud Detector AI
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Simulate fraud detection using AI-powered analysis.
          </p>
        </header>

        {!isApiKeySet && <ApiKeyInfo />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-2xl rounded-xl p-6">
            <TransactionForm onSubmit={handleTransactionSubmit} isLoading={isLoading} isApiKeySet={isApiKeySet} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            {(isLoading || fraudReport || error || transactionInput) && (
              <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-2xl rounded-xl p-6 min-h-[200px] flex flex-col justify-center">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                    <p className="text-lg text-purple-400">Analyzing transaction...</p>
                  </div>
                )}
                {error && (
                  <div className="text-center text-red-400 bg-red-900 bg-opacity-30 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Error</h3>
                    <p>{error}</p>
                  </div>
                )}
                {fraudReport && transactionInput && !isLoading && !error && (
                  <ResultsDisplay transaction={transactionInput} report={fraudReport} />
                )}
                 {!isLoading && !fraudReport && !error && transactionInput && (
                    <div className="text-center text-gray-400">
                        <p>Submit transaction details to see the fraud assessment.</p>
                    </div>
                )}
              </div>
            )}
            
            <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-2xl rounded-xl p-6">
              <MockAnalytics />
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Fraud Detection Demo. For illustrative purposes only.</p>
          <p>This app uses a generative AI model to simulate fraud assessment and does not reflect real-world fraud detection capabilities of any specific system.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
    