
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import type { ROCDataPoint, ConfusionMatrixData } from '../types';
import { ChartBarIcon, CpuChipIcon, ScaleIcon, TableCellsIcon, CodeBracketIcon } from './Icons'; // Assuming you have these icons

const rocData: ROCDataPoint[] = [
  { fpr: 0.0, tpr: 0.0 },
  { fpr: 0.05, tpr: 0.2 },
  { fpr: 0.1, tpr: 0.55 },
  { fpr: 0.2, tpr: 0.75 },
  { fpr: 0.3, tpr: 0.85 },
  { fpr: 0.4, tpr: 0.92 },
  { fpr: 0.5, tpr: 0.95 },
  { fpr: 0.6, tpr: 0.97 },
  { fpr: 0.8, tpr: 0.99 },
  { fpr: 1.0, tpr: 1.0 },
];
const randomChanceData: ROCDataPoint[] = [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 1.0, tpr: 1.0 },
];

const confusionMatrixData: ConfusionMatrixData = {
  TP: 850, // Correctly identified fraud
  FP: 50,  // Legitimate flagged as fraud
  FN: 150, // Fraud missed
  TN: 8950 // Correctly identified legitimate
};

const MetricCard: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-slate-800 shadow-xl rounded-lg p-6">
    <div className="flex items-center text-xl font-semibold text-slate-200 mb-4">
      {icon}
      <h3 className="ml-3">{title}</h3>
    </div>
    <div className="text-slate-300">{children}</div>
  </div>
);

interface MLStepCardProps {
  title: string;
  description: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

const MLStepCard: React.FC<MLStepCardProps> = ({ title, description, icon }) => (
    <div className="bg-slate-800/70 p-5 rounded-lg shadow-lg border border-slate-700">
        <div className="flex items-center mb-2">
            {React.cloneElement(icon, { className: "h-7 w-7 text-blue-400 mr-3" })}
            <h4 className="text-lg font-semibold text-slate-100">{title}</h4>
        </div>
        <p className="text-sm text-slate-400">{description}</p>
    </div>
);


export const DashboardMetrics: React.FC = () => {
  return (
    <div className="space-y-10">
      <MetricCard title="Conceptual ML Pipeline for Fraud Detection" icon={<CpuChipIcon className="h-6 w-6 text-emerald-400" />}>
        <p className="mb-6 text-sm text-slate-400">
          Actual fraud detection systems involve a complex Machine Learning pipeline. Below is a simplified overview of common steps:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MLStepCard 
            title="1. Data Preprocessing" 
            icon={<CodeBracketIcon />}
            description="Cleaning data, handling missing values, encoding categorical features (e.g., merchant type), and feature scaling (e.g., transaction amount)."
          />
          <MLStepCard 
            title="2. Handling Imbalanced Data" 
            icon={<ScaleIcon />}
            description="Fraudulent transactions are rare. Techniques like SMOTE (Synthetic Minority Over-sampling Technique) or undersampling are used to balance the dataset for better model training."
          />
          <MLStepCard 
            title="3. Model Training" 
            icon={<ChartBarIcon />}
            description="Algorithms like Isolation Forest, Local Outlier Factor (for anomaly detection), or classifiers like XGBoost are trained on the prepared data to distinguish fraudulent patterns."
          />
        </div>
         <p className="mt-6 text-xs text-slate-500">
          This application uses the Gemini API for a simplified assessment and does not implement this full ML pipeline.
        </p>
      </MetricCard>

      <MetricCard title="ROC Curve (Receiver Operating Characteristic)" icon={<ChartBarIcon className="h-6 w-6 text-purple-400" />}>
        <p className="mb-4 text-sm text-slate-400">
          The ROC curve illustrates the diagnostic ability of a binary classifier system as its discrimination threshold is varied. It plots True Positive Rate (TPR) against False Positive Rate (FPR). A model closer to the top-left corner is better.
        </p>
        <div className="h-80 w-full md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="fpr" type="number" domain={[0, 1]} stroke="#94a3b8" name="False Positive Rate">
                 <Label value="False Positive Rate (FPR)" offset={-20} position="insideBottom" fill="#94a3b8" />
              </XAxis>
              <YAxis dataKey="tpr" type="number" domain={[0, 1]} stroke="#94a3b8" name="True Positive Rate">
                <Label value="True Positive Rate (TPR)" angle={-90} offset={0} position="insideLeft" fill="#94a3b8" style={{ textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                itemStyle={{ color: '#cbd5e1' }}
              />
              <Legend wrapperStyle={{ color: '#e2e8f0', paddingTop: '10px' }} />
              <Line type="monotone" data={rocData} dataKey="tpr" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} name="Model Performance" />
              <Line type="linear" data={randomChanceData} dataKey="tpr" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Random Chance" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </MetricCard>

      <MetricCard title="Confusion Matrix" icon={<TableCellsIcon className="h-6 w-6 text-teal-400" />}>
        <p className="mb-4 text-sm text-slate-400">
          A confusion matrix is a table layout that allows visualization of the performance of a classification algorithm. Each row represents instances in an actual class while each column represents instances in a predicted class.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full sm:w-auto mx-auto border-collapse text-center">
            <thead>
              <tr>
                <td className="p-1 sm:p-2 border border-slate-600"></td>
                <th colSpan={2} className="p-1 sm:p-2 border border-slate-600 text-slate-200">Predicted Class</th>
              </tr>
              <tr>
                <td className="p-1 sm:p-2 border border-slate-600"></td>
                <th className="p-1 sm:p-2 border border-slate-600 font-medium text-slate-300">Fraud (Positive)</th>
                <th className="p-1 sm:p-2 border border-slate-600 font-medium text-slate-300">Legitimate (Negative)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan={2} className="p-1 sm:p-2 border border-slate-600 text-slate-200"><div className="-rotate-90 origin-center w-max mx-auto">Actual Class</div></th>
                <th className="p-1 sm:p-2 border border-slate-600 font-medium text-slate-300">Fraud (Positive)</th>
                <td className="p-3 sm:p-4 border border-slate-600 bg-green-500/20 text-green-300 font-bold text-lg">{confusionMatrixData.TP} <span className="block text-xs font-normal">(True Positive)</span></td>
                <td className="p-3 sm:p-4 border border-slate-600 bg-red-500/20 text-red-300 font-bold text-lg">{confusionMatrixData.FN} <span className="block text-xs font-normal">(False Negative)</span></td>
              </tr>
              <tr>
                <th className="p-1 sm:p-2 border border-slate-600 font-medium text-slate-300">Legitimate (Negative)</th>
                <td className="p-3 sm:p-4 border border-slate-600 bg-orange-500/20 text-orange-300 font-bold text-lg">{confusionMatrixData.FP} <span className="block text-xs font-normal">(False Positive)</span></td>
                <td className="p-3 sm:p-4 border border-slate-600 bg-green-500/20 text-green-300 font-bold text-lg">{confusionMatrixData.TN} <span className="block text-xs font-normal">(True Negative)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
         <p className="mt-4 text-xs text-slate-500 text-center">
          These are example values to illustrate a typical confusion matrix.
        </p>
      </MetricCard>
    </div>
  );
};
