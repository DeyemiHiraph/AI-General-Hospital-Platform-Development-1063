import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import useAuthStore from '../store/authStore';
import useMedicalStore from '../store/medicalStore';
import useEngagementTracking from '../hooks/useEngagementTracking';
import PersonalizedWelcome from '../components/PersonalizedWelcome';
import * as FiIcons from 'react-icons/fi';

const { FiActivity, FiHeart, FiBrain, FiUsers, FiCalendar, FiFileText, FiTrendingUp, FiClock, FiAlertTriangle, FiMessageSquare } = FiIcons;

const DashboardPage = () => {
  const { user, initializeAuth } = useAuthStore();
  const { departments, consultationHistory } = useMedicalStore();
  const { trackInteraction } = useEngagementTracking();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleQuickAction = (action) => {
    trackInteraction({
      type: 'quick_action',
      element: 'dashboard_quick_action',
      value: action
    });
  };

  const quickStats = [
    {
      label: 'Total Consultations',
      value: consultationHistory.length,
      icon: FiMessageSquare,
      color: 'from-medical-500 to-medical-600',
      change: '+12%'
    },
    {
      label: 'Active Specialists',
      value: departments.length,
      icon: FiUsers,
      color: 'from-primary-500 to-primary-600',
      change: 'Available'
    },
    {
      label: 'Health Score',
      value: '87%',
      icon: FiHeart,
      color: 'from-green-500 to-green-600',
      change: '+5%'
    },
    {
      label: 'Next Appointment',
      value: 'Today',
      icon: FiCalendar,
      color: 'from-orange-500 to-orange-600',
      change: '2:30 PM'
    }
  ];

  const recentActivities = [
    {
      type: 'consultation',
      title: 'Cardiology Consultation',
      description: 'Heart rhythm analysis completed',
      time: '2 hours ago',
      icon: FiHeart,
      status: 'completed'
    },
    {
      type: 'upload',
      title: 'Lab Results Uploaded',
      description: 'Blood test results analyzed by AI',
      time: '5 hours ago',
      icon: FiFileText,
      status: 'processed'
    },
    {
      type: 'appointment',
      title: 'Neurology Follow-up',
      description: 'Scheduled for next week',
      time: '1 day ago',
      icon: FiBrain,
      status: 'scheduled'
    }
  ];

  const popularDepartments = departments.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Personalized Welcome */}
      <PersonalizedWelcome />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg medical-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="text-white text-xl" />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Popular Departments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg medical-card"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Popular Departments</h2>
              <Link
                to="/app/departments"
                className="text-medical-600 hover:text-medical-500 text-sm font-medium"
                onClick={() => handleQuickAction('view_all_departments')}
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {popularDepartments.map((dept) => (
                <Link
                  key={dept.id}
                  to={`/app/consultation/${dept.id}`}
                  onClick={() => handleQuickAction(`start_consultation_${dept.id}`)}
                  className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-medical-300 hover:bg-medical-50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-medical-100 to-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:from-medical-200 group-hover:to-primary-200">
                    <SafeIcon icon={FiUsers} className="text-medical-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 group-hover:text-medical-700">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {dept.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg medical-card"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                    activity.status === 'processed' ? 'bg-blue-100 text-blue-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <SafeIcon icon={activity.icon} className="text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg medical-card"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              to="/app/emergency"
              onClick={() => handleQuickAction('emergency_consultation')}
              className="flex flex-col items-center p-6 rounded-lg bg-red-50 hover:bg-red-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-3">
                <SafeIcon icon={FiAlertTriangle} className="text-white text-xl" />
              </div>
              <span className="text-sm font-medium text-red-700 group-hover:text-red-800">
                Emergency Consultation
              </span>
            </Link>

            <Link
              to="/app/departments"
              onClick={() => handleQuickAction('browse_specialists')}
              className="flex flex-col items-center p-6 rounded-lg bg-medical-50 hover:bg-medical-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-medical-500 rounded-lg flex items-center justify-center mb-3">
                <SafeIcon icon={FiUsers} className="text-white text-xl" />
              </div>
              <span className="text-sm font-medium text-medical-700 group-hover:text-medical-800">
                Browse Specialists
              </span>
            </Link>

            <Link
              to="/app/records"
              onClick={() => handleQuickAction('upload_records')}
              className="flex flex-col items-center p-6 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-3">
                <SafeIcon icon={FiFileText} className="text-white text-xl" />
              </div>
              <span className="text-sm font-medium text-primary-700 group-hover:text-primary-800">
                Upload Records
              </span>
            </Link>

            <Link
              to="/app/appointments"
              onClick={() => handleQuickAction('schedule_appointment')}
              className="flex flex-col items-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                <SafeIcon icon={FiCalendar} className="text-white text-xl" />
              </div>
              <span className="text-sm font-medium text-green-700 group-hover:text-green-800">
                Schedule Appointment
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;