import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserRole, 
  UserAccount, 
  EmergencyIncident, 
  HospitalBed, 
  BloodStock, 
  FIRRecord, 
  MedicineItem, 
  PriceCapRegulation, 
  HospitalViolationRecord, 
  DigitalHealthPassport,
  EmergencyCategory
} from '../types';
import { 
  PREBUILT_ACCOUNTS, 
  INITIAL_INCIDENTS, 
  INITIAL_HOSPITAL_BEDS, 
  INITIAL_BLOOD_STOCKS, 
  INITIAL_FIRS, 
  INITIAL_MEDICINES, 
  INITIAL_PRICE_CAPS, 
  INITIAL_VIOLATIONS, 
  INITIAL_CITIZEN_PASSPORT 
} from '../data/initialData';

interface HealthSOSContextType {
  currentRole: UserRole;
  currentUser: UserAccount;
  setCurrentRole: (role: UserRole) => void;
  
  // Incidents
  incidents: EmergencyIncident[];
  activeIncident: EmergencyIncident | null;
  triggerSOS: (data: {
    category: EmergencyCategory;
    title: string;
    description: string;
    address: string;
    isOfflineMesh?: boolean;
  }) => EmergencyIncident;
  updateIncidentStatus: (incidentId: string, status: EmergencyIncident['status']) => void;
  
  // Hospital
  beds: HospitalBed[];
  reserveBed: (bedId: string, ticketNumber: string, patientName: string) => void;
  bloodStocks: BloodStock[];
  reserveBloodUnit: (stockId: string, incidentTicket: string, units?: number) => void;
  medicines: MedicineItem[];
  triggerRestock: (medicineId: string) => void;
  triggerExpiryRecall: (medicineId: string) => void;
  
  // Strict Conditional Discharge
  updateDischargeClearance: (incidentId: string, field: 'healthChartCleared' | 'doctorSigned' | 'policeFIRCleared' | 'billingCleared', value: boolean) => void;
  completeDischarge: (incidentId: string) => { success: boolean; reason?: string };
  
  // Police Portal
  firs: FIRRecord[];
  approveFIR: (firId: string, officerName: string, officerBadge: string) => void;
  requestFIRAmendment: (firId: string, notes: string) => void;
  
  // Government Portal
  priceCaps: PriceCapRegulation[];
  violations: HospitalViolationRecord[];
  hospitalComplianceFlag: boolean;
  hospitalLockoutStatus: boolean;
  hospitalTotalFines: number;
  auditHospitalBill: (incidentId: string, proposedBill: {
    baseFareAmbulance: number;
    traumaAdmission: number;
    surgeryFee: number;
    medicineTotal: number;
  }) => { isCompliant: boolean; violations: string[]; excess: number };
  simulateHospitalOvercharge: (incidentId: string) => void;
  
  // Citizen Passport & Mesh
  citizenPassport: DigitalHealthPassport;
  updatePassport: (data: Partial<DigitalHealthPassport>) => void;
  isMeshNetworkActive: boolean;
  toggleMeshNetwork: () => void;
  
  // Reset demo
  resetAllData: () => void;
}

const STORAGE_KEYS = {
  ROLE: 'healthsos_current_role',
  INCIDENTS: 'healthsos_incidents_v2',
  BEDS: 'healthsos_beds_v2',
  BLOOD: 'healthsos_blood_v2',
  FIRS: 'healthsos_firs_v2',
  MEDICINES: 'healthsos_medicines_v2',
  VIOLATIONS: 'healthsos_violations_v2',
  PASSPORT: 'healthsos_passport_v2',
  MESH: 'healthsos_mesh_active_v2'
};

const HealthSOSContext = createContext<HealthSOSContextType | undefined>(undefined);

export const HealthSOSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Current Role
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'citizen';
  });

  // Incidents
  const [incidents, setIncidents] = useState<EmergencyIncident[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  // Beds
  const [beds, setBeds] = useState<HospitalBed[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BEDS);
    return saved ? JSON.parse(saved) : INITIAL_HOSPITAL_BEDS;
  });

  // Blood Stocks
  const [bloodStocks, setBloodStocks] = useState<BloodStock[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BLOOD);
    return saved ? JSON.parse(saved) : INITIAL_BLOOD_STOCKS;
  });

  // FIRs
  const [firs, setFirs] = useState<FIRRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FIRS);
    return saved ? JSON.parse(saved) : INITIAL_FIRS;
  });

  // Medicines
  const [medicines, setMedicines] = useState<MedicineItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDICINES);
    return saved ? JSON.parse(saved) : INITIAL_MEDICINES;
  });

  // Violations
  const [violations, setViolations] = useState<HospitalViolationRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIOLATIONS);
    return saved ? JSON.parse(saved) : INITIAL_VIOLATIONS;
  });

  // Passport
  const [citizenPassport, setCitizenPassport] = useState<DigitalHealthPassport>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PASSPORT);
    return saved ? JSON.parse(saved) : INITIAL_CITIZEN_PASSPORT;
  });

  // Mesh Network Simulation Toggle
  const [isMeshNetworkActive, setIsMeshNetworkActive] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.MESH) === 'true';
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BEDS, JSON.stringify(beds));
  }, [beds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOOD, JSON.stringify(bloodStocks));
  }, [bloodStocks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FIRS, JSON.stringify(firs));
  }, [firs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDICINES, JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIOLATIONS, JSON.stringify(violations));
  }, [violations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PASSPORT, JSON.stringify(citizenPassport));
  }, [citizenPassport]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESH, String(isMeshNetworkActive));
  }, [isMeshNetworkActive]);

  const currentUser = PREBUILT_ACCOUNTS[currentRole];

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
  };

  const activeIncident = incidents.find(
    inc => inc.status !== 'discharged' && inc.reporterName.includes('Alex')
  ) || incidents[0] || null;

  // Trigger SOS from Citizen App
  const triggerSOS = ({
    category,
    title,
    description,
    address,
    isOfflineMesh = false
  }: {
    category: EmergencyCategory;
    title: string;
    description: string;
    address: string;
    isOfflineMesh?: boolean;
  }): EmergencyIncident => {
    const newTicket = `SOS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newIncidentId = `inc_${Date.now()}`;
    const newFirId = (category === 'road_accident' || category === 'trauma_bleeding') 
      ? `fir_pd_${Date.now().toString().slice(-4)}`
      : undefined;

    // Auto find an open bed
    const openBed = beds.find(b => !b.isOccupied);
    const assignedBedId = openBed ? openBed.id : 'bed_tb_02';

    const newIncident: EmergencyIncident = {
      id: newIncidentId,
      ticketNumber: newTicket,
      reporterName: currentUser.name,
      reporterPhone: currentUser.phone,
      category,
      title,
      description,
      location: {
        address,
        coordinates: '40.7135° N, 74.0041° W',
        landmark: 'Reported via HealthSOS Mobile App'
      },
      severity: 'critical',
      status: 'ambulance_dispatched',
      reportedAt: new Date().toISOString(),
      isOfflineMeshRouted: isOfflineMesh || isMeshNetworkActive,
      meshHops: (isOfflineMesh || isMeshNetworkActive) ? 3 : 0,
      assignedAmbulance: {
        vehicleNumber: 'AMB-RAPID-07',
        driverName: 'Captain Dave Miller',
        driverPhone: '+1 (555) 700-1122',
        currentEtaMinutes: 4,
        paramedicNote: 'En route with Advanced Cardiac/Trauma Kit. Live telemetry synced.'
      },
      assignedHospitalId: 'st_jude_metro',
      assignedBedId,
      patientPassportId: citizenPassport.id,
      firId: newFirId,
      insurancePreApproval: {
        provider: 'Metro Care Insurance Network',
        policyNumber: 'MC-2026-X88',
        status: 'pre_approved',
        coverageAmount: 30000,
        clearedAt: new Date().toISOString()
      },
      billing: {
        baseFareAmbulance: 80,
        traumaAdmission: 150,
        surgeryFee: category === 'road_accident' ? 1200 : 0,
        medicineTotal: 95,
        totalAmount: category === 'road_accident' ? 1525 : 325,
        isPriceCapCompliant: true,
        status: 'draft'
      },
      dischargeStatus: {
        healthChartCleared: false,
        doctorSigned: false,
        policeFIRCleared: newFirId ? false : true, // If vehicle accident, police approval is strictly required
        billingCleared: false,
        isFullyDischarged: false
      }
    };

    // Auto-reserve bed
    if (openBed) {
      setBeds(prev => prev.map(b => b.id === openBed.id ? {
        ...b,
        isOccupied: true,
        assignedIncidentTicket: newTicket,
        patientName: `${currentUser.name} (Auto-Reserved en route)`,
        admittedAt: 'Reserved by HealthSOS Dispatch'
      } : b));
    }

    // Auto-generate electronic FIR for police portal if road accident or major trauma
    if (newFirId) {
      const newFIR: FIRRecord = {
        id: newFirId,
        firNumber: `FIR-2026-CR-${Math.floor(1000 + Math.random() * 9000)}`,
        incidentId: newIncidentId,
        incidentTicket: newTicket,
        incidentType: 'Road Traffic Accident with Critical Emergency Triage',
        location: address,
        timestamp: new Date().toISOString(),
        vehiclesInvolved: 'Reported Incident Scene (Under Investigation)',
        driverDetails: 'Awaiting on-scene patrol report',
        victimDetails: `${currentUser.name} (DOB: ${citizenPassport.birthDate}, Blood: ${citizenPassport.bloodGroup})`,
        preliminaryNotes: `Emergency reported through HealthSOS app. Details: ${description}. Telemetry dispatched to St. Jude Metro Hospital.`,
        status: 'pending_review',
        policeStation: 'Precinct 4 Traffic & Incident Division'
      };
      setFirs(prev => [newFIR, ...prev]);
    }

    setIncidents(prev => [newIncident, ...prev]);
    return newIncident;
  };

  const updateIncidentStatus = (incidentId: string, status: EmergencyIncident['status']) => {
    setIncidents(prev => prev.map(inc => inc.id === incidentId ? { ...inc, status } : inc));
  };

  const reserveBed = (bedId: string, ticketNumber: string, patientName: string) => {
    setBeds(prev => prev.map(bed => bed.id === bedId ? {
      ...bed,
      isOccupied: true,
      assignedIncidentTicket: ticketNumber,
      patientName,
      admittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : bed));
  };

  const reserveBloodUnit = (stockId: string, incidentTicket: string, units: number = 2) => {
    setBloodStocks(prev => prev.map(stock => {
      if (stock.id === stockId && stock.unitsAvailable >= units) {
        return {
          ...stock,
          unitsAvailable: stock.unitsAvailable - units,
          reservedUnits: stock.reservedUnits + units,
          lastUpdated: 'Just now'
        };
      }
      return stock;
    }));

    setIncidents(prev => prev.map(inc => {
      if (inc.ticketNumber === incidentTicket) {
        return {
          ...inc,
          bloodReservationId: `res_${stockId}_${Date.now()}`
        };
      }
      return inc;
    }));
  };

  const triggerRestock = (medicineId: string) => {
    setMedicines(prev => prev.map(med => {
      if (med.id === medicineId) {
        return {
          ...med,
          isRestockTriggered: true,
          currentStock: med.currentStock + 50 // automated restocking fulfilled
        };
      }
      return med;
    }));
  };

  const triggerExpiryRecall = (medicineId: string) => {
    setMedicines(prev => prev.map(med => {
      if (med.id === medicineId) {
        return {
          ...med,
          isRecallDispatched: true,
          isExpiringSoon: false
        };
      }
      return med;
    }));
  };

  // Strict Conditional Discharge Clearances
  const updateDischargeClearance = (
    incidentId: string, 
    field: 'healthChartCleared' | 'doctorSigned' | 'policeFIRCleared' | 'billingCleared', 
    value: boolean
  ) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId && inc.dischargeStatus) {
        const updatedDischarge = {
          ...inc.dischargeStatus,
          [field]: value
        };
        return {
          ...inc,
          dischargeStatus: updatedDischarge
        };
      }
      return inc;
    }));
  };

  const completeDischarge = (incidentId: string): { success: boolean; reason?: string } => {
    const inc = incidents.find(i => i.id === incidentId);
    if (!inc) return { success: false, reason: 'Incident record not found.' };

    const ds = inc.dischargeStatus;
    if (!ds) return { success: false, reason: 'No discharge file created for patient.' };

    if (!ds.healthChartCleared) {
      return { success: false, reason: 'Discharge Locked: Attending nurse health chart and vital stabilization is incomplete.' };
    }
    if (!ds.doctorSigned) {
      return { success: false, reason: 'Discharge Locked: Attending Physician digital sign-off is pending.' };
    }
    if (!ds.policeFIRCleared) {
      return { success: false, reason: 'Discharge Locked: Police Legal FIR Clearance pending in Police Collaboration Portal.' };
    }
    if (!ds.billingCleared) {
      return { success: false, reason: 'Discharge Locked: Financial price-cap verification is pending.' };
    }

    // All clear! Discharge patient and release bed
    setIncidents(prev => prev.map(i => {
      if (i.id === incidentId) {
        return {
          ...i,
          status: 'discharged',
          dischargeStatus: {
            ...ds,
            isFullyDischarged: true,
            dischargeTimestamp: new Date().toISOString()
          }
        };
      }
      return i;
    }));

    // Release hospital bed
    if (inc.assignedBedId) {
      setBeds(prev => prev.map(b => b.id === inc.assignedBedId ? {
        ...b,
        isOccupied: false,
        assignedIncidentTicket: undefined,
        patientName: undefined,
        admittedAt: undefined
      } : b));
    }

    return { success: true };
  };

  // Police Portal: Approve or Amend FIR
  const approveFIR = (firId: string, officerName: string, officerBadge: string) => {
    const targetFIR = firs.find(f => f.id === firId);
    if (!targetFIR) return;

    setFirs(prev => prev.map(fir => {
      if (fir.id === firId) {
        return {
          ...fir,
          status: 'approved',
          signedByOfficer: officerName,
          officerBadge,
          approvedAt: new Date().toISOString()
        };
      }
      return fir;
    }));

    // Instantly unlock Police FIR clearance in the Hospital Terminal for the corresponding incident!
    setIncidents(prev => prev.map(inc => {
      if (inc.ticketNumber === targetFIR.incidentTicket || inc.firId === firId) {
        return {
          ...inc,
          dischargeStatus: inc.dischargeStatus ? {
            ...inc.dischargeStatus,
            policeFIRCleared: true
          } : undefined
        };
      }
      return inc;
    }));
  };

  const requestFIRAmendment = (firId: string, notes: string) => {
    setFirs(prev => prev.map(fir => {
      if (fir.id === firId) {
        return {
          ...fir,
          status: 'amendment_requested',
          preliminaryNotes: `${fir.preliminaryNotes} | [Officer Amendment Note]: ${notes}`
        };
      }
      return fir;
    }));
  };

  // Government Price Regulation Audit
  const priceCaps = INITIAL_PRICE_CAPS;

  const auditHospitalBill = (
    incidentId: string, 
    proposedBill: {
      baseFareAmbulance: number;
      traumaAdmission: number;
      surgeryFee: number;
      medicineTotal: number;
    }
  ) => {
    const violationItems: string[] = [];
    let excess = 0;

    const ambCap = priceCaps.find(c => c.category === 'Ambulance')?.governmentFlatRate || 80;
    const traumaCap = priceCaps.find(c => c.category === 'Trauma Room')?.governmentFlatRate || 150;
    const surgCap = priceCaps.find(c => c.category === 'Emergency Surgery')?.governmentFlatRate || 1200;

    if (proposedBill.baseFareAmbulance > ambCap) {
      const diff = proposedBill.baseFareAmbulance - ambCap;
      violationItems.push(`Ambulance Fare: $${proposedBill.baseFareAmbulance} exceeds statutory cap of $${ambCap} by $${diff}`);
      excess += diff;
    }
    if (proposedBill.traumaAdmission > traumaCap) {
      const diff = proposedBill.traumaAdmission - traumaCap;
      violationItems.push(`Trauma Room Admission: $${proposedBill.traumaAdmission} exceeds statutory cap of $${traumaCap} by $${diff}`);
      excess += diff;
    }
    if (proposedBill.surgeryFee > surgCap) {
      const diff = proposedBill.surgeryFee - surgCap;
      violationItems.push(`Surgery Base Fee: $${proposedBill.surgeryFee} exceeds statutory cap of $${surgCap} by $${diff}`);
      excess += diff;
    }

    const isCompliant = violationItems.length === 0;

    // Update incident billing
    const totalAmount = proposedBill.baseFareAmbulance + proposedBill.traumaAdmission + proposedBill.surgeryFee + proposedBill.medicineTotal;
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          billing: {
            ...proposedBill,
            totalAmount,
            isPriceCapCompliant: isCompliant,
            violationAmount: excess,
            status: isCompliant ? 'audited' : 'draft'
          },
          dischargeStatus: inc.dischargeStatus ? {
            ...inc.dischargeStatus,
            billingCleared: isCompliant
          } : undefined
        };
      }
      return inc;
    }));

    return { isCompliant, violations: violationItems, excess };
  };

  // Simulate an overcharge to demonstrate the 3-tier government penalty system!
  const simulateHospitalOvercharge = (incidentId: string) => {
    const inc = incidents.find(i => i.id === incidentId) || incidents[0];
    const newOffenceLevel = ((violations.length % 3) + 1) as 1 | 2 | 3;

    let penaltyDesc = '';
    let status: HospitalViolationRecord['status'] = 'warning_issued';

    if (newOffenceLevel === 1) {
      penaltyDesc = 'Automated Warning Notice issued & Public Compliance Warning Flag added to hospital profile.';
      status = 'warning_issued';
    } else if (newOffenceLevel === 2) {
      penaltyDesc = 'Heavy statutory fine of $5,000 automatically levied through payment gateway.';
      status = 'fine_levied';
    } else {
      penaltyDesc = 'Third Offence: Hospital locked out of HealthSOS Emergency Network & license suspension recommended to Ministry.';
      status = 'license_suspended';
    }

    const newViolation: HospitalViolationRecord = {
      id: `viol_${Date.now()}`,
      hospitalName: 'St. Jude Metro Trauma Center',
      incidentTicket: inc ? inc.ticketNumber : 'SOS-2026-8921',
      itemBilled: 'Trauma Bay & Surgery Overcharge ($1,850 charged vs $1,350 statutory cap)',
      amountCharged: 1850,
      govtCapRate: 1350,
      violationExcess: 500,
      offenceLevel: newOffenceLevel,
      penaltyAction: penaltyDesc,
      date: new Date().toISOString().split('T')[0],
      status
    };

    setViolations(prev => [newViolation, ...prev]);

    // Update incident billing to reflect violation
    if (inc) {
      setIncidents(prev => prev.map(i => {
        if (i.id === inc.id) {
          return {
            ...i,
            billing: {
              baseFareAmbulance: 80,
              traumaAdmission: 350, // overcharged
              surgeryFee: 1500, // overcharged
              medicineTotal: 185,
              totalAmount: 2115,
              isPriceCapCompliant: false,
              violationAmount: 500,
              status: 'draft'
            },
            dischargeStatus: i.dischargeStatus ? {
              ...i.dischargeStatus,
              billingCleared: false // locks discharge!
            } : undefined
          };
        }
        return i;
      }));
    }
  };

  const hospitalComplianceFlag = violations.some(v => v.hospitalName.includes('St. Jude'));
  const hospitalLockoutStatus = violations.some(v => v.hospitalName.includes('St. Jude') && v.offenceLevel === 3);
  const hospitalTotalFines = violations
    .filter(v => v.hospitalName.includes('St. Jude') && v.status === 'fine_levied')
    .length * 5000;

  const updatePassport = (data: Partial<DigitalHealthPassport>) => {
    setCitizenPassport(prev => ({ ...prev, ...data }));
  };

  const toggleMeshNetwork = () => {
    setIsMeshNetworkActive(prev => !prev);
  };

  const resetAllData = () => {
    localStorage.clear();
    setIncidents(INITIAL_INCIDENTS);
    setBeds(INITIAL_HOSPITAL_BEDS);
    setBloodStocks(INITIAL_BLOOD_STOCKS);
    setFirs(INITIAL_FIRS);
    setMedicines(INITIAL_MEDICINES);
    setViolations(INITIAL_VIOLATIONS);
    setCitizenPassport(INITIAL_CITIZEN_PASSPORT);
    setIsMeshNetworkActive(false);
    setCurrentRoleState('citizen');
  };

  return (
    <HealthSOSContext.Provider value={{
      currentRole,
      currentUser,
      setCurrentRole,
      incidents,
      activeIncident,
      triggerSOS,
      updateIncidentStatus,
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
      approveFIR,
      requestFIRAmendment,
      priceCaps,
      violations,
      hospitalComplianceFlag,
      hospitalLockoutStatus,
      hospitalTotalFines,
      auditHospitalBill,
      simulateHospitalOvercharge,
      citizenPassport,
      updatePassport,
      isMeshNetworkActive,
      toggleMeshNetwork,
      resetAllData
    }}>
      {children}
    </HealthSOSContext.Provider>
  );
};

export const useHealthSOS = () => {
  const context = useContext(HealthSOSContext);
  if (!context) {
    throw new Error('useHealthSOS must be used within a HealthSOSProvider');
  }
  return context;
};
