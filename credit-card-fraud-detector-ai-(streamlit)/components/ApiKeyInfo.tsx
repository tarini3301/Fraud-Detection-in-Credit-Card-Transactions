
import React from 'react';

export const ApiKeyInfo: React.FC = () => {
  return (
    <div className="my-6 p-4 bg-yellow-800 bg-opacity-30 border border-yellow-700 rounded-lg text-yellow-300 text-sm">
      <h3 className="font-semibold text-yellow-200 text-base mb-2">API Key Not Configured</h3>
      <p>
        The Gemini API key (<code>API_KEY</code>) is not found in your environment variables.
        This application requires a valid API key to communicate with the Gemini AI model for fraud detection.
      </p>
      <p className="mt-2">
        Please ensure the <code>API_KEY</code> environment variable is set before running the application.
        The fraud detection functionality will be disabled until the API key is configured.
      </p>
    </div>
  );
};
    