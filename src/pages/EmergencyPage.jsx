import React, {useState} from 'react';
import {motion} from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiAlertTriangle, FiHeart, FiActivity, FiPhone, FiMessageSquare, FiClock, FiMapPin, FiUser} = FiIcons;

const EmergencyPage = () => {
  const [selectedEmergency, setSelectedEmergency] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const emergencyTypes = [
    {
      id: 'chest-pain',
      title: 'Chest Pain',
      description: 'Severe chest pain, heart attack symptoms',
      icon: FiHeart,
      color: 'red',
      urgency: 'critical'
    },
    {
      id: 'breathing',
      title: 'Difficulty Breathing',
      description: 'Shortness of breath, respiratory distress',
      icon: FiActivity,
      color: 'red',
      urgency: 'critical'
    },
    {
      id: 'severe-pain',
      title: 'Severe Pain',
      description: 'Intense pain requiring immediate attention',
      icon: FiAlertTriangle,
      color: 'orange',
      urgency: 'urgent'
    },
    {
      id: 'mental-health',
      title: 'Mental Health Crisis',
      description: 'Panic attack, severe anxiety, crisis situation',
      icon: FiUser,
      color: 'purple',
      urgency: 'urgent'
    }
  ];

  const handleEmergencySelection = (emergencyId) => {
    setSelectedEmergency(emergencyId);
    setIsConnecting(true);

    // Simulate connection to emergency AI
    setTimeout(() => {
      setIsConnecting(false);
      toast.success('Connected to Emergency AI Specialist');
    }, 3000);
  };

  const handleCall112 = () => {
    toast.error('This is a demo. In a real emergency, call 112 immediately!');
  };

  return (
    <div className="space-y-8">
      {/* Emergency Warning */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiAlertTriangle} className="text-red-500 text-2xl" />
          <div>
            <h2 className="text-xl font-bold text-red-800">Medical Emergency</h2>
            <p className="text-red-700 mt-1">
              If you are experiencing a life-threatening emergency, call 112 immediately. This AI service is for urgent consultations, not emergency services.
            </p>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleCall112}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center space-x-2"
          >
            <SafeIcon icon={FiPhone} />
            <span>Call 112</span>
          </button>
          <div className="text-red-700 text-sm flex items-center">
            <SafeIcon icon={FiClock} className="mr-1" />
            <span>Average response time: &lt; 30 seconds</span>
          </div>
        </div>
      </motion.div>

      {!isConnecting && !selectedEmergency && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="bg-white rounded-xl shadow-lg medical-card p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Emergency AI Consultation
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Select your emergency type for immediate AI medical assistance
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {emergencyTypes.map((emergency, index) => (
              <motion.button
                key={emergency.id}
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: index * 0.1}}
                onClick={() => handleEmergencySelection(emergency.id)}
                className={`p-6 rounded-xl border-2 hover:shadow-lg transition-all duration-300 text-left ${
                  emergency.color === 'red'
                    ? 'border-red-300 hover:border-red-500 bg-red-50 hover:bg-red-100'
                    : emergency.color === 'orange'
                    ? 'border-orange-300 hover:border-orange-500 bg-orange-50 hover:bg-orange-100'
                    : 'border-purple-300 hover:border-purple-500 bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      emergency.color === 'red'
                        ? 'bg-red-500'
                        : emergency.color === 'orange'
                        ? 'bg-orange-500'
                        : 'bg-purple-500'
                    }`}
                  >
                    <SafeIcon icon={emergency.icon} className="text-white text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {emergency.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {emergency.description}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        emergency.urgency === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {emergency.urgency === 'critical' ? 'Critical' : 'Urgent'}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {isConnecting && (
        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          className="bg-white rounded-xl shadow-lg medical-card p-12 text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiActivity} className="text-white text-4xl animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Connecting to Emergency AI Specialist...
          </h2>
          <p className="text-gray-600 mb-6">
            Please hold while we connect you to our emergency medical AI system
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </motion.div>
      )}

      {selectedEmergency && !isConnecting && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="bg-white rounded-xl shadow-lg medical-card"
        >
          <div className="p-6 border-b border-gray-200 bg-red-50">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiActivity} className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Emergency AI Specialist</h2>
                <p className="text-gray-600">Connected - Ready to assist immediately</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Emergency Line Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiActivity} className="text-red-500 mt-1" />
                <div>
                  <p className="text-red-800 font-medium">
                    I'm your Emergency AI Medical Specialist. I'm here to help assess your situation immediately.
                  </p>
                  <p className="text-red-700 text-sm mt-2">
                    Please describe your symptoms in detail. If this is life-threatening, please call 112 now.
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Chat Interface */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-md">
                  <p className="text-sm">What specific symptoms are you experiencing right now?</p>
                  <p className="text-xs text-gray-500 mt-1">Emergency AI • Just now</p>
                </div>
              </div>
            </div>

            {/* Quick Emergency Actions */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <button className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                <SafeIcon icon={FiHeart} className="text-red-500 text-xl mb-2 mx-auto" />
                <p className="text-sm font-medium text-red-800">Chest Pain Protocol</p>
              </button>
              <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                <SafeIcon icon={FiActivity} className="text-orange-500 text-xl mb-2 mx-auto" />
                <p className="text-sm font-medium text-orange-800">Breathing Assessment</p>
              </button>
              <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                <SafeIcon icon={FiUser} className="text-purple-500 text-xl mb-2 mx-auto" />
                <p className="text-sm font-medium text-purple-800">Crisis Support</p>
              </button>
            </div>

            {/* Emergency Input */}
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  placeholder="Describe your emergency symptoms..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows="3"
                />
              </div>
              <button className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <SafeIcon icon={FiMessageSquare} className="text-xl" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Emergency Resources */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="bg-white rounded-xl shadow-lg medical-card p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Resources</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Emergency Numbers</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="text-red-500" />
                <span><strong>112</strong> - Emergency Services</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="text-blue-500" />
                <span><strong>999</strong> - Mental Health Crisis</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="text-green-500" />
                <span><strong>01 809 2166</strong> - Poison Control</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Nearest Hospitals</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="text-medical-500" />
                <span>General Hospital - 0.5 miles</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="text-medical-500" />
                <span>Medical Center - 1.2 miles</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="text-medical-500" />
                <span>Emergency Clinic - 2.1 miles</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmergencyPage;