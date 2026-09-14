import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Ambulance, 
  Droplets, 
  Volume2, 
  VolumeX, 
  Radio, 
  QrCode, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  Phone, 
  AlertOctagon, 
  Play, 
  Square, 
  ChevronRight, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Shield,
  Send,
  FileCheck
} from 'lucide-react';
import { useHealthSOS } from '../../context/HealthSOSContext';
import { EmergencyCategory, FirstAidGuide } from '../../types';
import { FIRST_AID_GUIDES, INITIAL_VOLUNTEERS } from '../../data/initialData';
import { speakInstruction, stopSpeaking } from '../../utils/speech';
import { cprMetronome } from '../../utils/audioMetronome';

export const CitizenPortal: React.FC = () => {
  const { 
    currentUser, 
    incidents, 
    triggerSOS, 
    updateIncidentStatus, 
    citizenPassport, 
    isMeshNetworkActive, 
    toggleMeshNetwork 
  } = useHealthSOS();

  // Active Incident for this citizen
  const activeIncident = incidents.find(
    i => i.status !== 'discharged' && (i.reporterName.includes('Alex') || i.patientPassportId === citizenPassport.id)
  ) || incidents[0] || null;

  // SOS Form state
  const [selectedCategory, setSelectedCategory] = useState<EmergencyCategory>('road_accident');
  const [sosAddress, setSosAddress] = useState('Intersection of 5th Ave & Pine St, Metro District');
  const [sosDescription, setSosDescription] = useState('Two-vehicle collision with injured pedestrian. Conscious but bleeding from right leg.');
  const [isSosSubmitting, setIsSosSubmitting] = useState(false);
  const [sosSuccessBanner, setSosSuccessBanner] = useState(false);

  // Active First Aid Guide
  const [activeGuideCategory, setActiveGuideCategory] = useState<EmergencyCategory>('cardiac');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [metronomePulse, setMetronomePulse] = useState(false);

  // Volunteers state
  const [volunteers, setVolunteers] = useState(INITIAL_VOLUNTEERS);
  const [showPassportModal, setShowPassportModal] = useState(false);

  const currentGuide = FIRST_AID_GUIDES.find(g => g.id === activeGuideCategory) || FIRST_AID_GUIDES[0];

  // Stop sound/speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      cprMetronome.stop();
    };
  }, []);

  // Metronome toggle
  const handleToggleMetronome = () => {
    if (isMetronomeActive) {
      cprMetronome.stop();
      setIsMetronomeActive(false);
    } else {
      cprMetronome.start(() => {
        setMetronomePulse(true);
        setTimeout(() => setMetronomePulse(false), 120);
      });
      setIsMetronomeActive(true);
    }
  };

  // Voice narration toggle
  const handleSpeakCurrentStep = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const step = currentGuide.steps[activeStepIndex];
      const speechText = `Step ${step.stepNumber}: ${step.title}. ${step.instruction} ${step.warning ? 'Warning: ' + step.warning : ''}`;
      setIsSpeaking(true);
      speakInstruction(speechText, () => setIsSpeaking(false));
    }
  };

  const handleTriggerSOS = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSosSubmitting(true);

    setTimeout(() => {
      triggerSOS({
        category: selectedCategory,
        title: selectedCategory === 'cardiac' ? 'Suspected Cardiac Arrest' : 'Emergency Scene Report',
        description: sosDescription,
        address: sosAddress,
        isOfflineMesh: isMeshNetworkActive
      });

      // Synchronize guide to reported emergency
      setActiveGuideCategory(selectedCategory);
      setActiveStepIndex(0);
      setIsSosSubmitting(false);
      setSosSuccessBanner(true);
      setTimeout(() => setSosSuccessBanner(false), 6000);
    }, 400);
  };

  const handleSimulateVolunteerArrival = (volId: string) => {
    setVolunteers(prev => prev.map(v => v.id === volId ? { ...v, status: 'on_scene', etaMinutes: 0 } : v));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Citizen profile header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-13 h-13 rounded-2xl object-cover border-2 border-rose-100 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-900">{currentUser.name}</h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                Citizen Bystander Mode
              </span>
            </div>
            <p className="text-xs text-stone-700 mt-0.5">
              Phone: {currentUser.phone} • GPS Location: Downtown Metro Block 4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowPassportModal(true)}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-stone-300/80"
          >
            <QrCode className="w-4 h-4 text-stone-700" />
            <span>Digital Health Passport</span>
          </button>

          <button
            onClick={toggleMeshNetwork}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border ${
              isMeshNetworkActive
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300/80'
            }`}
          >
            <Radio className={`w-4 h-4 ${isMeshNetworkActive ? 'text-amber-700 animate-pulse' : 'text-stone-700'}`} />
            <span>{isMeshNetworkActive ? 'Mesh: Active' : 'Mesh: Off'}</span>
          </button>
        </div>
      </div>

      {/* Success alert banner */}
      {sosSuccessBanner && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-900 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-semibold">HealthSOS Emergency Dispatched Successfully!</p>
            <p className="text-xs text-emerald-700 mt-0.5">
              Ambulance en route. St. Jude Trauma room reserved. Police e-FIR filed. Nearby volunteer responders notified.
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: SOS Trigger & Active Live Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: SOS Trigger & Active Incident Tracker (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active emergency card (if any) */}
          {activeIncident && activeIncident.status !== 'discharged' && (
            <div className="bg-rose-50/60 rounded-2xl border-2 border-rose-300 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                    Active Emergency In Progress
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white text-rose-900 border border-rose-200">
                  {activeIncident.ticketNumber}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900">{activeIncident.title}</h3>
                <p className="text-xs text-stone-700 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{activeIncident.location.address}</span>
                </p>
              </div>

              {/* Status progression bar */}
              <div className="bg-white rounded-xl p-3 border border-rose-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-stone-700">
                  <span>Dispatch Status:</span>
                  <span className="font-bold text-rose-700 capitalize">
                    {activeIncident.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-rose-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: activeIncident.status === 'ambulance_dispatched' ? '30%'
                        : activeIncident.status === 'paramedic_on_scene' ? '60%'
                        : activeIncident.status === 'patient_en_route' ? '85%'
                        : '100%'
                    }}
                  />
                </div>

                {/* Assigned Ambulance Info */}
                {activeIncident.assignedAmbulance && (
                  <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Ambulance className="w-4 h-4 text-rose-600" />
                      <span className="font-semibold text-stone-900">
                        {activeIncident.assignedAmbulance.vehicleNumber}
                      </span>
                      <span className="text-stone-700">({activeIncident.assignedAmbulance.driverName})</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded">
                      <Clock className="w-3.5 h-3.5" />
                      <span>ETA: ~{activeIncident.assignedAmbulance.currentEtaMinutes} mins</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Connected Ecosystem Integrations Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Hospital Trauma Bed Auto-Reservation */}
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hospital Bed Auto-Reserved</span>
                  </div>
                  <p className="text-[11px] text-stone-700 mt-0.5">
                    St. Jude Trauma Bay 1 locked for intake
                  </p>
                </div>

                {/* Automated Insurance Pre-approval */}
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-1.5 text-blue-800 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Insurance Pre-Approved</span>
                  </div>
                  <p className="text-[11px] text-stone-700 mt-0.5">
                    Metro BlueShield: Up to $25,000 cleared
                  </p>
                </div>
              </div>

              {/* Mesh Network notice if routed via mesh */}
              {activeIncident.isOfflineMeshRouted && (
                <div className="bg-amber-100/70 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2 text-xs text-amber-900">
                  <Radio className="w-4 h-4 text-amber-700 shrink-0 animate-pulse" />
                  <span>
                    <strong>Offline Mesh Active:</strong> Packet successfully bounced across {activeIncident.meshHops || 3} bystander phones to city emergency gateway.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Quick SOS Trigger Form */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-rose-600 text-xs font-semibold uppercase tracking-wider">
                <AlertOctagon className="w-4 h-4" />
                <span>Instant Emergency Dispatch</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mt-1">
                Report an Emergency or Accident
              </h3>
              <p className="text-xs text-stone-700 mt-0.5">
                Pings nearest ambulance, alerts St. Jude hospital, files police e-FIR, and starts guided AI first aid.
              </p>
            </div>

            <form onSubmit={handleTriggerSOS} className="space-y-4">
              {/* Emergency Category Buttons */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-800">
                  Select Incident Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'road_accident', label: 'Road Accident', icon: Ambulance },
                    { id: 'cardiac', label: 'Cardiac / CPR', icon: Heart },
                    { id: 'trauma_bleeding', label: 'Severe Bleeding', icon: Droplets },
                    { id: 'choking', label: 'Choking', icon: AlertTriangle },
                    { id: 'fracture', label: 'Broken Bone', icon: Activity },
                    { id: 'burn', label: 'Severe Burn', icon: Sparkles }
                  ].map(cat => {
                    const isSelected = selectedCategory === cat.id;
                    const Icon = cat.icon;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id as EmergencyCategory);
                          setActiveGuideCategory(cat.id as EmergencyCategory);
                          setActiveStepIndex(0);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-rose-50 border-rose-400 text-rose-900 font-semibold shadow-2xs'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-rose-600' : 'text-stone-500'}`} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                  <span>Scene Address & Landmarks:</span>
                  <span className="text-[11px] text-rose-600 font-normal">GPS Accurate (±3m)</span>
                </label>
                <input
                  type="text"
                  value={sosAddress}
                  onChange={(e) => setSosAddress(e.target.value)}
                  required
                  placeholder="Enter street name, cross street, or building name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-stone-50/50"
                />
              </div>

              {/* Description Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800">
                  Emergency Situation Details:
                </label>
                <textarea
                  rows={2}
                  value={sosDescription}
                  onChange={(e) => setSosDescription(e.target.value)}
                  placeholder="Injuries, conscious level, number of victims, hazards..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-stone-50/50"
                />
              </div>

              {/* Trigger Button */}
              <button
                type="submit"
                disabled={isSosSubmitting}
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <AlertOctagon className="w-5 h-5 fill-white" />
                <span>{isSosSubmitting ? 'Pinging Emergency Network...' : 'TRIGGER INSTANT SOS DISPATCH'}</span>
              </button>
            </form>
          </div>

          {/* Crowdsourced First Responders Alert list */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>Crowdsourced First Responder Volunteers</span>
                </h4>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Nearby certified bystanders alerted to offer immediate hands-on support.
                </p>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                {volunteers.filter(v => v.status === 'responding').length} Responding
              </span>
            </div>

            <div className="space-y-2">
              {volunteers.map(vol => (
                <div 
                  key={vol.id} 
                  className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-stone-900">{vol.name}</span>
                      <span className="text-[10px] text-stone-700 bg-white px-1.5 py-0.5 rounded border border-stone-200">
                        {vol.distanceMeters}m away
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-700">{vol.qualifications}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {vol.status === 'on_scene' ? (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">
                        On Scene Helping
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSimulateVolunteerArrival(vol.id)}
                        className="px-2.5 py-1 rounded-md bg-stone-200 hover:bg-stone-300 text-stone-800 text-[11px] font-medium transition-colors"
                      >
                        Mark Arrived
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: AI-Powered Guided First Aid (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5 sticky top-20">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-rose-600 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Guided First Aid Assistant</span>
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                  {currentGuide.urgencyLevel}
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900">
                {currentGuide.title}
              </h3>
              <p className="text-xs text-stone-700">
                {currentGuide.subtitle}
              </p>
            </div>

            {/* Quick guide selector tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-stone-200">
              {FIRST_AID_GUIDES.map(guide => (
                <button
                  key={guide.id}
                  onClick={() => {
                    setActiveGuideCategory(guide.id);
                    setActiveStepIndex(0);
                    stopSpeaking();
                    setIsSpeaking(false);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                    activeGuideCategory === guide.id
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {guide.id === 'trauma_bleeding' ? 'Bleeding' 
                    : guide.id === 'cardiac' ? 'Heart / CPR' 
                    : guide.id === 'road_accident' ? 'Accident'
                    : guide.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Interactive Step Card */}
            {currentGuide.steps[activeStepIndex] && (
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                      {currentGuide.steps[activeStepIndex].stepNumber}
                    </span>
                    <span className="text-xs font-bold text-stone-900">
                      {currentGuide.steps[activeStepIndex].title}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-700 font-medium">
                    Step {activeStepIndex + 1} of {currentGuide.steps.length}
                  </span>
                </div>

                <p className="text-xs text-stone-800 leading-relaxed">
                  {currentGuide.steps[activeStepIndex].instruction}
                </p>

                {currentGuide.steps[activeStepIndex].warning && (
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Warning:</strong> {currentGuide.steps[activeStepIndex].warning}</span>
                  </div>
                )}

                {currentGuide.steps[activeStepIndex].actionTip && (
                  <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200 text-[11px] text-blue-900 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Lifesaver Tip:</strong> {currentGuide.steps[activeStepIndex].actionTip}</span>
                  </div>
                )}

                {/* Step controls: Next, Prev, Speak */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => {
                      setActiveStepIndex(prev => Math.max(0, prev - 1));
                      stopSpeaking();
                      setIsSpeaking(false);
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium text-stone-700 hover:text-stone-900 disabled:opacity-30"
                  >
                    Previous
                  </button>

                  <button
                    onClick={handleSpeakCurrentStep}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isSpeaking 
                        ? 'bg-rose-600 text-white animate-pulse' 
                        : 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-rose-600" />}
                    <span>{isSpeaking ? 'Stop Voice' : 'Read Aloud'}</span>
                  </button>

                  <button
                    disabled={activeStepIndex >= currentGuide.steps.length - 1}
                    onClick={() => {
                      setActiveStepIndex(prev => Math.min(currentGuide.steps.length - 1, prev + 1));
                      stopSpeaking();
                      setIsSpeaking(false);
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white disabled:opacity-30"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Special 110 BPM CPR Metronome (Available on cardiac protocol) */}
            {currentGuide.cprMetronomeApplicable && (
              <div className="bg-rose-50/80 rounded-2xl p-4 border border-rose-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className={`w-5 h-5 text-rose-600 ${metronomePulse ? 'scale-130' : 'scale-100'} transition-transform duration-100`} />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">
                        AHA 110 BPM CPR Audio Metronome
                      </h4>
                      <p className="text-[11px] text-stone-700">
                        Stayin Alive compression cadence
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleMetronome}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isMetronomeActive
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-white text-rose-700 border border-rose-300 hover:bg-rose-100'
                    }`}
                  >
                    {isMetronomeActive ? <Square className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-rose-600" />}
                    <span>{isMetronomeActive ? 'Stop Beat' : 'Start CPR Beat'}</span>
                  </button>
                </div>

                {isMetronomeActive && (
                  <div className="flex items-center justify-center gap-1.5 py-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full transition-all duration-100 ${
                          metronomePulse ? 'bg-rose-600 scale-125' : 'bg-rose-200'
                        }`} 
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Digital Health Passport Modal */}
      {showPassportModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Digital Health Passport</h3>
                  <p className="text-[11px] text-stone-700">Encrypted Emergency Triage Profile</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPassportModal(false)}
                className="text-stone-700 hover:text-stone-900 text-xs font-semibold p-1"
              >
                Close
              </button>
            </div>

            {/* Passport details */}
            <div className="space-y-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex justify-between">
                <div>
                  <p className="text-[10px] text-stone-700 uppercase font-semibold">National Health ID</p>
                  <p className="font-mono font-bold text-stone-900">{citizenPassport.nationalId}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-stone-700 uppercase font-semibold">Blood Group</p>
                  <p className="font-extrabold text-rose-600 text-base">{citizenPassport.bloodGroup}</p>
                </div>
              </div>

              {/* Critical allergies badge */}
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Critical Drug Allergies</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {citizenPassport.allergies.map((allergy, idx) => (
                    <span key={idx} className="bg-rose-100 text-rose-900 font-semibold px-2 py-0.5 rounded text-[11px]">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chronic conditions */}
              <div className="space-y-1">
                <p className="font-semibold text-stone-800">Chronic Conditions & Baseline:</p>
                <div className="flex flex-wrap gap-1">
                  {citizenPassport.chronicConditions.map((cond, idx) => (
                    <span key={idx} className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[11px]">
                      {cond}
                    </span>
                  ))}
                </div>
              </div>

              {/* Emergency contact */}
              <div className="space-y-1 pt-1 border-t border-stone-200">
                <p className="font-semibold text-stone-800">Emergency Contacts:</p>
                {citizenPassport.emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="flex items-center justify-between text-stone-700 py-1">
                    <span>{contact.name} ({contact.relation})</span>
                    <a href={`tel:${contact.phone}`} className="text-blue-600 font-semibold flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{contact.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-stone-100 p-3 rounded-xl text-center text-[11px] text-stone-700">
              Doctors & Paramedics scan this token upon emergency intake to prevent lethal drug interactions.
            </div>

            <button
              onClick={() => setShowPassportModal(false)}
              className="w-full py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
