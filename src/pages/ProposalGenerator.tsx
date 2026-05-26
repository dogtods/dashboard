import React from 'react';
import { useProposals } from '../hooks/useApi';
import { FileText, Copy, Download } from 'lucide-react';

const ProposalGenerator = () => {
  const { data, loading, error } = useProposals();

  if (loading) return <div className="flex h-full items-center justify-center text-cyan-500">Generating Proposals...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Proposal Generator</h2>
        <p className="text-sm text-gray-400">Auto-generated email templates and proposals for key signals</p>
      </div>
      <div className="space-y-6 flex-1 overflow-auto">
        {(data || []).map((prop: any) => (
          <div key={prop.id} className="glass-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-100">{prop.title}</h3>
                <span className="text-xs text-gray-400">Target Industry: {prop.industry} | Urgency: <span className={prop.urgency === 'High' ? 'text-red-400' : 'text-yellow-400'}>{prop.urgency}</span></span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors" title="Copy to clipboard">
                  <Copy size={16} />
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors" title="Export PDF">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="bg-[#0f1523] border border-white/5 rounded-lg p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap">
              {prop.template}
              <br /><br />
              <span className="text-gray-500 italic">/* AI generated template based on recent signals. Please review before sending. */</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposalGenerator;
