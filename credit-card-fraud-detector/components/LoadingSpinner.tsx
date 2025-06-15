
import React from 'react';
import { ArrowPathIcon } from './Icons';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 p-6 bg-slate-800/50 rounded-lg">
      <ArrowPathIcon className="h-12 w-12 text-blue-500 animate-spin" />
      <p className="mt-4 text-lg font-medium text-slate-300">Assessing Transaction...</p>
      <p className="text-sm text-slate-400">Please wait while the AI analyzes the data.</p>
    </div>
  );
};
    