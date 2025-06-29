import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiChevronDown, FiChevronUp, FiSearch, FiHelpCircle, FiMessageSquare, FiShield, FiHeart, FiUsers, FiClock, FiFileText} = FiIcons;

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      id: 'general',
      name: 'General',
      icon: FiHelpCircle,
      color: 'text-blue-600'
    },
    {
      id: 'consultations',
      name: 'AI Consultations',
      icon: FiMessageSquare,
      color: 'text-green-600'
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: FiShield,
      color: 'text-red-600'
    },
    {
      id: 'medical',
      name: 'Medical Services',
      icon: FiHeart,
      color: 'text-pink-600'
    },
    {
      id: 'accounts',
      name: 'Accounts & Billing',
      icon: FiUsers,
      color: 'text-purple-600'
    },
    {
      id: 'technical',
      name: 'Technical Support',
      icon: FiClock,
      color: 'text-orange-600'
    }
  ];

  const faqs = {
    general: [
      {
        id: 'what-is-mediverse',
        question: 'What is MediVerse AI?',
        answer: 'MediVerse AI is a comprehensive AI-powered healthcare platform that provides instant access to 70+ medical specialties through advanced artificial intelligence. Our platform offers 24/7 medical consultations, health record management, appointment scheduling, and personalized health analytics, all designed to make healthcare more accessible and efficient.'
      },
      {
        id: 'how-it-works',
        question: 'How does MediVerse AI work?',
        answer: 'MediVerse AI works by connecting you with specialized AI doctors trained in various medical fields. Simply create an account, complete your health profile, choose a medical specialty, and start chatting with our AI specialists via text or voice. Our AI analyzes your symptoms, medical history, and provides personalized recommendations, prescriptions, and referrals when needed.'
      },
      {
        id: 'available-specialties',
        question: 'What medical specialties are available?',
        answer: 'We offer 70+ medical specialties including General Practice, Cardiology, Neurology, Psychology, Pediatrics, Oncology, Orthopedics, Dermatology, Gynecology, Emergency Medicine, Psychiatry, Ophthalmology, ENT, Gastroenterology, Endocrinology, Rheumatology, Urology, and many more. Each specialty has dedicated AI doctors trained specifically in that field.'
      },
      {
        id: 'cost-pricing',
        question: 'How much does MediVerse AI cost?',
        answer: 'MediVerse AI offers flexible pricing plans: Free tier includes basic consultations and health record storage. Premium plans start at $29/month for unlimited consultations, advanced analytics, and priority support. Family plans are available for $79/month covering up to 6 family members. We also accept most insurance plans and offer pay-per-consultation options.'
      },
      {
        id: 'real-doctors',
        question: 'Are these real doctors or just AI?',
        answer: 'Our AI specialists are advanced artificial intelligence systems trained on vast medical databases and supervised by licensed physicians. While they provide medical guidance based on the latest medical knowledge, they work in collaboration with human doctors who review complex cases. For critical conditions, you\'ll be directed to human specialists or emergency services.'
      }
    ],
    consultations: [
      {
        id: 'start-consultation',
        question: 'How do I start a consultation?',
        answer: 'Starting a consultation is simple: 1) Log into your MediVerse AI account, 2) Browse our medical departments and select the appropriate specialty, 3) Click "Start Consultation" to begin chatting with the AI specialist, 4) Describe your symptoms or health concerns, 5) Follow the AI\'s questions and recommendations. Consultations are available 24/7 with instant responses.'
      },
      {
        id: 'consultation-types',
        question: 'What types of consultations are available?',
        answer: 'We offer various consultation types: Text-based chat for general inquiries, Voice consultations for detailed discussions, Video calls for visual examinations, Emergency consultations for urgent care, Follow-up appointments for ongoing treatment, Second opinion consultations, Prescription renewals, Lab result reviews, and Mental health counseling sessions.'
      },
      {
        id: 'consultation-length',
        question: 'How long do consultations typically last?',
        answer: 'Consultation length varies by complexity: Quick questions: 2-5 minutes, General consultations: 10-15 minutes, Comprehensive evaluations: 20-30 minutes, Mental health sessions: 30-45 minutes, Emergency consultations: Immediate response with ongoing support. There\'s no time limit - our AI specialists will spend as much time as needed to address your concerns thoroughly.'
      },
      {
        id: 'emergency-situations',
        question: 'Can I use MediVerse AI for medical emergencies?',
        answer: 'MediVerse AI has a dedicated Emergency Medicine department for urgent care, but for life-threatening emergencies, always call 112 immediately. Our emergency AI can help with urgent situations like severe pain, breathing difficulties, chest pain, or mental health crises. The system will triage your emergency and provide immediate guidance while directing you to appropriate emergency services when necessary.'
      },
      {
        id: 'prescription-medication',
        question: 'Can AI doctors prescribe medications?',
        answer: 'Yes, our AI specialists can prescribe medications when appropriate. They can issue digital prescriptions for common conditions, renew existing medications, adjust dosages based on your response, and provide over-the-counter recommendations. All prescriptions are reviewed by licensed physicians and sent directly to your preferred pharmacy. Controlled substances require additional verification steps.'
      },
      {
        id: 'follow-up-care',
        question: 'What about follow-up care and ongoing treatment?',
        answer: 'MediVerse AI provides comprehensive follow-up care: Automated appointment reminders, Progress tracking and monitoring, Medication adherence alerts, Treatment plan adjustments, Regular health check-ins, Specialist referrals when needed, Care coordination between different specialties, and Long-term health management for chronic conditions.'
      }
    ],
    security: [
      {
        id: 'data-security',
        question: 'How secure is my medical data?',
        answer: 'Your medical data is protected with bank-level security: End-to-end encryption for all communications, HIPAA-compliant data storage, SOC 2 Type II certified infrastructure, Multi-factor authentication, Regular security audits and penetration testing, Zero-knowledge architecture ensuring even we cannot access your unencrypted data, and Compliance with GDPR, CCPA, and other privacy regulations.'
      },
      {
        id: 'data-sharing',
        question: 'Who has access to my medical information?',
        answer: 'Your medical information access is strictly controlled: Only you have full access to your medical records, AI specialists access only relevant information during consultations, Licensed physicians review complex cases when necessary, Emergency contacts can access limited information if authorized, Healthcare providers you explicitly share data with, and Legal authorities only with proper warrants. We never sell or share your data with third parties.'
      },
      {
        id: 'data-storage',
        question: 'Where is my data stored and for how long?',
        answer: 'Your data is stored in secure, encrypted servers: Primary storage in HIPAA-compliant data centers, Backup copies in geographically distributed locations, Data retention for 7 years as required by medical regulations, Right to data deletion upon request (subject to legal requirements), Regular data purging of unnecessary information, and Audit trails for all data access and modifications.'
      },
      {
        id: 'privacy-controls',
        question: 'What privacy controls do I have?',
        answer: 'You have comprehensive privacy controls: Granular permission settings for data sharing, Ability to hide specific medical conditions, Control over which specialists can access what information, Export your data at any time, Delete your account and associated data, Opt-out of research participation, Control communication preferences, and Manage family member access permissions.'
      },
      {
        id: 'hipaa-compliance',
        question: 'Is MediVerse AI HIPAA compliant?',
        answer: 'Yes, MediVerse AI is fully HIPAA compliant: Signed Business Associate Agreements with all vendors, Regular compliance audits and assessments, Staff trained on HIPAA requirements, Secure data transmission and storage protocols, Incident response procedures for any breaches, Patient rights documentation and procedures, and Regular updates to maintain compliance with evolving regulations.'
      }
    ],
    medical: [
      {
        id: 'ai-accuracy',
        question: 'How accurate are the AI medical diagnoses?',
        answer: 'Our AI systems achieve high accuracy rates: 94-97% accuracy across different medical specialties, Trained on millions of medical cases and research papers, Continuously learning from new medical literature, Validated against human physician diagnoses, Regular performance monitoring and improvement, Built-in confidence scoring for recommendations, and Escalation to human doctors for complex or uncertain cases.'
      },
      {
        id: 'medical-conditions',
        question: 'What medical conditions can MediVerse AI help with?',
        answer: 'MediVerse AI can help with a wide range of conditions: Common illnesses (cold, flu, infections), Chronic diseases (diabetes, hypertension, asthma), Mental health (anxiety, depression, stress), Skin conditions (acne, rashes, moles), Digestive issues, Cardiovascular problems, Neurological symptoms, Pediatric health concerns, Women\'s health issues, Men\'s health, Preventive care, and Health maintenance.'
      },
      {
        id: 'serious-conditions',
        question: 'Can MediVerse AI handle serious medical conditions?',
        answer: 'For serious conditions, MediVerse AI provides initial assessment and guidance: Symptom evaluation and risk assessment, Treatment recommendations for manageable conditions, Referrals to human specialists when needed, Coordination with your existing healthcare providers, Emergency protocol activation for critical cases, Second opinion consultations, Support for chronic disease management, and Treatment plan monitoring and adjustments.'
      },
      {
        id: 'lab-results',
        question: 'Can I upload and discuss lab results?',
        answer: 'Yes, you can easily upload and discuss lab results: Upload photos or PDF files of lab reports, AI analysis of results with explanations, Trend tracking over time, Comparison with normal ranges, Treatment recommendations based on results, Integration with your health profile, Alerts for concerning values, and Coordination with prescribing medications or lifestyle changes.'
      },
      {
        id: 'medical-records',
        question: 'How does MediVerse AI integrate with my existing medical records?',
        answer: 'MediVerse AI seamlessly integrates with your medical history: Import records from other healthcare providers, OCR scanning of paper documents, Integration with major EHR systems, Automatic organization and categorization, Timeline view of your medical history, Search functionality across all records, Summary reports for other doctors, and Portable medical record exports in standard formats.'
      }
    ],
    accounts: [
      {
        id: 'create-account',
        question: 'How do I create an account?',
        answer: 'Creating an account is quick and easy: Visit mediverse-ai.com and click "Get Started", Enter your basic information (name, email, phone), Verify your email address, Complete your health profile with medical history, Set up security preferences and emergency contacts, Choose your subscription plan, Add payment information if selecting a paid plan, and Start using MediVerse AI immediately.'
      },
      {
        id: 'family-accounts',
        question: 'Can I create accounts for family members?',
        answer: 'Yes, family account management is available: Primary account holder can add family members, Separate profiles for each family member, Age-appropriate interfaces for children, Parental controls for minors, Shared billing for all family members, Individual privacy settings for each member, Emergency access between family members, and Family health insights and reports.'
      },
      {
        id: 'billing-subscription',
        question: 'How does billing and subscription work?',
        answer: 'Our billing system is transparent and flexible: Monthly or annual subscription options, Free tier with basic features available, Premium plans with advanced features, Family plans for multiple users, Pay-per-consultation options available, Insurance billing and reimbursement support, Automatic billing with easy cancellation, Detailed billing statements and usage reports.'
      },
      {
        id: 'insurance-coverage',
        question: 'Does insurance cover MediVerse AI consultations?',
        answer: 'Many insurance plans cover telehealth services: We accept most major insurance providers, Direct billing to insurance companies, HSA/FSA payment options available, Reimbursement assistance for out-of-network plans, Detailed receipts for insurance submission, Prior authorization handling when required, and Coverage verification before consultations.'
      },
      {
        id: 'cancel-account',
        question: 'How do I cancel my subscription or delete my account?',
        answer: 'Account management is straightforward: Cancel subscription anytime from account settings, No cancellation fees or penalties, Access continues until end of billing period, Data export available before account closure, Account deletion removes all personal data, Medical records retained as required by law, Easy reactivation if you change your mind, and Full refund policy for unused services.'
      }
    ],
    technical: [
      {
        id: 'supported-devices',
        question: 'What devices and browsers are supported?',
        answer: 'MediVerse AI works on all modern devices: Web browsers: Chrome, Firefox, Safari, Edge (latest versions), Mobile apps for iOS (iPhone/iPad) and Android, Tablet-optimized interfaces, Desktop applications for Windows and Mac, Smart TV apps for telemedicine, Voice assistants integration, and Accessibility features for users with disabilities.'
      },
      {
        id: 'internet-requirements',
        question: 'What are the internet requirements?',
        answer: 'Minimal internet requirements for optimal experience: Text chat: Any internet connection, Voice calls: 1 Mbps upload/download, Video consultations: 3 Mbps upload/download, File uploads: Stable connection recommended, Offline mode for viewing downloaded records, Automatic quality adjustment for slower connections, and Data usage optimization features.'
      },
      {
        id: 'technical-issues',
        question: 'What if I experience technical issues?',
        answer: 'Comprehensive technical support is available: 24/7 technical support chat, Video troubleshooting sessions, Remote assistance for complex issues, Detailed help documentation and tutorials, Community forums for peer support, Regular app updates and bug fixes, System status page for service monitoring, and Multiple contact methods (chat, email, phone).'
      },
      {
        id: 'app-features',
        question: 'What features are available in the mobile app?',
        answer: 'Our mobile app includes all web features plus: Push notifications for appointments and messages, Offline access to medical records, Camera integration for uploading documents, Voice consultations with high-quality audio, Biometric login (fingerprint/face ID), Health data integration (Apple Health, Google Fit), GPS location for emergency services, and Optimized mobile interface for touch interactions.'
      },
      {
        id: 'data-sync',
        question: 'How does data sync across devices?',
        answer: 'Seamless data synchronization across all devices: Real-time sync of all medical records, Consultation history available everywhere, Medication reminders sync across devices, Appointment notifications on all devices, Secure cloud backup and restoration, Offline changes sync when reconnected, Cross-platform compatibility maintained, and Conflict resolution for simultaneous edits.'
      },
      {
        id: 'system-maintenance',
        question: 'When does system maintenance occur?',
        answer: 'Minimal disruption maintenance schedule: Scheduled maintenance during off-peak hours (2-4 AM local time), Advance notifications for planned downtime, Emergency maintenance as needed with immediate alerts, 99.9% uptime guarantee, Redundant systems to minimize service interruption, Regional failover capabilities, Status updates during maintenance, and Priority restoration for emergency services.'
      }
    ]
  };

  const filteredFAQs = faqs[activeCategory]?.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about MediVerse AI, our AI-powered healthcare platform
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.1}}
        className="relative mb-8"
      >
        <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search FAQ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-transparent text-lg"
        />
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Category Sidebar */}
        <motion.div
          initial={{opacity: 0, x: -20}}
          animate={{opacity: 1, x: 0}}
          transition={{delay: 0.2}}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
            <div className="space-y-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeCategory === category.id
                      ? 'bg-medical-100 text-medical-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <SafeIcon icon={category.icon} className={category.color} />
                  <span>{category.name}</span>
                  <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {faqs[category.id]?.length || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          initial={{opacity: 0, x: 20}}
          animate={{opacity: 1, x: 0}}
          transition={{delay: 0.3}}
          className="lg:col-span-3"
        >
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <SafeIcon icon={FiHelpCircle} className="text-4xl text-gray-300 mb-4 mx-auto" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No matching questions found</h3>
                <p className="text-gray-500">Try adjusting your search terms or browse different categories.</p>
              </div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: index * 0.1}}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <h3 className="font-semibold text-gray-800 pr-4">{faq.question}</h3>
                    <SafeIcon
                      icon={openFAQ === faq.id ? FiChevronUp : FiChevronDown}
                      className="text-gray-400 flex-shrink-0"
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3}}
                        className="border-t border-gray-100"
                      >
                        <div className="p-6 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Contact Support */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.5}}
        className="mt-16 bg-gradient-to-r from-medical-500 to-primary-500 rounded-xl p-8 text-center text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
        <p className="text-medical-100 mb-6">
          Our support team is available 24/7 to help you with any questions about MediVerse AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-medical-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
            Schedule a Demo
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQSection;