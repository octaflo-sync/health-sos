export type UserRole = 'citizen' | 'hospital' | 'police' | 'government';

export interface UserAccount {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  title: string;
  organization: string;
  avatar: string;
  badgeNumber?: string;
  phone: string;
  location: string;
}

export type EmergencyStatus = 
  | 'reported' 
  | 'ambulance_dispatched' 
  | 'paramedic_on_scene' 
  | 'patient_en_route' 
  | 'hospital_intake' 
  | 'treated' 
  | 'discharged';

export type EmergencyCategory = 
  | 'cardiac' 
  | 'trauma_bleeding' 
  | 'road_accident' 
  | 'choking' 
  | 'fracture' 
  | 'burn' 
  | 'seizure';

export interface EmergencyIncident {
  id: string;
  ticketNumber: string;
  reporterName: string;
  reporterPhone: string;
  category: EmergencyCategory;
  title: string;
  description: string;
  location: {
    address: string;
    coordinates: string;
    landmark?: string;
  };
  severity: 'critical' | 'urgent' | 'moderate';
  status: EmergencyStatus;
  reportedAt: string;
  isOfflineMeshRouted?: boolean;
  meshHops?: number;
  assignedAmbulance?: {
    vehicleNumber: string;
    driverName: string;
    driverPhone: string;
    currentEtaMinutes: number;
    paramedicNote?: string;
  };
  assignedHospitalId: string;
  assignedBedId?: string;
  patientPassportId?: string;
  firId?: string;
  bloodReservationId?: string;
  insurancePreApproval?: {
    provider: string;
    policyNumber: string;
    status: 'pre_approved' | 'pending' | 'verified';
    coverageAmount: number;
    clearedAt?: string;
  };
  billing?: {
    baseFareAmbulance: number;
    traumaAdmission: number;
    surgeryFee: number;
    medicineTotal: number;
    totalAmount: number;
    isPriceCapCompliant: boolean;
    violationAmount?: number;
    status: 'draft' | 'audited' | 'paid';
  };
  dischargeStatus?: {
    healthChartCleared: boolean;
    doctorSigned: boolean;
    policeFIRCleared: boolean;
    billingCleared: boolean;
    isFullyDischarged: boolean;
    dischargeTimestamp?: string;
  };
}

export interface FirstAidStep {
  stepNumber: number;
  title: string;
  instruction: string;
  warning?: string;
  actionTip?: string;
}

export interface FirstAidGuide {
  id: EmergencyCategory;
  title: string;
  subtitle: string;
  iconName: string;
  urgencyLevel: 'Immediate (0-2 min)' | 'Critical (2-5 min)' | 'Urgent (5-10 min)';
  cprMetronomeApplicable?: boolean;
  steps: FirstAidStep[];
  spokenNarration: string[];
}

export interface VolunteerFirstResponder {
  id: string;
  name: string;
  qualifications: string;
  distanceMeters: number;
  phone: string;
  status: 'responding' | 'on_scene' | 'available';
  etaMinutes: number;
}

export interface DigitalHealthPassport {
  id: string;
  nationalId: string;
  fullName: string;
  birthDate: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  emergencyContacts: {
    name: string;
    relation: string;
    phone: string;
  }[];
  organDonor: boolean;
  qrToken: string;
}

export interface HospitalBed {
  id: string;
  bedCode: string;
  type: 'trauma_bay' | 'icu_critical' | 'opd_emergency' | 'general_ward';
  label: string;
  isOccupied: boolean;
  assignedIncidentTicket?: string;
  patientName?: string;
  admittedAt?: string;
}

export interface BloodStock {
  id: string;
  bankName: string;
  bloodGroup: string;
  unitsAvailable: number;
  reservedUnits: number;
  lastUpdated: string;
  address: string;
  distanceKm: number;
}

export interface FIRRecord {
  id: string;
  firNumber: string;
  incidentId: string;
  incidentTicket: string;
  incidentType: string;
  location: string;
  timestamp: string;
  vehiclesInvolved?: string;
  driverDetails?: string;
  victimDetails: string;
  witnessStatement?: string;
  preliminaryNotes: string;
  status: 'pending_review' | 'approved' | 'amendment_requested';
  signedByOfficer?: string;
  officerBadge?: string;
  approvedAt?: string;
  policeStation: string;
}

export interface MedicineItem {
  id: string;
  name: string;
  genericName: string;
  batchNumber: string;
  category: 'critical_emergency' | 'antibiotic' | 'analgesic' | 'surgical';
  currentStock: number;
  safeLimit: number;
  unitPrice: number;
  govCapPrice: number;
  expiryDate: string;
  isExpiringSoon: boolean;
  isRestockTriggered: boolean;
  isRecallDispatched: boolean;
}

export interface PriceCapRegulation {
  id: string;
  itemOrService: string;
  category: 'Ambulance' | 'Trauma Room' | 'Emergency Surgery' | 'ICU Daily' | 'Essential Medicine';
  governmentFlatRate: number;
  statutoryReference: string;
  description: string;
}

export interface HospitalViolationRecord {
  id: string;
  hospitalName: string;
  incidentTicket: string;
  itemBilled: string;
  amountCharged: number;
  govtCapRate: number;
  violationExcess: number;
  offenceLevel: 1 | 2 | 3;
  penaltyAction: string;
  date: string;
  status: 'warning_issued' | 'fine_levied' | 'license_suspended';
}
