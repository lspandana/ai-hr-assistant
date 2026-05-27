import React from 'react';
import { Source } from '../types';

interface SourceBadgeProps {
  sources: Source[];
}

const SourceBadge: React.FC<SourceBadgeProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  const categoryColors: Record<string, string> = {
    'Leave Policy': 'bg-green-50 text-green-700 border-green-200',
    'Onboarding': 'bg-purple-50 text-purple-700 border-purple-200',
    'HIPAA Compliance': 'bg-red-50 text-red-700 border-red-200',
    'Performance Management': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'IT Security': 'bg-gray-50 text-gray-700 border-gray-200',
    'Compensation and Benefits': 'bg-blue-50 text-blue-700 border-blue-200',
    'Incident Management': 'bg-orange-50 text-orange-700 border-orange-200',
    'Code of Conduct': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Remote Work': 'bg-teal-50 text-teal-700 border-teal-200',
  };

  return (
    <div className="mt-2">
      <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
        <span>📄</span>
        <span>Referenced Policies:</span>
      </p>
      <div className="flex flex-wrap gap-1">
        {sources.map((source) => (
          <span
            key={source.id}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
              categoryColors[source.category] ||
              'bg-blue-50 text-blue-700 border-blue-200'
            }`}
            title={`Category: ${source.category}`}
          >
            <span className="font-bold">{source.id}</span>
            <span>•</span>
            <span>{source.title}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SourceBadge;