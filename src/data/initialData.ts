import { 
  UserAccount, 
  EmergencyIncident, 
  FirstAidGuide, 
  VolunteerFirstResponder, 
  DigitalHealthPassport, 
  HospitalBed, 
  BloodStock, 
  FIRRecord, 
  MedicineItem, 
  PriceCapRegulation,
  HospitalViolationRecord 
} from '../types';

export const PREBUILT_ACCOUNTS: Record<string, UserAccount> = {
  citizen: {
    id: 'user_alex',
    name: 'Alex Rivera',
    role: 'citizen',
    email: 'alex.rivera@community.org',
    title: 'Citizen & First Aid Responder',
    organization: 'Citizen Network',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 234-8910',
    location: 'Downtown Metro, Block 4'
  },
  hospital: {
    id: 'user_dr_chen',
    name: 'Dr. Sarah Chen, MD',
    role: 'hospital',
    email: 's.chen@stjudetrauma.org',
    title: 'Chief of Emergency & Trauma',
    organization: 'St. Jude Metro Trauma Center',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250',
    badgeNumber: 'STJ-MD-4091',
    phone: '+1 (555) 782-4400',
    location: 'Level 1 Trauma Bay, St. Jude Metro'
  },
  police: {
    id: 'user_inspector_vance',
    name: 'Inspector Marcus Vance',
    role: 'police',
    email: 'm.vance@metropolice.gov',
    title: 'Senior Duty Inspector',
    organization: 'Central Police Precinct (Traffic & Accident Bureau)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    badgeNumber: 'PD-BADGE-8842',
    phone: '+1 (555) 911-0422',
    location: 'Central Precinct, Division 4'
  },
  government: {
    id: 'user_director_rostova',
    name: 'Director Elena Rostova',
    role: 'government',
    email: 'elena.rostova@healthauthority.gov',
    title: 'Chief Compliance Commissioner',
    organization: 'National Health Price Regulatory Board',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    badgeNumber: 'NHPRB-COMM-01',
    phone: '+1 (555) 441-9000',
    location: 'National Regulatory Headquarters'
  }
};

export const INITIAL_CITIZEN_PASSPORT: DigitalHealthPassport = {
  id: 'pass_alex_rivera',
  nationalId: 'NAT-994-1824-A',
  fullName: 'Alex Rivera',
  birthDate: '1992-06-14',
  bloodGroup: 'O+',
  allergies: ['Penicillin (Severe anaphylaxis risk)', 'Sulfa antibiotics'],
  chronicConditions: ['Type 1 Diabetes (Insulin dependent)', 'Mild Exercise-induced Asthma'],
  medications: ['Insulin Glargine 20u nightly', 'Albuterol inhaler PRN'],
  emergencyContacts: [
    { name: 'Elena Rivera', relation: 'Spouse', phone: '+1 (555) 234-8911' },
    { name: 'Dr. Arthur Sterling', relation: 'Primary Physician', phone: '+1 (555) 890-4412' }
  ],
  organDonor: true,
  qrToken: 'HEALTHSOS-PASS-9941824A-O-POS-PENICILLIN-ALLERGY'
};

export const FIRST_AID_GUIDES: FirstAidGuide[] = [
  {
    id: 'cardiac',
    title: 'Heart Attack & Cardiac Arrest (CPR)',
    subtitle: 'Chest pain, collapsed patient, unresponsive or abnormal breathing',
    iconName: 'HeartPulse',
    urgencyLevel: 'Immediate (0-2 min)',
    cprMetronomeApplicable: true,
    steps: [
      {
        stepNumber: 1,
        title: 'Check Responsiveness & Breathing',
        instruction: 'Tap the shoulders firmly and shout loudly: "Are you okay?". Look at their chest for 5 to 10 seconds. If they are not breathing or only gasping, start CPR immediately.',
        warning: 'Do not waste time checking a wrist pulse if you are not medical personnel.',
        actionTip: 'Call out to anyone nearby to bring an Automated External Defibrillator (AED).'
      },
      {
        stepNumber: 2,
        title: 'Position Your Hands on Center of Chest',
        instruction: 'Place the heel of one hand on the center of the chest (lower half of breastbone). Interlock the fingers of your second hand on top. Lock your elbows straight and position your shoulders directly above hands.',
        warning: 'Avoid placing hands too low near the stomach or ribs.'
      },
      {
        stepNumber: 3,
        title: 'Push Hard and Fast (100–120 Beats / Min)',
        instruction: 'Push straight down at least 2 inches (5 cm) deep. Allow complete chest recoil between each push. Maintain a cadence of 100 to 120 compressions per minute.',
        actionTip: 'Turn on our built-in audio metronome below to synchronize your compression rhythm with Stayin Alive.'
      },
      {
        stepNumber: 4,
        title: 'Aspirin Guideline (If Conscious Heart Attack)',
        instruction: 'If the patient is conscious and complaining of crushing chest pain radiating to the left arm or jaw, have them sit down and rest. If they are not allergic and have no active bleeding, offer one adult aspirin (325mg) or four baby aspirins (81mg) to chew slowly.',
        warning: 'Never give aspirin if the person is unconscious or has a known aspirin allergy.'
      }
    ],
    spokenNarration: [
      "Starting CPR protocol. Ensure the person is flat on their back on a firm surface.",
      "Place your hands in the center of their chest, lock your elbows straight.",
      "Push hard and fast, two inches deep, following the metronome cadence at one hundred to one hundred twenty compressions per minute.",
      "Do not stop compressions until the paramedics arrive or an AED is ready to analyze."
    ]
  },
  {
    id: 'trauma_bleeding',
    title: 'Severe Bleeding & Hemorrhage Control',
    subtitle: 'Pulsing or pooling bright red blood from deep cuts or limb trauma',
    iconName: 'Droplets',
    urgencyLevel: 'Immediate (0-2 min)',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Direct, Continuous Firm Pressure',
        instruction: 'Take a sterile cloth, clean towel, or your gloved hands and press down with full body weight directly over the bleeding wound. Maintain uninterrupted pressure.',
        warning: 'Do not remove the initial dressing if it gets soaked with blood. Add more cloth on top and press harder.',
        actionTip: 'Keep the injured limb elevated above the heart level if no fractures are suspected.'
      },
      {
        stepNumber: 2,
        title: 'Pack Deep Wounds',
        instruction: 'For deep puncture or junctional tears, tightly pack clean gauze directly inside the cavity until full, then hold firm two-handed pressure on top.',
        actionTip: 'Never remove foreign objects like glass or knives lodged in the wound—bandage around them.'
      },
      {
        stepNumber: 3,
        title: 'Tourniquet Application (Limbs Only)',
        instruction: 'If severe limb bleeding does not stop with direct pressure, place a commercial tourniquet or improvised cloth strip 2 to 3 inches above the wound (between the wound and the heart, avoiding joints). Tighten until the bright red bleeding stops.',
        warning: 'Mark the exact time of tourniquet application clearly on the patient forehead (e.g., "TK 14:20"). Once applied, never loosen it yourself.',
        actionTip: 'Tourniquets save lives in severe arterial bleeds. Paramedics will remove it in the operating theater.'
      },
      {
        stepNumber: 4,
        title: 'Keep Patient Warm & Prevent Shock',
        instruction: 'Cover the person with a blanket or jacket to maintain core body temperature. Reassure them gently and keep them lying flat with legs slightly elevated if conscious.',
        warning: 'Do not give food or drink even if they feel thirsty, as emergency surgery may be required.'
      }
    ],
    spokenNarration: [
      "Severe bleeding protocol activated. Apply continuous, heavy direct pressure right over the wound.",
      "If blood is spurting from an arm or leg and pressure does not stop it, apply a tourniquet two to three inches above the injury.",
      "Tighten until the bleeding ceases. Note the exact time applied.",
      "Keep the patient warm to combat traumatic shock while help is en route."
    ]
  },
  {
    id: 'choking',
    title: 'Choking & Airway Obstruction',
    subtitle: 'Silent coughing, inability to speak, universal hands-to-throat sign',
    iconName: 'ShieldAlert',
    urgencyLevel: 'Immediate (0-2 min)',
    steps: [
      {
        stepNumber: 1,
        title: 'Confirm Choking & Encourage Coughing',
        instruction: 'Ask: "Are you choking?". If they can speak or cough loudly, encourage them to keep coughing forcefully. If they nod and cannot make any sound, act immediately.',
        actionTip: 'Stand to the side and slightly behind the victim.'
      },
      {
        stepNumber: 2,
        title: 'Deliver 5 Sharp Back Blows',
        instruction: 'Lean the person forward so their chest is parallel to the ground. Use the heel of your hand to strike firmly between their shoulder blades five times.',
        actionTip: 'Gravity will help dislodge the foreign object outward.'
      },
      {
        stepNumber: 3,
        title: 'Deliver 5 Abdominal Thrusts (Heimlich)',
        instruction: 'Wrap your arms around their waist. Make a fist with one hand and place the thumb side just above the navel (well below breastbone). Grasp your fist with your other hand and give rapid upward, inward thrusts.',
        warning: 'For pregnant women or large individuals, place hands on the center of breastbone and give chest thrusts instead.'
      },
      {
        stepNumber: 4,
        title: 'If Patient Becomes Unresponsive',
        instruction: 'Carefully lower them to the floor. Call emergency services and begin CPR chest compressions. Look in the mouth before breaths—remove visible foreign object only if loose.',
        warning: 'Never perform blind finger sweeps as this can push the object deeper down the airway.'
      }
    ],
    spokenNarration: [
      "Choking protocol. Lean the person forward and give five sharp blows between the shoulder blades with the heel of your hand.",
      "If not cleared, stand behind them, place your fist just above the navel, and pull sharply upward and inward five times.",
      "Repeat alternating five back blows and five thrusts until the airway is clear."
    ]
  },
  {
    id: 'fracture',
    title: 'Broken Bones & Fracture Stabilization',
    subtitle: 'Deformity, severe swelling, bone piercing skin, or inability to bear weight',
    iconName: 'Bone',
    urgencyLevel: 'Urgent (5-10 min)',
    steps: [
      {
        stepNumber: 1,
        title: 'Immobilize the Injured Area',
        instruction: 'Support the limb in the position found. Do not attempt to realign, push bones back in, or straighten a deformed bone.',
        warning: 'Movement can cause severe vascular and nerve damage.'
      },
      {
        stepNumber: 2,
        title: 'Apply an Improvised Splint',
        instruction: 'Fasten rolled magazines, cardboard, or a wooden stick on either side of the limb using bandages or cloth. Secure the joint above and the joint below the injury.',
        actionTip: 'Do not tie so tightly that it cuts off blood circulation (check that fingers or toes remain warm and pink).'
      },
      {
        stepNumber: 3,
        title: 'Control Bleeding (Open Fractures)',
        instruction: 'If bone has broken through the skin, cover the wound with a clean sterile dressing. Apply gentle pressure around the bone to stop bleeding, but never press directly on the exposed bone.',
        warning: 'Do not wash or probe deep open bone wounds.'
      },
      {
        stepNumber: 4,
        title: 'Apply Ice Pack & Elevate Gently',
        instruction: 'Apply a cloth-wrapped ice pack around the swollen area for 15 minutes at a time to minimize swelling and alleviate pain.',
        actionTip: 'Never apply bare ice directly onto the skin.'
      }
    ],
    spokenNarration: [
      "Fracture stabilization protocol. Keep the injured limb completely still in the exact position found.",
      "Do not attempt to straighten broken bones. Support joints above and below the break.",
      "Cover any open wound with clean cloth and apply ice wrapped in a towel to reduce swelling."
    ]
  },
  {
    id: 'burn',
    title: 'Burns & Scalds',
    subtitle: 'Thermal, electrical, or chemical burn with blistering or reddened skin',
    iconName: 'Flame',
    urgencyLevel: 'Critical (2-5 min)',
    steps: [
      {
        stepNumber: 1,
        title: 'Cool with Running Tap Water (20 Minutes)',
        instruction: 'Immediately hold the burned area under cool running tap water for at least 20 minutes. This draws heat out of deep tissue and halts damage progression.',
        warning: 'Never use ice, icy water, toothpaste, butter, or greasy ointments. They trap heat and increase infection.',
        actionTip: 'Begin cooling as soon as possible—cooling is effective up to 3 hours post-injury.'
      },
      {
        stepNumber: 2,
        title: 'Remove Jewelry & Tight Clothing',
        instruction: 'Gently remove rings, watches, bracelets, and belts near the burn before swelling begins.',
        warning: 'Do not pull off clothing that is melted or stuck to the burn tissue. Cut around it instead.'
      },
      {
        stepNumber: 3,
        title: 'Cover with Clean Plastic Film or Sterile Dressing',
        instruction: 'Loosely wrap clean cling film or a sterile non-adherent dressing over the burn to keep out air and relieve pain.',
        actionTip: 'Cling wrap is ideal because it does not stick to burned skin and protects nerve endings.'
      }
    ],
    spokenNarration: [
      "Burn treatment protocol. Immediately cool the burn under gently running tap water for twenty minutes.",
      "Remove rings and constrictive jewelry quickly before swelling starts.",
      "Do not use ice or butter. Cover loosely with clean plastic wrap or non-stick dressing."
    ]
  },
  {
    id: 'seizure',
    title: 'Seizure & Convulsion Response',
    subtitle: 'Uncontrolled shaking, sudden stiffness, foaming at mouth, loss of consciousness',
    iconName: 'Activity',
    urgencyLevel: 'Immediate (0-2 min)',
    steps: [
      {
        stepNumber: 1,
        title: 'Protect the Head & Clear Surrounding Danger',
        instruction: 'Place a soft jacket, pillow, or folded clothing gently beneath their head. Move hard, sharp objects, tables, or glass away to prevent head trauma.',
        warning: 'Never hold them down or restrain their jerky movements.'
      },
      {
        stepNumber: 2,
        title: 'DO NOT Put Anything In Their Mouth',
        instruction: 'It is physically impossible to swallow one\'s tongue. Inserting fingers, spoons, or objects can break teeth or choke the person.',
        actionTip: 'Loosen tight neckties, scarves, or collar buttons.'
      },
      {
        stepNumber: 3,
        title: 'Time the Seizure & Roll to Recovery Position',
        instruction: 'Look at a watch to note the duration. As soon as the active shaking stops, gently turn the patient onto their side into the recovery position to keep their airway clear of saliva or vomit.',
        warning: 'If the seizure lasts longer than 5 minutes, or a second seizure starts without regaining consciousness, it is a medical emergency.'
      }
    ],
    spokenNarration: [
      "Seizure protocol. Cushion the person's head with a soft item and clear away dangerous objects.",
      "Do not restrain them and never put anything inside their mouth.",
      "Time the duration. When shaking ceases, gently turn them onto their side into the recovery position."
    ]
  }
];

export const INITIAL_VOLUNTEERS: VolunteerFirstResponder[] = [
  {
    id: 'vol_1',
    name: 'Nurse David Kalu',
    qualifications: 'Registered Emergency Nurse, BLS Certified',
    distanceMeters: 280,
    phone: '+1 (555) 301-4491',
    status: 'responding',
    etaMinutes: 2
  },
  {
    id: 'vol_2',
    name: 'Maya Lin',
    qualifications: 'Red Cross Volunteer & Combat Medic Veteran',
    distanceMeters: 450,
    phone: '+1 (555) 772-9912',
    status: 'responding',
    etaMinutes: 3
  },
  {
    id: 'vol_3',
    name: 'Paramedic Intern Liam Scott',
    qualifications: 'Advanced First Aid, CPR Instructor',
    distanceMeters: 800,
    phone: '+1 (555) 604-1299',
    status: 'available',
    etaMinutes: 6
  }
];

export const INITIAL_INCIDENTS: EmergencyIncident[] = [
  {
    id: 'inc_8921',
    ticketNumber: 'SOS-2026-8921',
    reporterName: 'Alex Rivera',
    reporterPhone: '+1 (555) 234-8910',
    category: 'road_accident',
    title: 'Two-Car Collision with Pedestrian Injury',
    description: 'Sedan collided with delivery scooter at pedestrian crosswalk. Rider has deep laceration on right thigh and suspected left leg fracture. Conscious but disoriented.',
    location: {
      address: 'Intersection of 5th Ave & Pine St, Metro District',
      coordinates: '40.7128° N, 74.0060° W',
      landmark: 'Opposite Central Park Pavilion'
    },
    severity: 'critical',
    status: 'patient_en_route',
    reportedAt: new Date(Date.now() - 14 * 60000).toISOString(),
    isOfflineMeshRouted: false,
    meshHops: 0,
    assignedAmbulance: {
      vehicleNumber: 'AMB-MEDIC-04',
      driverName: 'Robert Gomez',
      driverPhone: '+1 (555) 819-2041',
      currentEtaMinutes: 3,
      paramedicNote: 'Tourniquet applied on right thigh; bleeding arrested. Splint on left tib-fib. IV saline running.'
    },
    assignedHospitalId: 'st_jude_metro',
    assignedBedId: 'bed_tb_01',
    patientPassportId: 'pass_alex_rivera',
    firId: 'fir_pd_2026_0442',
    bloodReservationId: 'blood_res_01',
    insurancePreApproval: {
      provider: 'Metro BlueShield Health',
      policyNumber: 'MBS-990-2184',
      status: 'pre_approved',
      coverageAmount: 25000,
      clearedAt: new Date(Date.now() - 10 * 60000).toISOString()
    },
    billing: {
      baseFareAmbulance: 80,
      traumaAdmission: 150,
      surgeryFee: 1200,
      medicineTotal: 185,
      totalAmount: 1615,
      isPriceCapCompliant: true,
      status: 'draft'
    },
    dischargeStatus: {
      healthChartCleared: true,
      doctorSigned: true,
      policeFIRCleared: false, // Locked awaiting police sign-off!
      billingCleared: true,
      isFullyDischarged: false
    }
  },
  {
    id: 'inc_8922',
    ticketNumber: 'SOS-2026-8922',
    reporterName: 'Marcus Hall (Bystander)',
    reporterPhone: '+1 (555) 441-2900',
    category: 'cardiac',
    title: 'Elderly Shopper Collapsed at Market',
    description: '64-year-old male sudden collapse in produce aisle. Bystander initiated CPR with HealthSOS spoken audio guide.',
    location: {
      address: '74 Market Street, West End',
      coordinates: '40.7182° N, 74.0012° W',
      landmark: 'Near West End Supermarket'
    },
    severity: 'critical',
    status: 'ambulance_dispatched',
    reportedAt: new Date(Date.now() - 5 * 60000).toISOString(),
    isOfflineMeshRouted: true,
    meshHops: 3,
    assignedAmbulance: {
      vehicleNumber: 'AMB-MEDIC-09',
      driverName: 'Officer Carla Rossi',
      driverPhone: '+1 (555) 902-1818',
      currentEtaMinutes: 2,
      paramedicNote: 'AED brought on scene by volunteer. Heart rhythm stabilized.'
    },
    assignedHospitalId: 'st_jude_metro',
    assignedBedId: 'bed_icu_02',
    insurancePreApproval: {
      provider: 'National Medicare Advantage',
      policyNumber: 'NMA-551-0941',
      status: 'pre_approved',
      coverageAmount: 40000,
      clearedAt: new Date(Date.now() - 3 * 60000).toISOString()
    },
    billing: {
      baseFareAmbulance: 80,
      traumaAdmission: 150,
      surgeryFee: 0,
      medicineTotal: 140,
      totalAmount: 370,
      isPriceCapCompliant: true,
      status: 'draft'
    },
    dischargeStatus: {
      healthChartCleared: false,
      doctorSigned: false,
      policeFIRCleared: true, // Non-criminal medical event
      billingCleared: false,
      isFullyDischarged: false
    }
  }
];

export const INITIAL_HOSPITAL_BEDS: HospitalBed[] = [
  {
    id: 'bed_tb_01',
    bedCode: 'TRAUMA-BAY-01',
    type: 'trauma_bay',
    label: 'Resuscitation & Major Trauma Bay 1',
    isOccupied: true,
    assignedIncidentTicket: 'SOS-2026-8921',
    patientName: 'Alex Rivera (Incoming Trauma)',
    admittedAt: 'Reserved while in Ambulance'
  },
  {
    id: 'bed_tb_02',
    bedCode: 'TRAUMA-BAY-02',
    type: 'trauma_bay',
    label: 'Resuscitation & Major Trauma Bay 2',
    isOccupied: false
  },
  {
    id: 'bed_icu_01',
    bedCode: 'ICU-CRIT-01',
    type: 'icu_critical',
    label: 'Cardiothoracic ICU Bed 1',
    isOccupied: true,
    assignedIncidentTicket: 'SOS-PREV-8812',
    patientName: 'Harold Vance',
    admittedAt: '2026-09-13 18:30'
  },
  {
    id: 'bed_icu_02',
    bedCode: 'ICU-CRIT-02',
    type: 'icu_critical',
    label: 'Cardiothoracic ICU Bed 2',
    isOccupied: true,
    assignedIncidentTicket: 'SOS-2026-8922',
    patientName: 'Marcus Hall (Cardiac Incoming)',
    admittedAt: 'Reserved via Dispatch'
  },
  {
    id: 'bed_opd_01',
    bedCode: 'OPD-EMERG-01',
    type: 'opd_emergency',
    label: 'Fast-Track OPD Minor Injury Bed 1',
    isOccupied: false
  },
  {
    id: 'bed_opd_02',
    bedCode: 'OPD-EMERG-02',
    type: 'opd_emergency',
    label: 'Fast-Track OPD Minor Injury Bed 2',
    isOccupied: false
  }
];

export const INITIAL_BLOOD_STOCKS: BloodStock[] = [
  {
    id: 'blood_01',
    bankName: 'St. Jude Metro Blood & Organ Bank',
    bloodGroup: 'O+',
    unitsAvailable: 28,
    reservedUnits: 4,
    lastUpdated: '10 mins ago',
    address: '400 Medical Blvd, Wing B',
    distanceKm: 0.2
  },
  {
    id: 'blood_02',
    bankName: 'St. Jude Metro Blood & Organ Bank',
    bloodGroup: 'O-',
    unitsAvailable: 8,
    reservedUnits: 2,
    lastUpdated: '5 mins ago',
    address: '400 Medical Blvd, Wing B',
    distanceKm: 0.2
  },
  {
    id: 'blood_03',
    bankName: 'Central Red Cross Blood Depot',
    bloodGroup: 'A+',
    unitsAvailable: 34,
    reservedUnits: 1,
    lastUpdated: '15 mins ago',
    address: '12 Civic Plaza',
    distanceKm: 2.1
  },
  {
    id: 'blood_04',
    bankName: 'Central Red Cross Blood Depot',
    bloodGroup: 'B+',
    unitsAvailable: 22,
    reservedUnits: 0,
    lastUpdated: '20 mins ago',
    address: '12 Civic Plaza',
    distanceKm: 2.1
  },
  {
    id: 'blood_05',
    bankName: 'City Memorial Transfusion Center',
    bloodGroup: 'AB+',
    unitsAvailable: 14,
    reservedUnits: 0,
    lastUpdated: '35 mins ago',
    address: '88 Harbor Way',
    distanceKm: 4.8
  },
  {
    id: 'blood_06',
    bankName: 'City Memorial Transfusion Center',
    bloodGroup: 'AB-',
    unitsAvailable: 6,
    reservedUnits: 1,
    lastUpdated: '40 mins ago',
    address: '88 Harbor Way',
    distanceKm: 4.8
  }
];

export const INITIAL_FIRS: FIRRecord[] = [
  {
    id: 'fir_pd_2026_0442',
    firNumber: 'FIR-2026-CR-0442',
    incidentId: 'inc_8921',
    incidentTicket: 'SOS-2026-8921',
    incidentType: 'Road Traffic Accident (Vehicular Collision with Pedestrian Injury)',
    location: 'Intersection of 5th Ave & Pine St, Metro District',
    timestamp: new Date(Date.now() - 14 * 60000).toISOString(),
    vehiclesInvolved: 'Sedan Plate #NYC-8821 (Grey Toyota Camry) & Courier Scooter #SC-401',
    driverDetails: 'Driver: Thomas Miller, DL #DL-94921-NY (Tested 0.00% BAC on scene)',
    victimDetails: 'Pedestrian / Rider: Alex Rivera (Passport #NAT-994-1824-A)',
    witnessStatement: 'Witness bystander reported Sedan was turning left on yellow when scooter was proceeding straight. Dashcam footage seized.',
    preliminaryNotes: 'Accidental collision without felony hit-and-run intent. Mutual insurance intake opened. Strict medical discharge hold placed until police digital verification.',
    status: 'pending_review',
    policeStation: 'Precinct 4 Central Traffic Bureau'
  }
];

export const INITIAL_MEDICINES: MedicineItem[] = [
  {
    id: 'med_01',
    name: 'Epinephrine Auto-Injector 0.3mg',
    genericName: 'Adrenaline Injection',
    batchNumber: 'EPN-2025-B88',
    category: 'critical_emergency',
    currentStock: 14,
    safeLimit: 25, // Below safe limit! Restock trigger
    unitPrice: 15,
    govCapPrice: 15,
    expiryDate: '2026-10-15',
    isExpiringSoon: true, // Expiring in < 35 days!
    isRestockTriggered: false,
    isRecallDispatched: false
  },
  {
    id: 'med_02',
    name: 'Normal Saline IV 0.9% 1000ml',
    genericName: 'Sodium Chloride Solution',
    batchNumber: 'SLN-2026-K12',
    category: 'critical_emergency',
    currentStock: 48,
    safeLimit: 40,
    unitPrice: 8,
    govCapPrice: 8,
    expiryDate: '2027-12-30',
    isExpiringSoon: false,
    isRestockTriggered: false,
    isRecallDispatched: false
  },
  {
    id: 'med_03',
    name: 'Heparin Sodium 5,000 IU/mL',
    genericName: 'Heparin Anticoagulant',
    batchNumber: 'HEP-2025-X09',
    category: 'critical_emergency',
    currentStock: 9,
    safeLimit: 20,
    unitPrice: 22,
    govCapPrice: 22,
    expiryDate: '2026-09-28', // Expiring in 2 weeks!
    isExpiringSoon: true,
    isRestockTriggered: false,
    isRecallDispatched: false
  },
  {
    id: 'med_04',
    name: 'Tranexamic Acid (TXA) 1000mg IV',
    genericName: 'Antifibrinolytic Hemostatic',
    batchNumber: 'TXA-2026-M44',
    category: 'critical_emergency',
    currentStock: 35,
    safeLimit: 20,
    unitPrice: 18,
    govCapPrice: 18,
    expiryDate: '2027-08-14',
    isExpiringSoon: false,
    isRestockTriggered: false,
    isRecallDispatched: false
  },
  {
    id: 'med_05',
    name: 'Ceftriaxone 1g Injectable',
    genericName: 'Broad-Spectrum Cephalosporin',
    batchNumber: 'CTX-2025-R71',
    category: 'antibiotic',
    currentStock: 60,
    safeLimit: 30,
    unitPrice: 12,
    govCapPrice: 12,
    expiryDate: '2026-10-02', // Expiring soon
    isExpiringSoon: true,
    isRestockTriggered: false,
    isRecallDispatched: false
  }
];

export const INITIAL_PRICE_CAPS: PriceCapRegulation[] = [
  {
    id: 'cap_01',
    itemOrService: 'Emergency Ambulance Base Dispatch & ALS Triage',
    category: 'Ambulance',
    governmentFlatRate: 80,
    statutoryReference: 'Govt Gazette Regulation #EA-2025-Sec4',
    description: 'Mandatory standard rate covering fuel, advanced paramedic crew, ECG telemetry, and oxygen.'
  },
  {
    id: 'cap_02',
    itemOrService: 'Level 1 Trauma Resuscitation Bay Intake (First 6 Hours)',
    category: 'Trauma Room',
    governmentFlatRate: 150,
    statutoryReference: 'Govt Health Directive #TH-401',
    description: 'Covers trauma team activation, sterile bay setup, monitoring telemetry, and attending physician evaluation.'
  },
  {
    id: 'cap_03',
    itemOrService: 'Emergency Orthopedic Fracture Reduction / Surgery Base',
    category: 'Emergency Surgery',
    governmentFlatRate: 1200,
    statutoryReference: 'National Tariff Schedule #SURG-8802',
    description: 'Capped rate for emergency surgical stabilization, fluoroscopy, and anesthesiology.'
  },
  {
    id: 'cap_04',
    itemOrService: 'Intensive Care Unit (ICU) Critical Bed per 24 Hours',
    category: 'ICU Daily',
    governmentFlatRate: 500,
    statutoryReference: 'Critical Care Price Standardization #ICU-99',
    description: 'All-inclusive daily rate for ventilator, continuous vital monitoring, and critical care nursing.'
  },
  {
    id: 'cap_05',
    itemOrService: 'Epinephrine 0.3mg Emergency Dose',
    category: 'Essential Medicine',
    governmentFlatRate: 15,
    statutoryReference: 'Essential Drug Ceiling List #ED-109',
    description: 'Zero markup permitted above statutory ceiling.'
  }
];

export const INITIAL_VIOLATIONS: HospitalViolationRecord[] = [
  {
    id: 'viol_01',
    hospitalName: 'Mercy Heights Private Hospital',
    incidentTicket: 'SOS-2026-7819',
    itemBilled: 'Trauma Bay Intake (Charged $450 vs $150 cap)',
    amountCharged: 450,
    govtCapRate: 150,
    violationExcess: 300,
    offenceLevel: 1,
    penaltyAction: 'Automated Warning Letter issued & Public Compliance Warning Flag added to profile',
    date: '2026-09-10',
    status: 'warning_issued'
  }
];
