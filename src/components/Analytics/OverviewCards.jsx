import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiMessageSquare, FiClock, FiStar, FiTrendingUp, FiUserPlus, FiCheckCircle } = FiIcons;

const OverviewCards = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg medical-card p-6 animate-pulse">
            <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Consultations',
      value: data?.overview?.totalConsultations?.toLocaleString() || '0',
      icon: FiMessageSquare,
      color: 'from-medical-500 to-medical-600',
      change: `+${data?.overview?.consultationGrowth || 0}%`,
      trend: 'up'
    },
    {
      title: 'Active Patients',
      value: data?.overview?.totalPatients?.toLocaleString() || '0',
      icon: FiUsers,
      color: 'from-primary-500 to-primary-600',
      change: `+${data?.overview?.newPatients || 0}`,
      trend: 'up'
    },
    {
      title: 'AI Specialists',
      value: data?.overview?.activeSpecialists || '0',
      icon: FiUsers,
      color: 'from-green-500 to-green-600',
      change: 'All Online',
      trend: 'neutral'
    },
    {
      title: 'Avg Response Time',
      value: `${data?.overview?.avgResponseTime || 0}s`,
      icon: FiClock,
      color: 'from-orange-500 to-orange-600',
      change: '-12%',
      trend: 'down'
    },
    {
      title: 'Patient Satisfaction',
      value: `${data?.overview?.patientSatisfaction || 0}/5`,
      icon: FiStar,
      color: 'from-yellow-500 to-yellow-600',
      change: '+0.2',
      trend: 'up'
    },
    {
      title: 'New Patients',
      value: data?.overview?.newPatients?.toLocaleString() || '0',
      icon: FiUserPlus,
      color: 'from-purple-500 to-purple-600',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Completion Rate',
      value: `${data?.overview?.completionRate || 0}%`,
      icon: FiCheckCircle,
      color: 'from-blue-500 to-blue-600',
      change: '+2.5%',
      trend: 'up'
    },
    {
      title: 'Growth Rate',
      value: `${data?.overview?.consultationGrowth || 0}%`,
      icon: FiTrendingUp,
      color: 'from-red-500 to-red-600',
      change: 'This Month',
      trend: 'up'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}>
              <SafeIcon icon={card.icon} className="text-white text-xl" />
            </div>
            <span className={`text-sm font-medium ${
              card.trend === 'up' ? 'text-green-600' : 
              card.trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {card.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{card.value}</h3>
          <p className="text-gray-600 text-sm">{card.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewCards;