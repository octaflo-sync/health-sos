import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Shield, 
  Landmark, 
  Layers, 
  ChevronUp, 
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useHealthSOS } from '../../context/HealthSOSContext';
import { UserRole } from '../../types';

interface QuickRoleSwitcherProps {
  currentView: 'landing' | 'portal';
  setCurrentView: (view: 'landing' | 'portal') => void;
}

export const QuickRoleSwitcher: React.FC<QuickRoleSwitcherProps> = ({ currentView, setCurrentView }) => {
  const { currentRole, setCurrentRole } = useHealthSOS();
  const [isExpanded, setIsExpanded] = useState(false);

  const roles: { id: UserRole; name: string; title: string; icon: React.ElementType; color: string }[] = [
    { id: 'citizen', name: 'Alex Rivera', title: 'Citizen & SOS', icon: User, color: 'text-rose-600' },
    { id: 'hospital', name: 'Dr. Sarah Chen', title: 'Hospital POS Terminal', icon: Building2, color: 'text-emerald-700' },
    { id: 'police', name: 'Insp. Marcus Vance', title: 'Police FIR Portal', icon: Shield, color: 'text-blue-700' },
    { id: 'government', name: 'Dir. Elena Rostova', title: 'Govt Price Board', icon: Landmark, color: 'text-purple-700' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="mb-2 bg-white rounded-2xl border border-stone-200 shadow-xl p-3.5 w-72 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Switch Prebuilt Persona</span>
            </span>
            <span className="text-[10px] text-stone-700">100% Interconnected</span>
          </div>

          <div className="space-y-1">
            {roles.map(r => {
              const Icon = r.icon;
              const isSelected = currentRole === r.id && currentView === 'portal';
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setCurrentRole(r.id);
                    setCurrentView('portal');
                    setIsExpanded(false);
                  }}
                  className={`w-full p-2 rounded-xl text-left text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-rose-400' : r.color}`} />
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <p className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-700'}`}>
                        {r.title}
                      </p>
                    </div>
                  </div>
                  {isSelected && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-700 leading-snug">
            💡 <strong>Demo Flow:</strong> SOS in Citizen &rarr; Auto-Bed in Hospital &rarr; Approve e-FIR in Police &rarr; Unlocked Hospital Discharge!
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className="px-3.5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border border-stone-700"
      >
        <Layers className="w-4 h-4 text-rose-400" />
        <span>Persona: <strong>{roles.find(r => r.id === currentRole)?.name.split(' ')[0]}</strong></span>
        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
