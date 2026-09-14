import React, { useState } from 'react';
import { HealthSOSProvider, useHealthSOS } from './context/HealthSOSContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CitizenPortal } from './components/citizen/CitizenPortal';
import { HospitalPortal } from './components/hospital/HospitalPortal';
import { PolicePortal } from './components/police/PolicePortal';
import { GovernmentPortal } from './components/government/GovernmentPortal';
import { QuickRoleSwitcher } from './components/shared/QuickRoleSwitcher';
import { UserRole } from './types';
import { Heart, PhoneCall, ShieldCheck, Ambulance } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRole, setCurrentRole } = useHealthSOS();
  const [currentView, setCurrentView] = useState<'landing' | 'portal'>('landing');

  const handleEnterRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50/80 text-stone-900 flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Navbar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Body */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage onEnterRole={handleEnterRole} />
        ) : (
          <div className="animate-in fade-in duration-200">
            {currentRole === 'citizen' && <CitizenPortal />}
            {currentRole === 'hospital' && <HospitalPortal />}
            {currentRole === 'police' && <PolicePortal />}
            {currentRole === 'government' && <GovernmentPortal />}
          </div>
        )}
      </main>

      {/* Quick Role Switcher (floating) */}
      <QuickRoleSwitcher currentView={currentView} setCurrentView={setCurrentView} />

      {/* Human-Centered Clean Footer */}
      <footer className="bg-white border-t border-stone-200 mt-12 py-8 text-xs text-stone-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-bold text-stone-900">HealthSOS Unified Emergency Network</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-700">Open Public Health Prototype</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-700">
            <span className="flex items-center gap-1 font-semibold text-rose-700">
              <PhoneCall className="w-3.5 h-3.5" /> Direct SOS: 911 / 112
            </span>
            <span>•</span>
            <span>Local Storage Active</span>
            <span>•</span>
            <span>All 4 Roles Interconnected</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <HealthSOSProvider>
      <MainContent />
    </HealthSOSProvider>
  );
}
