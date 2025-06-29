import { create } from 'zustand';

const useMedicalStore = create((set, get) => ({
  departments: [
    {
      id: 'general-practice',
      name: 'General Practice',
      icon: 'Stethoscope',
      description: 'Primary healthcare and general medical consultations',
      aiPersonality: 'friendly_professional',
      specialties: ['Primary Care', 'Preventive Medicine', 'Health Screening']
    },
    {
      id: 'cardiology',
      name: 'Cardiology',
      icon: 'Heart',
      description: 'Heart and cardiovascular system specialists',
      aiPersonality: 'expert_caring',
      specialties: ['Heart Disease', 'Hypertension', 'Cardiac Surgery']
    },
    {
      id: 'neurology',
      name: 'Neurology',
      icon: 'Brain',
      description: 'Brain and nervous system disorders',
      aiPersonality: 'analytical_compassionate',
      specialties: ['Stroke', 'Epilepsy', 'Dementia', 'Parkinson\'s']
    },
    {
      id: 'psychology',
      name: 'Psychology',
      icon: 'Users',
      description: 'Mental health and psychological support',
      aiPersonality: 'empathetic_supportive',
      specialties: ['Anxiety', 'Depression', 'Therapy', 'Counseling']
    },
    {
      id: 'pediatrics',
      name: 'Pediatrics',
      icon: 'Baby',
      description: 'Child healthcare and development',
      aiPersonality: 'gentle_nurturing',
      specialties: ['Child Development', 'Vaccinations', 'Pediatric Care']
    },
    {
      id: 'oncology',
      name: 'Oncology',
      icon: 'Shield',
      description: 'Cancer diagnosis, treatment and care',
      aiPersonality: 'compassionate_expert',
      specialties: ['Cancer Treatment', 'Chemotherapy', 'Radiation Therapy']
    },
    {
      id: 'orthopedics',
      name: 'Orthopedics',
      icon: 'Zap',
      description: 'Bone, joint and muscle disorders',
      aiPersonality: 'practical_encouraging',
      specialties: ['Fractures', 'Joint Replacement', 'Sports Injuries']
    },
    {
      id: 'dermatology',
      name: 'Dermatology',
      icon: 'Sun',
      description: 'Skin, hair and nail conditions',
      aiPersonality: 'detail_oriented',
      specialties: ['Acne', 'Skin Cancer', 'Eczema', 'Psoriasis']
    },
    {
      id: 'gynecology',
      name: 'Gynecology',
      icon: 'User',
      description: 'Women\'s reproductive health',
      aiPersonality: 'sensitive_professional',
      specialties: ['Pregnancy', 'Menstrual Health', 'Reproductive Care']
    },
    {
      id: 'emergency',
      name: 'Emergency Medicine',
      icon: 'AlertTriangle',
      description: 'Urgent and emergency medical care',
      aiPersonality: 'urgent_decisive',
      specialties: ['Trauma', 'Emergency Care', 'Critical Conditions']
    }
  ],

  patientRecords: [],
  consultationHistory: [],
  currentConsultation: null,

  addRecord: (record) => {
    set(state => ({
      patientRecords: [...state.patientRecords, {
        ...record,
        id: Math.random().toString(36).substr(2, 9),
        uploadDate: new Date().toISOString()
      }]
    }));
  },

  startConsultation: (departmentId) => {
    const department = get().departments.find(d => d.id === departmentId);
    const consultation = {
      id: Math.random().toString(36).substr(2, 9),
      departmentId,
      departmentName: department?.name,
      startTime: new Date().toISOString(),
      messages: [],
      status: 'active'
    };
    
    set({ currentConsultation: consultation });
    return consultation;
  },

  addMessage: (message) => {
    set(state => ({
      currentConsultation: state.currentConsultation ? {
        ...state.currentConsultation,
        messages: [...state.currentConsultation.messages, {
          ...message,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString()
        }]
      } : null
    }));
  },

  endConsultation: () => {
    const consultation = get().currentConsultation;
    if (consultation) {
      set(state => ({
        consultationHistory: [...state.consultationHistory, {
          ...consultation,
          endTime: new Date().toISOString(),
          status: 'completed'
        }],
        currentConsultation: null
      }));
    }
  },
}));

export default useMedicalStore;