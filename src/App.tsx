import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import TimelineView from './pages/TimelineView';
import NetworkView from './pages/NetworkView';
import OpportunitiesPanel from './pages/OpportunitiesPanel';
import ProposalGenerator from './pages/ProposalGenerator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ExecutiveDashboard />} />
        <Route path="timeline" element={<TimelineView />} />
        <Route path="network" element={<NetworkView />} />
        <Route path="opportunities" element={<OpportunitiesPanel />} />
        <Route path="proposals" element={<ProposalGenerator />} />
      </Route>
    </Routes>
  );
}

export default App;
