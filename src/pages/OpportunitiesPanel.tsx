import React from 'react';
import { useOpportunities } from '../hooks/useApi';
import { Target, ArrowRight } from 'lucide-react';

const OpportunitiesPanel = () => {
  const { data, loading, error } = useOpportunities();

  if (loading) return <div className="flex h-full items-center justify-center text-cyan-500">Loading Opportunities...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Sales Opportunities</h2>
        <p className="text-sm text-gray-400">AI-detected business actions based on emerging regulations</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(data || []).map((opp: any) => (
          <div key={opp.id} className="glass-card-hover p-6 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/20 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex items-center space-x-2">
                <Target className="text-green-400" size={20} />
                <span className="text-sm font-mono text-gray-400">{opp.industry}</span>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                Score: {opp.score}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-100 mb-2 relative z-10">{opp.title}</h3>
            <p className="text-sm text-gray-400 mb-6 relative z-10">{opp.action}</p>
            
            <button className="flex items-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors relative z-10">
              View Strategy <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesPanel;
