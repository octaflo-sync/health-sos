import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Car, 
  User, 
  PenTool, 
  ArrowRight,
  Send,
  Building2,
  Lock,
  Unlock,
  Check
} from 'lucide-react';
import { useHealthSOS } from '../../context/HealthSOSContext';
import { FIRRecord } from '../../types';

export const PolicePortal: React.FC = () => {
  const { 
    currentUser, 
    firs, 
    approveFIR, 
    requestFIRAmendment, 
    setCurrentRole 
  } = useHealthSOS();

  const [selectedFirId, setSelectedFirId] = useState<string>(firs[0]?.id || '');
  const [officerBadge, setOfficerBadge] = useState<string>(currentUser.badgeNumber || 'PD-BADGE-8842');
  const [officerName, setOfficerName] = useState<string>(currentUser.name);
  const [amendmentText, setAmendmentText] = useState<string>('');
  const [showAmendmentInput, setShowAmendmentInput] = useState<boolean>(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const currentFIR = firs.find(f => f.id === selectedFirId) || firs[0];

  const handleApprove = (firId: string) => {
    approveFIR(firId, officerName, officerBadge);
    setActionSuccessMessage(`e-FIR ${currentFIR?.firNumber} has been digitally approved and stamped with Badge ${officerBadge}! St. Jude Hospital Terminal discharge block has been UNLOCKED.`);
    setTimeout(() => setActionSuccessMessage(null), 8000);
  };

  const handleAmendment = (firId: string) => {
    if (!amendmentText.trim()) return;
    requestFIRAmendment(firId, amendmentText.trim());
    setAmendmentText('');
    setShowAmendmentInput(false);
    setActionSuccessMessage(`Amendment request transmitted for ${currentFIR?.firNumber}.`);
    setTimeout(() => setActionSuccessMessage(null), 6000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Police Portal Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border-2 border-blue-200 shadow-xs">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-900">Police Collaboration Portal</h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                Law Enforcement Terminal
              </span>
            </div>
            <p className="text-xs text-stone-700 mt-0.5">
              Duty Officer: {currentUser.name} • {currentUser.organization} • Badge: {officerBadge}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-700 font-medium">Terminal Mode:</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Handheld Patrol Live Sync
          </span>
        </div>
      </div>

      {/* Action success alert */}
      {actionSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-emerald-900 text-xs sm:text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{actionSuccessMessage}</p>
            <button
              onClick={() => setCurrentRole('hospital')}
              className="text-xs text-emerald-700 underline font-bold flex items-center gap-1"
            >
              <span>Verify unlocked discharge in Hospital Terminal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: FIR List (4 cols) and FIR Document Review (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FIR Feed (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Automated e-FIR Queue</span>
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                {firs.length} Total
              </span>
            </div>

            <div className="space-y-2">
              {firs.map(fir => {
                const isSelected = fir.id === selectedFirId;
                return (
                  <button
                    key={fir.id}
                    onClick={() => {
                      setSelectedFirId(fir.id);
                      setShowAmendmentInput(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-400 shadow-2xs'
                        : 'bg-stone-50/50 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[11px] font-bold text-stone-900">
                        {fir.firNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        fir.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : fir.status === 'amendment_requested'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {fir.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-stone-800 mt-1 line-clamp-1">
                      {fir.incidentType}
                    </p>

                    <p className="text-[11px] text-stone-700 mt-0.5 line-clamp-1">
                      {fir.location}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-stone-700 pt-2 border-t border-stone-200/60 mt-2">
                      <span>Ticket: {fir.incidentTicket}</span>
                      <span>{new Date(fir.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Explanation */}
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 text-xs text-blue-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>Cross-Portal Link Notice</span>
            </div>
            <p className="leading-relaxed text-blue-900/80">
              When you digitally sign an e-FIR here, the <strong>Strict Conditional Discharge</strong> module 
              in the Hospital Terminal instantly registers the legal release, permitting the trauma patient to check out without police traveling to the ward.
            </p>
          </div>
        </div>

        {/* Detailed Digital FIR Document (8 cols) */}
        <div className="lg:col-span-8">
          {currentFIR ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {currentFIR.firNumber}
                    </span>
                    <span className="text-xs text-stone-700">| HealthSOS Automated Legal Intake</span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mt-1">
                    Electronic First Information Report (e-FIR)
                  </h3>
                  <p className="text-xs text-stone-700">
                    Jurisdiction: {currentFIR.policeStation}
                  </p>
                </div>

                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    currentFIR.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}>
                    {currentFIR.status === 'approved' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Digitally Approved & Signed</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Pending Officer Sign-off</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Form Fields & Scene Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-600" /> Date & Time Recorded
                  </span>
                  <p className="font-semibold text-stone-900">{new Date(currentFIR.timestamp).toLocaleString()}</p>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-700 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-600" /> GPS Incident Scene
                  </span>
                  <p className="font-semibold text-stone-900">{currentFIR.location}</p>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1 md:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-stone-700 flex items-center gap-1">
                    <Car className="w-3 h-3 text-stone-600" /> Vehicles & Equipment Involved
                  </span>
                  <p className="font-semibold text-stone-900">{currentFIR.vehiclesInvolved || 'N/A'}</p>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-700 flex items-center gap-1">
                    <User className="w-3 h-3 text-stone-600" /> Driver / Person of Interest
                  </span>
                  <p className="font-semibold text-stone-900">{currentFIR.driverDetails || 'Under Investigation'}</p>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-700 flex items-center gap-1">
                    <User className="w-3 h-3 text-stone-600" /> Victim / Patient Record
                  </span>
                  <p className="font-semibold text-stone-900">{currentFIR.victimDetails}</p>
                </div>

                {currentFIR.witnessStatement && (
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1 md:col-span-2">
                    <span className="text-[10px] uppercase font-bold text-stone-700">
                      Bystander Witness Recorded Statement:
                    </span>
                    <p className="text-stone-800 italic">"{currentFIR.witnessStatement}"</p>
                  </div>
                )}

                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1 md:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-stone-700">
                    Preliminary Police Telematics & Notes:
                  </span>
                  <p className="text-stone-800 leading-relaxed">{currentFIR.preliminaryNotes}</p>
                </div>
              </div>

              {/* Digital Signature & Approval Section */}
              <div className="pt-4 border-t border-stone-200 space-y-4">
                {currentFIR.status === 'approved' ? (
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                        <PenTool className="w-5 h-5" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-emerald-950">
                          Digitally Signed by {currentFIR.signedByOfficer || officerName}
                        </p>
                        <p className="text-emerald-800 mt-0.5">
                          Verified Badge: {currentFIR.officerBadge || officerBadge} • Approved: {new Date(currentFIR.approvedAt || Date.now()).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentRole('hospital')}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Switch to Hospital Terminal</span>
                    </button>
                  </div>
                ) : (
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">
                          Handheld Digital Sign-Off & Seal
                        </h4>
                        <p className="text-[11px] text-stone-700">
                          Certify preliminary review to unlock hospital patient checkout.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-stone-700">Badge ID:</span>
                        <input
                          type="text"
                          value={officerBadge}
                          onChange={(e) => setOfficerBadge(e.target.value)}
                          className="w-32 px-2 py-1 rounded-md border border-stone-300 font-mono text-xs font-bold bg-white"
                        />
                      </div>
                    </div>

                    {showAmendmentInput ? (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={amendmentText}
                          onChange={(e) => setAmendmentText(e.target.value)}
                          placeholder="State what needs amending before approval (e.g. need dashcam review, missing driver blood test)..."
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setShowAmendmentInput(false)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAmendment(currentFIR.id)}
                            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                          >
                            Send Amendment Request
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => setShowAmendmentInput(true)}
                          className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors"
                        >
                          Request Scene Amendment
                        </button>

                        <button
                          onClick={() => handleApprove(currentFIR.id)}
                          className="px-6 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <PenTool className="w-3.5 h-3.5" />
                          <span>Digitally Sign & Approve e-FIR</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-500 text-xs">
              No electronic FIRs currently in queue.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
