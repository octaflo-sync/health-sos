import React from 'react';
import { 
  Heart, 
  Shield, 
  Building2, 
  Landmark, 
  User, 
  Radio, 
  RotateCcw, 
  Home,
  CheckCircle2
} from 'lucide-react';
import { useHealthSOS } from '../context/HealthSOSContext';
import { UserRole } from '../types';

interface NavbarProps {
  currentView: 'landing' | 'portal';
  setCurrentView: (view: 'landing' | 'portal') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { 
    currentRole, 
    setCurrentRole, 
    currentUser, 
    incidents, 
    isMeshNetworkActive,
    toggleMeshNetwork,
    resetAllData 
  } = useHealthSOS();

  const activeIncidentsCount = incidents.filter(i => i.status !== 'discharged').length;

  const roleConfigs: { role: UserRole; label: string; icon: React.ElementType; sub: string }[] = [
    { role: 'citizen', label: 'Citizen App', icon: User, sub: 'Bystander & SOS' },
    { role: 'hospital', label: 'Hospital POS', icon: Building2, sub: 'Emergency Terminal' },
    { role: 'police', label: 'Police Portal', icon: Shield, sub: 'FIR Approvals' },
    { role: 'government', label: 'Govt Authority', icon: Landmark, sub: 'Price Regulation' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top emergency status strip */}
      <div className="bg-stone-900 text-stone-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Ecosystem Live & Interconnected
          </span>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="hidden sm:inline text-stone-300">
            Active Emergencies: <strong className="text-amber-400">{activeIncidentsCount}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Offline Mesh Network toggle */}
          <button
            onClick={toggleMeshNetwork}
            title="Toggle Bluetooth/Wi-Fi Offline Mesh Relay Simulation"
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
              isMeshNetworkActive 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                : 'bg-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Radio className={`w-3 h-3 ${isMeshNetworkActive ? 'animate-pulse text-amber-400' : ''}`} />
            <span>Mesh Relay: {isMeshNetworkActive ? 'ACTIVE (3 Hops)' : 'Cellular Standard'}</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all demo data back to initial working state?')) {
                resetAllData();
              }
            }}
            title="Reset LocalStorage data to initial state"
            className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm group-hover:bg-rose-700 transition-colors">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-stone-900">HealthSOS</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                  Ecosystem
                </span>
              </div>
              <p className="text-xs text-stone-700 font-medium hidden sm:block">
                Citizen • Hospital • Police • Regulatory Network
              </p>
            </div>
          </button>

          {currentView === 'portal' && (
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
          )}
        </div>

        {/* Role Switcher tabs */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200/80 overflow-x-auto max-w-full">
          {roleConfigs.map(({ role, label, icon: Icon }) => {
            const isActive = currentRole === role && currentView === 'portal';
            return (
              <button
                key={role}
                onClick={() => {
                  setCurrentRole(role);
                  setCurrentView('portal');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-stone-950 shadow-xs font-semibold'
                    : 'text-stone-800 hover:text-stone-950 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-600' : 'text-stone-500'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Current user badge */}
        <div className="hidden md:flex items-center gap-3 pl-2 border-l border-stone-200">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-9 h-9 rounded-full object-cover border border-stone-300"
          />
          <div className="text-xs leading-tight">
            <p className="font-semibold text-stone-900 flex items-center gap-1">
              {currentUser.name}
              <CheckCircle2 className="w-3 h-3 text-blue-500" />
            </p>
            <p className="text-stone-600 text-[11px] truncate max-w-[150px]">
              {currentUser.organization}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
