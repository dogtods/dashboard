import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Network, Lightbulb, FileText, Bell } from 'lucide-react';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-background text-gray-200 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col backdrop-blur-lg">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            EnvIntel Pro
          </h1>
          <p className="text-xs text-gray-400 mt-1">Strategic Regulation Signals</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Executive Dashboard" />
          <NavItem to="/timeline" icon={<Activity size={20} />} label="Signal Timeline" />
          <NavItem to="/network" icon={<Network size={20} />} label="Relation Network" />
          
          <div className="pt-6 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actionable</div>
          
          <NavItem to="/opportunities" icon={<Lightbulb size={20} />} label="Opportunities" />
          <NavItem to="/proposals" icon={<FileText size={20} />} label="Proposal Generator" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-md flex items-center justify-between px-6 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-400">Environment: <span className="text-green-400 font-mono">Production</span></div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-surface transition-colors relative">
              <Bell size={20} className="text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 border border-white/10 flex items-center justify-center font-bold text-sm">
              EX
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-6 relative">
          {/* Subtle background glow effect */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
      }`
    }
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </NavLink>
);

export default MainLayout;
