
import React from 'react';
import { ShieldCheckIcon } from './Icons';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-semibold text-slate-100">FraudGuard AI</span>
          </div>
          {/* Add nav links here if needed */}
        </div>
      </div>
    </nav>
  );
};
    