
import React from 'react';
import { ExclamationTriangleIcon } from './Icons';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="my-8 p-4 bg-red-700/30 border border-red-600 text-red-300 rounded-lg flex items-start shadow-lg">
      <ExclamationTriangleIcon className="h-6 w-6 mr-3 flex-shrink-0 text-red-400" />
      <div>
        <h3 className="font-semibold">An Error Occurred</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
    