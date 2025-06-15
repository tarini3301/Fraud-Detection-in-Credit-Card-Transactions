
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import type { ROCDataPoint, ConfusionMatrixData } from '../types';

const rocData: ROCDataPoint[] = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.2 },
  { fpr: 0.1, tpr: 0.45 },
  { fpr: 0.2, tpr: 0.70 },
  { fpr: 0.3, tpr: 0.85 },
  { fpr: 0.4, tpr: 0.92 },
  { fpr: 0.5, tpr: 0.96 },
  { fpr: 0.7, tpr: 0.99 },
  { fpr: 1, tpr: 1 },
];

// Mock AUC (Area Under Curve) - for a good model, this is close to 1
const mockAUC = 0.88; 

// Static confusion matrix data for illustration
const confusionMatrix: ConfusionMatrixData = {
  tn: 18502, // True Negatives
  fp: 105,   // False Positives
  fn: 38,    // False Negatives
  tp: 355,   // True Positives
};

export const MockAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
        Illustrative Model Performance
      </h2>
      <p className="text-xs text-center text-gray-500 -mt-4 mb-6">The following charts represent typical performance metrics for a fraud detection model and are for demonstration purposes only.</p>

      {/* ROC Curve Section */}
      <div className="bg-gray-700 bg-opacity-50 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-200 mb-1">ROC Curve (Receiver Operating Characteristic)</h3>
        <p className="text-sm text-gray-400 mb-4">Illustrates diagnostic ability of the model. (Mock AUC: {mockAUC})</p>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={rocData}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="fpr" type="number" stroke="#A0AEC0" name="False Positive Rate">
                 <Label value="False Positive Rate" offset={-20} position="insideBottom" fill="#A0AEC0" />
              </XAxis>
              <YAxis type="number" stroke="#A0AEC0" name="True Positive Rate">
                <Label value="True Positive Rate" angle={-90} offset={0} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#A0AEC0" />
              </YAxis>
              <Tooltip
                contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#E2E8F0', fontWeight: 'bold' }}
                itemStyle={{ color: '#CBD5E0' }}
              />
              <Legend wrapperStyle={{ color: '#E2E8F0', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="tpr" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, fill: '#8B5CF6' }} activeDot={{ r: 6 }} name="TPR vs FPR" />
              <Line type="linear" dataKey="x" stroke="#718096" strokeDasharray="5 5" dot={false} name="Random Guess" points={[{fpr:0, tpr:0}, {fpr:1, tpr:1}]} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confusion Matrix Section */}
      <div className="bg-gray-700 bg-opacity-50 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Confusion Matrix (Illustrative)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-gray-600 bg-opacity-50">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-tl-lg"></th>
                <th scope="col" className="px-6 py-3 text-center text-purple-300" colSpan={2}>Predicted Class</th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-3">Actual Class</th>
                <th scope="col" className="px-6 py-3 text-center">Not Fraudulent</th>
                <th scope="col" className="px-6 py-3 text-center rounded-tr-lg">Fraudulent</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-pink-300 whitespace-nowrap">Not Fraudulent</th>
                <td className="px-6 py-4 text-center bg-green-700 bg-opacity-30">{confusionMatrix.tn.toLocaleString()} <span className="text-xs text-green-400">(TN)</span></td>
                <td className="px-6 py-4 text-center bg-yellow-700 bg-opacity-30">{confusionMatrix.fp.toLocaleString()} <span className="text-xs text-yellow-400">(FP)</span></td>
              </tr>
              <tr className="border-b border-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-pink-300 whitespace-nowrap">Fraudulent</th>
                <td className="px-6 py-4 text-center bg-yellow-700 bg-opacity-30">{confusionMatrix.fn.toLocaleString()} <span className="text-xs text-yellow-400">(FN)</span></td>
                <td className="px-6 py-4 text-center bg-red-700 bg-opacity-30">{confusionMatrix.tp.toLocaleString()} <span className="text-xs text-red-400">(TP)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs text-gray-400 space-y-1">
            <p><span className="font-semibold text-green-400">TN (True Negative):</span> Correctly identified as not fraudulent.</p>
            <p><span className="font-semibold text-yellow-400">FP (False Positive):</span> Incorrectly identified as fraudulent.</p>
            <p><span className="font-semibold text-yellow-400">FN (False Negative):</span> Incorrectly identified as not fraudulent (missed fraud).</p>
            <p><span className="font-semibold text-red-400">TP (True Positive):</span> Correctly identified as fraudulent.</p>
        </div>
      </div>
    </div>
  );
};
    