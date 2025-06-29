import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import useMedicalStore from '../store/medicalStore';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiUsers, FiMessageSquare, FiClock, FiStar } = FiIcons;

const DepartmentsPage = () => {
  const { departments } = useMedicalStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Departments' },
    { id: 'primary', name: 'Primary Care' },
    { id: 'specialty', name: 'Specialties' },
    { id: 'mental-health', name: 'Mental Health' },
    { id: 'emergency', name: 'Emergency' }
  ];

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    
    // Simple categorization logic
    const categoryMap = {
      'primary': ['general-practice', 'family-medicine'],
      'specialty': ['cardiology', 'neurology', 'oncology', 'orthopedics', 'dermatology'],
      'mental-health': ['psychology', 'psychiatry'],
      'emergency': ['emergency']
    };
    
    return matchesSearch && categoryMap[selectedCategory]?.includes(dept.id);
  });

  const getDepartmentIcon = (deptId) => {
    const iconMap = {
      'general-practice': FiUsers,
      'cardiology': FiUsers,
      'neurology': FiUsers,
      'psychology': FiUsers,
      'pediatrics': FiUsers,
      'oncology': FiUsers,
      'orthopedics': FiUsers,
      'dermatology': FiUsers,
      'gynecology': FiUsers,
      'emergency': FiUsers
    };
    return iconMap[deptId] || FiUsers;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg medical-card p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Medical Departments
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access 70+ AI-powered medical specialists available 24/7. Each department 
            features expert AI doctors trained in their specific field.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments, specialties, or symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg medical-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-medical-500 to-medical-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{departments.length}</h3>
          <p className="text-gray-600 text-sm">Total Departments</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg medical-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">24/7</h3>
          <p className="text-gray-600 text-sm">Always Available</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg medical-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiMessageSquare} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">&lt;30s</h3>
          <p className="text-gray-600 text-sm">Response Time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg medical-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiStar} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">4.9/5</h3>
          <p className="text-gray-600 text-sm">Patient Rating</p>
        </motion.div>
      </div>

      {/* Departments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department, index) => (
          <motion.div
            key={department.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg medical-card hover:shadow-xl transition-all duration-300 group"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-medical-100 to-primary-100 rounded-xl flex items-center justify-center group-hover:from-medical-200 group-hover:to-primary-200 transition-colors">
                  <SafeIcon icon={getDepartmentIcon(department.id)} className="text-medical-600 text-2xl" />
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-medical-700 transition-colors">
                {department.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {department.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {department.specialties?.slice(0, 3).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-medical-50 text-medical-700 text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <Link
                to={`/app/consultation/${department.id}`}
                className="w-full bg-gradient-to-r from-medical-500 to-primary-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-center block"
              >
                Start Consultation
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiSearch} className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No departments found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or browse all departments.</p>
        </motion.div>
      )}
    </div>
  );
};

export default DepartmentsPage;