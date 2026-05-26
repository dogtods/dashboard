import React from 'react';
import { useBubble } from '../hooks/useApi';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

const TimelineView = () => {
  const { data, loading, error } = useBubble();

  if (loading) return <div className="flex h-full items-center justify-center text-cyan-500">Loading Timeline...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Transform data for recharts
  const formattedData = (data || []).map((d: any) => ({
    ...d,
    timestamp: new Date(d.date).getTime(),
    displayDate: new Date(d.date).toLocaleDateString(),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border p-3 rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-white font-bold">{data.cluster}</p>
          <p className="text-gray-300 text-sm">{data.displayDate}</p>
          <p className="text-cyan-400 text-sm mt-1">Articles: {data.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Signal Timeline</h2>
        <p className="text-sm text-gray-400">Volume of regulatory signals over time by category</p>
      </div>
      <div className="glass-card flex-1 p-6">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              type="number" 
              dataKey="timestamp" 
              name="Date" 
              domain={['dataMin', 'dataMax']}
              tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
              stroke="#6b7280" 
            />
            <YAxis 
              type="category" 
              dataKey="cluster" 
              name="Cluster" 
              stroke="#6b7280" 
              width={100}
            />
            <ZAxis type="number" dataKey="count" range={[50, 400]} name="Volume" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Scatter name="Signals" data={formattedData} fill="#06b6d4" opacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimelineView;
