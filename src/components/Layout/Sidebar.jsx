import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiUsers, FiMessageSquare, FiUser, FiFileText, FiCalendar, FiAlertTriangle, FiActivity, FiBarChart3 } = FiIcons;

const Sidebar = () => {
  const location = useLocation();

  const navigationItems = [
    { path: '/app', icon: FiHome, label: 'Dashboard', exact: true },
    { path: '/app/departments', icon: FiUsers, label: 'Departments' },
    { path: '/app/records', icon: FiFileText, label: 'Medical Records' },
    { path: '/app/appointments', icon: FiCalendar, label: 'Appointments' },
    { path: '/app/analytics', icon: FiBarChart3, label: 'Analytics' },
    { path: '/app/profile', icon: FiUser, label: 'Profile' },
    { path: '/app/emergency', icon: FiAlertTriangle, label: 'Emergency', urgent: true },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-white shadow-xl border-r border-gray-200"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-medical-500 to-primary-500 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiActivity} className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">MediVerse AI</h1>
            <p className="text-xs text-gray-500">AI General Hospital</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-medical-50 to-primary-50 text-medical-700 border-r-3 border-medical-500'
                  : item.urgent
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <SafeIcon icon={item.icon} className="mr-3 text-lg" />
            {item.label}
            {item.urgent && (
              <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-medical-500 to-primary-500 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiMessageSquare} className="text-lg" />
            <span className="text-sm font-medium">AI Assistant</span>
          </div>
          <p className="text-xs opacity-90">
            24/7 medical support available
          </p>
          <div className="mt-2 flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;