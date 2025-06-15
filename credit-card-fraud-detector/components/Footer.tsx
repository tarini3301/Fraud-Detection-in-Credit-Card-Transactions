
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-center py-6 border-t border-slate-700">
      <p className="text-sm text-slate-400">
        &copy; {new Date().getFullYear()} FraudGuard AI. Powered by Gemini.
      </p>
      <p className="text-xs text-slate-500 mt-1">
        This tool is for illustrative purposes and should not be used for actual financial decisions.
      </p>
    </footer>
  );
};
    