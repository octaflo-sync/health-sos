import React, { useState } from 'react';
import { 
  Landmark, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  DollarSign, 
  FileWarning, 
  Building2, 
  ArrowRight,
  RefreshCw,
  Send,
  Zap,
  Info
} from 'lucide-react';
import { useHealthSOS } from '../../context/HealthSOSContext';
import { HospitalViolationRecord } from '../../types';

export const GovernmentPortal: React.FC = () => {
  const { 
    currentUser, 
    priceCaps, 
    violations, 
    simulateHospitalOvercharge, 
    setCurrentRole,
    hospitalComplianceFlag,
    hospitalLockoutStatus,
    hospitalTotalFines
  } = useHealthSOS();

  const [activeTab, setActiveTab] = useState<'price_caps' | 'audit_ledger' | 'penalties'>('audit_ledger');
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  const handleRunSimulation = () => {
    simulateHospitalOvercharge('inc_8921');
    setSimulationNotice('Audit algorithm detected overbilling! Automated statutory penalty triggered according to Section 3.1.');
    setTimeout(() => setSimulationNotice(null), 8000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Government Portal Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border-2 border-purple-200 shadow-xs">
            <Landmark className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-900">National Health Price Regulatory Board</h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                Government Compliance Portal
              </span>
            </div>
            <p className="text-xs text-stone-700 mt-0.5">
              Commissioner: {currentUser.name} • Statutory Tariff Enforcement Division
            </p>
          </div>
        </div>

        {/* Action button to test overcharge enforcement */}
        <button
          onClick={handleRunSimulation}
          className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 active:scale-[0.98] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>Simulate Hospital Overcharge Violation</span>
        </button>
      </div>

      {/* Simulation alert notice */}
      {simulationNotice && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start justify-between gap-3 text-amber-900 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{simulationNotice}</p>
              <p className="text-xs text-amber-800 mt-0.5">
                Check the Audit Ledger below and inspect the Hospital Terminal to see the active compliance flag.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentRole('hospital')}
            className="px-3 py-1 rounded-lg bg-amber-200 text-amber-900 text-xs font-semibold hover:bg-amber-300 shrink-0"
          >
            View in Hospital Terminal
          </button>
        </div>
      )}

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-700 text-xs font-semibold">
            <span>Hospital Network Compliance</span>
            <Scale className="w-4 h-4 text-purple-700" />
          </div>
          <p className="text-2xl font-bold text-stone-900">
            {hospitalLockoutStatus ? 'Suspended' : hospitalComplianceFlag ? 'Flagged (Warning)' : '100% Compliant'}
          </p>
          <p className="text-[11px] text-stone-700">
            {violations.length} total violation records logged
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-700 text-xs font-semibold">
            <span>Automated Fines Levied</span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-emerald-700">
            ${hospitalTotalFines.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-700">
            Automatic recovery via payment gateway
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-700 text-xs font-semibold">
            <span>Network Lockout Status</span>
            <ShieldAlert className="w-4 h-4 text-rose-700" />
          </div>
          <p className="text-2xl font-bold text-stone-900">
            {hospitalLockoutStatus ? '1 Hospital Locked' : '0 Lockouts'}
          </p>
          <p className="text-[11px] text-stone-700">
            Automated 3rd offence protocol
          </p>
        </div>
      </div>

      {/* 3-Tier Penalty Mechanism Card (Section 3.1 of PDF) */}
      <div className="bg-purple-950 text-white rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Section 3.1 Automated Penalty Enforcement Framework</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Automated 3-Tier Escalation for Unfair Hospital Billing
          </h3>
          <p className="text-stone-300 text-xs mt-0.5">
            Prices stay perfectly uniform across all hospitals on the network. The system triggers automated progressive penalties:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Tier 1 */}
          <div className="bg-purple-900/60 p-4 rounded-2xl border border-purple-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 uppercase text-[11px]">First Offence</span>
              <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center text-xs">
                1
              </span>
            </div>
            <h4 className="font-bold text-white text-sm">Automated Warning Letter</h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              Formal warning notice generated instantly and a public compliance flag is added to the hospital profile.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="bg-purple-900/60 p-4 rounded-2xl border border-purple-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 uppercase text-[11px]">Second Offence</span>
              <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center text-xs">
                2
              </span>
            </div>
            <h4 className="font-bold text-white text-sm">Heavy Financial Fine</h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              Heavy statutory fine ($5,000) automatically levied through the system payment gateway without human delay.
            </p>
          </div>

          {/* Tier 3 */}
          <div className="bg-purple-900/60 p-4 rounded-2xl border border-purple-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 uppercase text-[11px]">Third Offence</span>
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center text-xs">
                3
              </span>
            </div>
            <h4 className="font-bold text-white text-sm">Network Lockout & Suspension</h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              System locks hospital out of HealthSOS emergency network and sends formal recommendation to suspend medical license.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs for Price Caps and Audit Ledger */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('audit_ledger')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'audit_ledger'
              ? 'border-purple-600 text-purple-900 bg-purple-50/50'
              : 'border-transparent text-stone-700 hover:text-stone-900'
          }`}
        >
          <FileWarning className="w-4 h-4" />
          <span>Real-Time Audit & Violations Ledger ({violations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('price_caps')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'price_caps'
              ? 'border-purple-600 text-purple-900 bg-purple-50/50'
              : 'border-transparent text-stone-700 hover:text-stone-900'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Statutory Flat-Rate Price Caps Schedule ({priceCaps.length})</span>
        </button>
      </div>

      {/* TAB 1: AUDIT LEDGER */}
      {activeTab === 'audit_ledger' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">Hospital Invoicing Audit Log</h3>
              <p className="text-xs text-stone-700 mt-0.5">
                Real-time price cap inspection of all admissions, procedures, and emergency medicines.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-800 border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-700 uppercase tracking-wider text-[11px] bg-stone-50">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Hospital Facility</th>
                  <th className="py-3 px-3">Item & Rate Charged</th>
                  <th className="py-3 px-3">Statutory Cap</th>
                  <th className="py-3 px-3">Offence Level</th>
                  <th className="py-3 px-3">Automated Penalty Executed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {violations.map(viol => (
                  <tr key={viol.id} className="hover:bg-stone-50/80">
                    <td className="py-3 px-3 font-mono text-stone-700 whitespace-nowrap">{viol.date}</td>
                    <td className="py-3 px-3 font-semibold text-stone-900">{viol.hospitalName}</td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-rose-700">${viol.amountCharged}</p>
                      <p className="text-[11px] text-stone-700">{viol.itemBilled}</p>
                    </td>
                    <td className="py-3 px-3 font-bold text-stone-800">${viol.govtCapRate}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        viol.offenceLevel === 1 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                          : viol.offenceLevel === 2 
                          ? 'bg-orange-100 text-orange-800 border border-orange-300' 
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}>
                        Level {viol.offenceLevel} Offence
                      </span>
                    </td>
                    <td className="py-3 px-3 text-stone-800 text-[11px] max-w-xs">
                      {viol.penaltyAction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRICE CAPS SCHEDULE */}
      {activeTab === 'price_caps' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Government Gazetted Flat-Rate Price Caps
            </h3>
            <p className="text-xs text-stone-700 mt-0.5">
              Strict statutory price limits applied uniformly across private and public facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {priceCaps.map(cap => (
              <div key={cap.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    {cap.category}
                  </span>
                  <span className="text-lg font-extrabold text-stone-900">
                    ${cap.governmentFlatRate}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-stone-900">{cap.itemOrService}</h4>
                <p className="text-xs text-stone-700 leading-relaxed">{cap.description}</p>
                <p className="text-[10px] text-stone-700 font-mono pt-1 border-t border-stone-200">
                  {cap.statutoryReference}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
