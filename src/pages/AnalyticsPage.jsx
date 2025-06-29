import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import useAuthStore from '../store/authStore';
import useMedicalStore from '../store/medicalStore';
import useAnalyticsStore from '../store/analyticsStore';
import OverviewCards from '../components/Analytics/OverviewCards';
import ConsultationTrends from '../components/Analytics/ConsultationTrends';
import DepartmentAnalytics from '../components/Analytics/DepartmentAnalytics';
import PatientDemographics from '../components/Analytics/PatientDemographics';
import RealTimeMetrics from '../components/Analytics/RealTimeMetrics';
import * as FiIcons from 'react-icons/fi';

const {FiBarChart3, FiTrendingUp, FiUsers, FiActivity, FiCalendar, FiFilter} = FiIcons;

const AnalyticsPage = () => {
  const {user} = useAuthStore();
  const {departments} = useMedicalStore();
  const {analyticsData, fetchAnalyticsData, loading} = useAnalyticsStore();
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnalyticsData(selectedTimeRange, selectedDepartment);
  }, [selectedTimeRange, selectedDepartment, fetchAnalyticsData]);

  const timeRanges = [
    {value: '7d', label: 'Last 7 Days'},
    {value: '30d', label: 'Last 30 Days'},
    {value: '90d', label: 'Last 3 Months'},
    {value: '1y', label: 'Last Year'}
  ];

  const tabs = [
    {id: 'overview', label: 'Overview', icon: FiBarChart3},
    {id: 'consultations', label: 'Consultations', icon: FiActivity},
    {id: 'departments', label: 'Departments', icon: FiUsers},
    {id: 'patients', label: 'Patients', icon: FiUsers},
    // Removed AI Trainer, Performance, and Predictive Analytics tabs
    // These are now in Power Admin Dashboard
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="bg-white rounded-xl shadow-lg medical-card p-8"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">
              Comprehensive insights and analytics for patient care and consultations
            </p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                💡 <strong>Advanced Analytics:</strong> For AI training, predictive models, and system performance, 
                visit the <span className="font-semibold">Power Admin Dashboard</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCalendar} className="text-gray-400" />
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-medical-100 text-medical-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Real-time Metrics */}
      <RealTimeMetrics />

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="space-y-8"
          >
            <OverviewCards data={analyticsData} loading={loading} />
            <div className="grid lg:grid-cols-2 gap-8">
              <ConsultationTrends data={analyticsData?.consultationTrends} loading={loading} />
              <DepartmentAnalytics data={analyticsData?.departmentStats} loading={loading} />
            </div>
          </motion.div>
        )}

        {activeTab === 'consultations' && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="space-y-8"
          >
            <ConsultationTrends data={analyticsData?.consultationTrends} loading={loading} detailed />
          </motion.div>
        )}

        {activeTab === 'departments' && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
          >
            <DepartmentAnalytics data={analyticsData?.departmentStats} loading={loading} detailed />
          </motion.div>
        )}

        {activeTab === 'patients' && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
          >
            <PatientDemographics data={analyticsData?.patientDemographics} loading={loading} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;