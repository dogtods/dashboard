import React from 'react';
import { useSignals } from '../hooks/useApi';
import { AlertTriangle, TrendingUp, Zap, ShieldAlert } from 'lucide-react';

const ExecutiveDashboard = () => {
  const { data, loading, error } = useSignals();

  if (loading) return <div className="flex h-full items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div></div>;
  if (error) return <div className="text-red-500">Error loading data: {error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white tracking-wide">Executive Intelligence</h2>
        <div className="text-sm text-gray-400">Last updated: Just now</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Total Monitored Articles" value={data.summary.totalArticles} icon={<FileTextIcon />} color="text-blue-400" />
        <KpiCard title="Emerging Signals" value={data.summary.emergingSignals} icon={<TrendingUp />} color="text-green-400" />
        <KpiCard title="Critical Alerts" value={data.summary.criticalAlerts} icon={<AlertTriangle />} color="text-red-400" />
      </div>

      {/* Top Signals */}
      <div className="glass-card flex-1 p-6 flex flex-col">
        <h3 className="text-lg font-semibold mb-4 text-gray-200 flex items-center">
          <Zap className="mr-2 text-yellow-400" size={18} /> 
          Top Emerging Regulatory Signals
        </h3>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase text-gray-500">
                <th className="py-3 font-semibold">Signal</th>
                <th className="py-3 font-semibold">Category</th>
                <th className="py-3 font-semibold">Impact</th>
                <th className="py-3 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.topSignals.map(sig => (
                <tr key={sig.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-200">{sig.title}</td>
                  <td className="py-4 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                      {sig.category}
                    </span>
                  </td>
                  <td className="py-4 text-sm">
                    <span className={`flex items-center ${sig.impact === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {sig.impact === 'High' && <ShieldAlert size={14} className="mr-1" />}
                      {sig.impact}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-cyan-400 font-mono">{sig.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => (
  <div className="glass-card p-6 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
    <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
      {icon}
    </div>
  </div>
);

const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
);

export default ExecutiveDashboard;
