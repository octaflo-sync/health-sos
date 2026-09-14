import React, { useState } from 'react';
import { 
  Building2, 
  Bed, 
  Droplets, 
  Package, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Clock, 
  Ambulance, 
  ShieldAlert, 
  RefreshCw, 
  Calendar, 
  Search, 
  DollarSign,
  UserCheck,
  Stethoscope,
  Send
} from 'lucide-react';
import { useHealthSOS } from '../../context/HealthSOSContext';
import { HospitalBed } from '../../types';

export const HospitalPortal: React.FC = () => {
  const { 
    currentUser, 
    incidents, 
    beds, 
    reserveBed, 
    bloodStocks, 
    reserveBloodUnit, 
    medicines, 
    triggerRestock, 
    triggerExpiryRecall,
    updateDischargeClearance,
    completeDischarge,
    firs,
    setCurrentRole,
    hospitalComplianceFlag,
    hospitalLockoutStatus,
    hospitalTotalFines
  } = useHealthSOS();

  const [activeTab, setActiveTab] = useState<'triage_beds' | 'discharge' | 'blood_bank' | 'inventory'>('triage_beds');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(incidents[0]?.id || '');
  const [dischargeMessage, setDischargeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const activeIncidents = incidents.filter(i => i.status !== 'discharged');
  const targetIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];

  // Linked FIR for this incident (if any)
  const linkedFIR = targetIncident?.firId 
    ? firs.find(f => f.id === targetIncident.firId || f.incidentTicket === targetIncident.ticketNumber)
    : firs.find(f => f.incidentTicket === targetIncident?.ticketNumber);

  const handleDischargeAttempt = (incidentId: string) => {
    setDischargeMessage(null);
    const result = completeDischarge(incidentId);
    if (result.success) {
      setDischargeMessage({ 
        type: 'success', 
        text: 'Patient successfully checked out! Health charts filed, FIR logged, bed released to available inventory.' 
      });
    } else {
      setDischargeMessage({ 
        type: 'error', 
        text: result.reason || 'Discharge clearance failed.' 
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hospital Terminal Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border-2 border-emerald-200 shadow-xs">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-900">St. Jude Metro Trauma Center</h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                Hospital POS & Terminal
              </span>
            </div>
            <p className="text-xs text-stone-700 mt-0.5">
              Attending: {currentUser.name} • Badge: STJ-MD-4091 • Level 1 Trauma Facility
            </p>
          </div>
        </div>

        {/* Regulatory status banner */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          {hospitalLockoutStatus ? (
            <div className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Network Suspension Notice Active</span>
            </div>
          ) : hospitalComplianceFlag ? (
            <div className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Govt Compliance Flag (Warning / Audit Active)</span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Government Price Cap: 100% Compliant</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1">
        {[
          { id: 'triage_beds', label: 'Instant Bed & OPD Booking', icon: Bed, count: beds.filter(b => !b.isOccupied).length },
          { id: 'discharge', label: 'Strict Conditional Discharge', icon: Lock, count: activeIncidents.length },
          { id: 'blood_bank', label: 'Blood Bank Network', icon: Droplets, count: bloodStocks.reduce((a, b) => a + b.unitsAvailable, 0) },
          { id: 'inventory', label: 'Smart Expiry & Inventory', icon: Package, count: medicines.filter(m => m.isExpiringSoon || m.currentStock < m.safeLimit).length }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                  : 'border-transparent text-stone-700 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-stone-500'}`} />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-emerald-200 text-emerald-900' : 'bg-stone-200 text-stone-700'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INSTANT BED & OPD BOOKING */}
      {activeTab === 'triage_beds' && (
        <div className="space-y-6">
          {/* Live incoming ambulances telemetry */}
          <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ambulance className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm text-white">Live Inbound Ambulance Telemetry</h3>
              </div>
              <span className="text-xs bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-400/30">
                {activeIncidents.length} Inbound Cases
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeIncidents.map(inc => (
                <div key={inc.id} className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-amber-400 font-bold">{inc.ticketNumber}</span>
                      <h4 className="text-xs font-bold text-white mt-0.5">{inc.title}</h4>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-900/60 text-rose-300 border border-rose-700">
                      ETA {inc.assignedAmbulance?.currentEtaMinutes || 4} Min
                    </span>
                  </div>

                  <p className="text-xs text-stone-300">
                    Patient: <strong>{inc.reporterName}</strong> • {inc.location.address}
                  </p>

                  {inc.assignedAmbulance?.paramedicNote && (
                    <div className="text-[11px] bg-stone-900/80 p-2 rounded text-stone-300 border-l-2 border-amber-400">
                      <strong>Paramedic Field Note:</strong> {inc.assignedAmbulance.paramedicNote}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-emerald-400">
                      Bed Assigned: <strong>{inc.assignedBedId ? beds.find(b => b.id === inc.assignedBedId)?.label.split(' ')[0] : 'Auto-Assigning'}</strong>
                    </span>
                    <button
                      onClick={() => {
                        setSelectedIncidentId(inc.id);
                        setActiveTab('discharge');
                      }}
                      className="text-stone-300 hover:text-white underline"
                    >
                      View Patient File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bed Inventory Board */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-stone-900">Hospital Bed & Room Management</h3>
                <p className="text-xs text-stone-700 mt-0.5">
                  Automated instant reservation upon ambulance dispatch.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Available
                </span>
                <span className="flex items-center gap-1.5 text-rose-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Occupied / Reserved en route
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {beds.map(bed => (
                <div 
                  key={bed.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    bed.isOccupied
                      ? 'bg-rose-50/40 border-rose-200'
                      : 'bg-emerald-50/30 border-emerald-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-stone-700">
                        {bed.bedCode}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900 mt-0.5">{bed.label}</h4>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      bed.isOccupied 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {bed.isOccupied ? 'Occupied / In Transit' : 'Available'}
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-200/80 text-xs space-y-1">
                    {bed.isOccupied ? (
                      <>
                        <p className="text-stone-800 font-medium">
                          Patient: <span className="font-semibold text-stone-900">{bed.patientName}</span>
                        </p>
                        <p className="text-[11px] text-stone-700">
                          Admitted: {bed.admittedAt}
                        </p>
                        {bed.assignedIncidentTicket && (
                          <p className="text-[11px] font-mono text-rose-700 font-semibold">
                            Ticket: {bed.assignedIncidentTicket}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-emerald-700 font-medium">Ready for intake</span>
                        <button
                          onClick={() => {
                            if (activeIncidents[0]) {
                              reserveBed(bed.id, activeIncidents[0].ticketNumber, activeIncidents[0].reporterName);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold"
                        >
                          Manual Reserve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STRICT CONDITIONAL DISCHARGE */}
      {activeTab === 'discharge' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-stone-700 text-xs font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-rose-600" />
                <span>Strict 4-Step Conditional Discharge Lock</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 mt-1">
                Zero Billing Fraud & Unresolved Legal Guardrail
              </h3>
              <p className="text-xs text-stone-700 mt-0.5">
                Per Section 2.2 of the HealthSOS specification, patients can only be checked out once all required health charts, 
                physician sign-offs, police digital FIRs, and price-cap financial clearances are certified complete.
              </p>
            </div>

            {/* Select patient */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-stone-800">Select Patient File:</label>
              <select
                value={selectedIncidentId}
                onChange={(e) => setSelectedIncidentId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs text-stone-900 bg-stone-50"
              >
                {incidents.map(inc => (
                  <option key={inc.id} value={inc.id}>
                    {inc.ticketNumber} - {inc.reporterName} ({inc.status.replace(/_/g, ' ')})
                  </option>
                ))}
              </select>
            </div>

            {targetIncident && (
              <div className="space-y-6 pt-2">
                {/* Status Notice */}
                {dischargeMessage && (
                  <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                    dischargeMessage.type === 'success' 
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold' 
                      : 'bg-rose-50 text-rose-900 border border-rose-200 font-medium'
                  }`}>
                    {dischargeMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{dischargeMessage.text}</span>
                  </div>
                )}

                {/* Patient Summary Bar */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-stone-700">Patient Name:</span>
                    <p className="font-bold text-stone-900 text-sm">{targetIncident.reporterName}</p>
                  </div>
                  <div>
                    <span className="text-stone-700">Incident Category:</span>
                    <p className="font-bold text-stone-900 capitalize">{targetIncident.category.replace(/_/g, ' ')}</p>
                  </div>
                  <div>
                    <span className="text-stone-700">Insurance Pre-Approval:</span>
                    <p className="font-bold text-blue-700">
                      {targetIncident.insurancePreApproval?.provider} (${targetIncident.insurancePreApproval?.coverageAmount?.toLocaleString()})
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-700">Total Billed:</span>
                    <p className="font-bold text-stone-900">${targetIncident.billing?.totalAmount}</p>
                  </div>
                </div>

                {/* The 4 Strict Clearances Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Mandatory Discharge Clearances Checklist:
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* 1. Health Chart Clearance */}
                    <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                          <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                          <span>1. Health Chart & Vitals Stabilization</span>
                        </div>
                        <p className="text-[11px] text-stone-700">
                          Attending nurse vitals recorded and stable trajectory confirmed.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={targetIncident.dischargeStatus?.healthChartCleared || false}
                        onChange={(e) => updateDischargeClearance(targetIncident.id, 'healthChartCleared', e.target.checked)}
                        className="w-4 h-4 accent-emerald-600 rounded cursor-pointer mt-1"
                      />
                    </div>

                    {/* 2. Doctor Sign-off */}
                    <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>2. Attending Doctor Digital Signature</span>
                        </div>
                        <p className="text-[11px] text-stone-700">
                          Dr. Sarah Chen evaluation and discharge notes signed.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={targetIncident.dischargeStatus?.doctorSigned || false}
                        onChange={(e) => updateDischargeClearance(targetIncident.id, 'doctorSigned', e.target.checked)}
                        className="w-4 h-4 accent-emerald-600 rounded cursor-pointer mt-1"
                      />
                    </div>

                    {/* 3. Police FIR Legal Clearance (Interconnected with Police Portal!) */}
                    <div className={`p-3.5 rounded-xl border ${
                      targetIncident.dischargeStatus?.policeFIRCleared
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-rose-50/50 border-rose-300'
                    } flex items-start justify-between gap-3`}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                          <FileText className={`w-3.5 h-3.5 ${
                            targetIncident.dischargeStatus?.policeFIRCleared ? 'text-emerald-600' : 'text-rose-600'
                          }`} />
                          <span>3. Police Collaboration Portal FIR Clearance</span>
                        </div>
                        <p className="text-[11px] text-stone-700">
                          {targetIncident.dischargeStatus?.policeFIRCleared ? (
                            <span className="text-emerald-700 font-semibold">
                              Digitally Approved by Inspector Marcus Vance ({linkedFIR?.officerBadge || 'PD-BADGE-8842'})
                            </span>
                          ) : (
                            <span className="text-rose-700 font-semibold">
                              Awaiting Inspector Marcus Vance digital sign-off in Police Portal!
                            </span>
                          )}
                        </p>
                        {!targetIncident.dischargeStatus?.policeFIRCleared && (
                          <button
                            onClick={() => setCurrentRole('police')}
                            className="text-[11px] text-blue-700 hover:underline font-bold flex items-center gap-1 mt-1"
                          >
                            <span>&rarr; Jump to Police Portal to review & approve FIR</span>
                          </button>
                        )}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        targetIncident.dischargeStatus?.policeFIRCleared
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-rose-200 text-rose-900 animate-pulse'
                      }`}>
                        {targetIncident.dischargeStatus?.policeFIRCleared ? 'Approved' : 'BLOCKED'}
                      </span>
                    </div>

                    {/* 4. Financial Price-Cap Clearance */}
                    <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                          <DollarSign className="w-3.5 h-3.5 text-purple-600" />
                          <span>4. Government Price-Cap Clearance</span>
                        </div>
                        <p className="text-[11px] text-stone-700">
                          Invoiced rates verified against National Regulatory Board caps ($1,615 compliant).
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={targetIncident.dischargeStatus?.billingCleared || false}
                        onChange={(e) => updateDischargeClearance(targetIncident.id, 'billingCleared', e.target.checked)}
                        className="w-4 h-4 accent-emerald-600 rounded cursor-pointer mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Final Discharge Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
                  <div className="text-xs text-stone-700">
                    {targetIncident.status === 'discharged' ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Patient is fully discharged. Bed is freed.
                      </span>
                    ) : (
                      <span>All 4 clearances must be completed to unlock the checkout button.</span>
                    )}
                  </div>

                  {targetIncident.status !== 'discharged' && (
                    <button
                      onClick={() => handleDischargeAttempt(targetIncident.id)}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                        targetIncident.dischargeStatus?.healthChartCleared &&
                        targetIncident.dischargeStatus?.doctorSigned &&
                        targetIncident.dischargeStatus?.policeFIRCleared &&
                        targetIncident.dischargeStatus?.billingCleared
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer'
                          : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      {targetIncident.dischargeStatus?.policeFIRCleared && targetIncident.dischargeStatus?.healthChartCleared ? (
                        <Unlock className="w-4 h-4" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                      <span>Authorize Patient Discharge & Release Bed</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BLOOD BANK NETWORK */}
      {activeTab === 'blood_bank' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-rose-600 text-xs font-semibold uppercase tracking-wider">
                <Droplets className="w-3.5 h-3.5" />
                <span>Section 4.1 Secure Blood Bank Coordination</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mt-1">
                Real-Time Citywide Blood Stock & Immediate Reservation
              </h3>
              <p className="text-xs text-stone-700">
                Pulls stock across local blood banks to reserve matching units before patient arrival.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
              Trauma Patient Blood: O+ Needed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {bloodStocks.map(stock => (
              <div key={stock.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/40 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{stock.bankName}</h4>
                    <p className="text-[11px] text-stone-700">{stock.address} ({stock.distanceKm} km)</p>
                  </div>
                  <span className="text-sm font-extrabold px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
                    {stock.bloodGroup}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1 border-y border-stone-200">
                  <span className="text-stone-700">Units Available:</span>
                  <span className="font-bold text-stone-900 text-sm">{stock.unitsAvailable}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-stone-700">Reserved: {stock.reservedUnits} units</span>
                  <button
                    disabled={stock.unitsAvailable === 0}
                    onClick={() => reserveBloodUnit(stock.id, targetIncident.ticketNumber, 2)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors disabled:opacity-30"
                  >
                    Reserve 2 Units
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SMART INVENTORY & AUTOMATIC EXPIRY */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-stone-700 text-xs font-semibold uppercase tracking-wider">
                <Package className="w-3.5 h-3.5 text-emerald-600" />
                <span>Section 3.2 Smart Inventory & Expiry Management</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mt-1">
                Automated Fresh Restocking & Proactive Expiry Recalls
              </h3>
              <p className="text-xs text-stone-700">
                Connected to the central HealthSOS supply line to prevent expired drug administration and shortages.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-800 border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-700 uppercase tracking-wider text-[11px] bg-stone-50">
                  <th className="py-2.5 px-3">Medicine & Batch</th>
                  <th className="py-2.5 px-3">Stock / Safe Limit</th>
                  <th className="py-2.5 px-3">Govt Cap Price</th>
                  <th className="py-2.5 px-3">Expiry Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {medicines.map(med => (
                  <tr key={med.id} className="hover:bg-stone-50/80">
                    <td className="py-3 px-3">
                      <p className="font-bold text-stone-900">{med.name}</p>
                      <p className="text-[11px] text-stone-700 font-mono">Batch: {med.batchNumber}</p>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-semibold ${med.currentStock < med.safeLimit ? 'text-amber-700' : 'text-stone-900'}`}>
                        {med.currentStock} units
                      </span>
                      <span className="text-[11px] text-stone-700"> (Min: {med.safeLimit})</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-900">
                      ${med.govCapPrice} / unit
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className={med.isExpiringSoon ? 'text-rose-700 font-bold' : 'text-stone-700'}>
                        {med.expiryDate}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {med.isRecallDispatched ? (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[10px]">
                          Pickup Dispatched
                        </span>
                      ) : med.isExpiringSoon ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold text-[10px]">
                          Expiring Soon (&lt;30d)
                        </span>
                      ) : med.currentStock < med.safeLimit ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[10px]">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                          Optimal
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      {med.isExpiringSoon && !med.isRecallDispatched && (
                        <button
                          onClick={() => triggerExpiryRecall(med.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 font-semibold text-[11px] transition-colors"
                        >
                          Dispatch Expiry Recall
                        </button>
                      )}
                      {med.currentStock < med.safeLimit && (
                        <button
                          onClick={() => triggerRestock(med.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[11px] transition-colors"
                        >
                          Auto Restock
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
