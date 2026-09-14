import React, { useState } from 'react';
import { 
  Heart, 
  Building2, 
  Shield, 
  Landmark, 
  ArrowRight, 
  Ambulance, 
  Activity, 
  Volume2, 
  Radio, 
  Scale, 
  FileText, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight
} from 'lucide-react';
import { useHealthSOS } from '../context/HealthSOSContext';
import { UserRole, EmergencyCategory } from '../types';
import { FIRST_AID_GUIDES } from '../data/initialData';

interface LandingPageProps {
  onEnterRole: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterRole }) => {
  const { 
    incidents, 
    beds, 
    firs, 
    violations, 
    isMeshNetworkActive, 
    toggleMeshNetwork 
  } = useHealthSOS();

  const [selectedGuideCategory, setSelectedGuideCategory] = useState<EmergencyCategory>('cardiac');
  const activeGuide = FIRST_AID_GUIDES.find(g => g.id === selectedGuideCategory) || FIRST_AID_GUIDES[0];

  const activeIncidents = incidents.filter(i => i.status !== 'discharged');
  const occupiedBeds = beds.filter(b => b.isOccupied).length;
  const pendingFIRs = firs.filter(f => f.status === 'pending_review').length;

  return (
    <div className="space-y-12 pb-16">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-radial from-rose-50/60 via-stone-50 to-white pt-10 pb-12 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Unified Emergency Healthcare & Legal Ecosystem</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              One interconnected platform when every second counts.
            </h1>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
              HealthSOS seamlessly connects regular bystanders, emergency ambulances, hospital trauma rooms, 
              law enforcement, and health regulators. From instant AI-guided first aid to automated police FIRs 
              and government price-cap enforcement.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onEnterRole('citizen')}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <Ambulance className="w-4 h-4" />
                <span>Launch Citizen & SOS App</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onEnterRole('hospital')}
                className="px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-900 font-semibold text-sm border border-stone-300 shadow-xs hover:border-stone-400 transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>Open Hospital POS Terminal</span>
              </button>
            </div>
          </div>

          {/* Live ecosystem pulse metrics */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-stone-700 text-xs font-medium">
                <span>Active Emergencies</span>
                <Activity className="w-4 h-4 text-rose-600" />
              </div>
              <p className="mt-2 text-2xl font-bold text-stone-900">{activeIncidents.length}</p>
              <p className="text-[11px] text-stone-600 mt-0.5">Live en route & admitted</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-stone-700 text-xs font-medium">
                <span>Trauma Beds Reserved</span>
                <Building2 className="w-4 h-4 text-emerald-700" />
              </div>
              <p className="mt-2 text-2xl font-bold text-stone-900">{occupiedBeds} / {beds.length}</p>
              <p className="text-[11px] text-stone-600 mt-0.5">Instant booking en route</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-stone-700 text-xs font-medium">
                <span>Police e-FIRs Filed</span>
                <Shield className="w-4 h-4 text-blue-700" />
              </div>
              <p className="mt-2 text-2xl font-bold text-stone-900">{firs.length}</p>
              <p className="text-[11px] text-stone-600 mt-0.5">
                {pendingFIRs > 0 ? `${pendingFIRs} pending review` : 'All digitally signed'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-stone-700 text-xs font-medium">
                <span>Govt Price Compliance</span>
                <Landmark className="w-4 h-4 text-purple-700" />
              </div>
              <p className="mt-2 text-2xl font-bold text-stone-900">
                {violations.length === 0 ? '100%' : `${violations.length} Flags`}
              </p>
              <p className="text-[11px] text-stone-600 mt-0.5">Zero unfair bill markups</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Switcher Cards: The 4 Prebuilt Accounts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-stone-900">
            Explore the 4 Interconnected Portals
          </h2>
          <p className="text-stone-700 text-sm mt-1">
            Log in directly with our pre-configured personas. Every action in one portal immediately updates the others!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Citizen Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                  Account: Alex Rivera
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900">Citizen & Bystander App</h3>
                <p className="text-xs font-medium text-rose-600 mt-0.5">Smart SOS • AI First Aid • Mesh Relay</p>
                <p className="text-stone-700 text-xs mt-2 leading-relaxed">
                  Allows anyone to trigger an emergency alert with GPS, access spoken visual first aid protocols, 
                  pulse with a 110 BPM CPR metronome, and coordinate nearby Good Samaritan volunteers.
                </p>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>AI First Aid guides with hands-free voice read-aloud</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Digital Health Passport with allergy warnings & emergency QR</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Offline Bluetooth/Wi-Fi mesh routing when out of cell range</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onEnterRole('citizen')}
              className="mt-5 w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Enter as Citizen (Alex Rivera)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Hospital Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                  Account: Dr. Sarah Chen
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900">Hospital POS & Terminal</h3>
                <p className="text-xs font-medium text-emerald-600 mt-0.5">St. Jude Metro Trauma Center</p>
                <p className="text-stone-700 text-xs mt-2 leading-relaxed">
                  Automatically books Trauma Beds or OPD slots while ambulances are en route. Coordinates real-time blood 
                  bank stocks, flags expiring drugs for recall, and enforces a strict 4-step conditional patient discharge.
                </p>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant bed reservation during patient transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Strict discharge locked until Police FIR & Price audit cleared</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Smart expiry recalls & automated logistics restocking</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onEnterRole('hospital')}
              className="mt-5 w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Enter as Hospital MD (Dr. Sarah Chen)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Police Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                  Account: Insp. Marcus Vance
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900">Police Collaboration Portal</h3>
                <p className="text-xs font-medium text-blue-600 mt-0.5">Central Precinct Traffic Bureau</p>
                <p className="text-stone-700 text-xs mt-2 leading-relaxed">
                  Receives auto-generated electronic FIRs whenever vehicle accidents occur. Officers review scene telematics 
                  and sign off digitally from handheld devices, immediately unlocking hospital discharge files.
                </p>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automated electronic FIR population from accident scenes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Digital sign-off with officer badge verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero hospital travel needed for standard legal clearances</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onEnterRole('police')}
              className="mt-5 w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Enter as Police Inspector (Marcus Vance)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4. Government Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                  Account: Dir. Elena Rostova
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900">Government Price Regulation</h3>
                <p className="text-xs font-medium text-purple-600 mt-0.5">National Health Price Regulatory Board</p>
                <p className="text-stone-700 text-xs mt-2 leading-relaxed">
                  Sets and audits uniform price caps on ambulance fares, emergency surgery, trauma beds, and critical medicines. 
                  Enforces automated 3-tier penalties (Warning &rarr; $5,000 fine &rarr; Network suspension) on gouging.
                </p>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Real-time statutory price-cap audit on all hospital invoices</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automated 3-tier penalty engine with simulated enforcement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Public hospital compliance scorecard & safety ledger</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onEnterRole('government')}
              className="mt-5 w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Enter as Regulatory Director (Elena Rostova)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* System Data Flow Matrix (Direct from Product Architecture Doc) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Radio className="w-3.5 h-3.5" />
              <span>Section 5 Architectural Matrix</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              How Live Data Securely Traverses the Ecosystem
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">
              Every emergency trigger immediately ripples across all connected nodes in real time.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300 border-collapse">
              <thead>
                <tr className="border-b border-stone-800 text-stone-300 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Trigger Event</th>
                  <th className="py-3 px-3">Data Sender</th>
                  <th className="py-3 px-3">Data Receiver</th>
                  <th className="py-3 px-3">System Automated Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                <tr className="hover:bg-stone-800/40">
                  <td className="py-3 px-3 font-semibold text-white">Accident Reported</td>
                  <td className="py-3 px-3 text-rose-400">Bystander App</td>
                  <td className="py-3 px-3 text-amber-300">Ambulance & AI Engine</td>
                  <td className="py-3 px-3 text-stone-300">Dispatches closest vehicle; starts interactive first aid tutorial.</td>
                </tr>
                <tr className="hover:bg-stone-800/40">
                  <td className="py-3 px-3 font-semibold text-white">Patient En Route</td>
                  <td className="py-3 px-3 text-amber-400">Ambulance GPS Telemetry</td>
                  <td className="py-3 px-3 text-emerald-400">Hospital Terminal</td>
                  <td className="py-3 px-3 text-stone-300">Books trauma room or emergency OPD slot automatically.</td>
                </tr>
                <tr className="hover:bg-stone-800/40">
                  <td className="py-3 px-3 font-semibold text-white">Legal Accident Intake</td>
                  <td className="py-3 px-3 text-emerald-400">Hospital Terminal</td>
                  <td className="py-3 px-3 text-blue-400">Police POS Terminal</td>
                  <td className="py-3 px-3 text-stone-300">Fills and sends digital FIR with location and identity details.</td>
                </tr>
                <tr className="hover:bg-stone-800/40">
                  <td className="py-3 px-3 font-semibold text-white">Supply Milestone</td>
                  <td className="py-3 px-3 text-emerald-300">Inventory Sensor</td>
                  <td className="py-3 px-3 text-emerald-300">HealthSOS Supply Hub</td>
                  <td className="py-3 px-3 text-stone-300">Triggers fresh delivery order and flags expiring medicines for pickup.</td>
                </tr>
                <tr className="hover:bg-stone-800/40">
                  <td className="py-3 px-3 font-semibold text-white">Billing & Discharge</td>
                  <td className="py-3 px-3 text-emerald-400">Hospital Terminal</td>
                  <td className="py-3 px-3 text-purple-400">Government POS</td>
                  <td className="py-3 px-3 text-stone-300">Verifies price caps before generating invoice; locks discharge until forms clear.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI First Aid Interactive Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-rose-600 text-xs font-semibold uppercase tracking-wider">
                <Volume2 className="w-4 h-4" />
                <span>AI-Assisted Guided First Aid Samples</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mt-1">
                Immediate, Medically-Verified Emergency Protocols
              </h3>
              <p className="text-stone-700 text-xs mt-0.5">
                Clear step-by-step visual cards with hands-free voice read-aloud and CPR metronome.
              </p>
            </div>

            {/* Emergency Guide Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {FIRST_AID_GUIDES.map(guide => (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuideCategory(guide.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedGuideCategory === guide.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {guide.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Guide preview card */}
          <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-bold text-stone-900 text-base">{activeGuide.title}</h4>
                <p className="text-xs text-stone-700 mt-0.5">{activeGuide.subtitle}</p>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 shrink-0">
                {activeGuide.urgencyLevel}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeGuide.steps.slice(0, 4).map(step => (
                <div key={step.stepNumber} className="bg-white p-3.5 rounded-xl border border-stone-200/80 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <span className="font-semibold text-xs text-stone-900">{step.title}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed pl-7">{step.instruction}</p>
                  {step.warning && (
                    <div className="ml-7 flex items-start gap-1 text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded-md border border-amber-200">
                      <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                      <span>{step.warning}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-stone-700">
                <Volume2 className="w-4 h-4 text-rose-600" />
                <span>All guides support hands-free spoken audio playback inside the Citizen Portal.</span>
              </div>
              <button
                onClick={() => onEnterRole('citizen')}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <span>Try interactive first aid in Citizen App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Offline Mesh Network Callout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 rounded-2xl border border-amber-200/90 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Radio className="w-4 h-4 text-amber-700" />
              <span>Offline Local Mesh Routing Technology</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
              If an accident occurs in a road tunnel, remote canyon, or during a severe grid outage, 
              HealthSOS bounces the emergency packets peer-to-peer via Bluetooth & Wi-Fi until an online node is reached.
            </p>
          </div>

          <button
            onClick={toggleMeshNetwork}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              isMeshNetworkActive
                ? 'bg-amber-600 text-white shadow-sm hover:bg-amber-700'
                : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-100/50'
            }`}
          >
            {isMeshNetworkActive ? 'Disable Simulation' : 'Simulate Cell Outage / Mesh'}
          </button>
        </div>
      </section>
    </div>
  );
};
