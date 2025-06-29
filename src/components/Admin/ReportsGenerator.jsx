import React, {useState} from 'react';
import {motion} from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiFileText, FiDownload, FiCalendar, FiFilter, FiSettings,
  FiPieChart, FiBarChart3, FiTrendingUp, FiUsers, FiActivity
} = FiIcons;

const ReportsGenerator = ({darkMode}) => {
  const [selectedReport, setSelectedReport] = useState('patient-summary');
  const [dateRange, setDateRange] = useState('30days');
  const [generating, setGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'patient-summary',
      name: 'Patient Summary Report',
      description: 'Comprehensive patient analytics and demographics',
      icon: FiUsers,
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'department-performance',
      name: 'Department Performance',
      description: 'Department-wise consultation metrics and efficiency',
      icon: FiBarChart3,
      estimatedTime: '3-4 minutes'
    },
    {
      id: 'ai-insights',
      name: 'AI Insights & Predictions',
      description: 'ML-powered predictions and trend analysis',
      icon: FiTrendingUp,
      estimatedTime: '4-5 minutes'
    },
    {
      id: 'executive-summary',
      name: 'Executive Dashboard',
      description: 'High-level KPIs and executive summary',
      icon: FiPieChart,
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'operational-metrics',
      name: 'Operational Metrics',
      description: 'System performance and operational efficiency',
      icon: FiActivity,
      estimatedTime: '3-4 minutes'
    }
  ];

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      icon: FiFileText,
      description: 'Professional formatted report'
    },
    {
      id: 'excel',
      name: 'Excel Workbook',
      icon: FiFileText,
      description: 'Data tables and charts'
    },
    {
      id: 'powerpoint',
      name: 'PowerPoint',
      icon: FiFileText,
      description: 'Presentation slides'
    },
    {
      id: 'csv',
      name: 'CSV Data',
      icon: FiFileText,
      description: 'Raw data export'
    }
  ];

  const dateRanges = [
    {id: '7days', name: 'Last 7 Days'},
    {id: '30days', name: 'Last 30 Days'},
    {id: '90days', name: 'Last 3 Months'},
    {id: '1year', name: 'Last Year'},
    {id: 'custom', name: 'Custom Range'}
  ];

  const handleGenerateReport = async (format) => {
    setGenerating(true);
    toast.loading('Generating AI-powered report...', {id: 'report-generation'});

    // Simulate report generation
    setTimeout(() => {
      setGenerating(false);
      toast.success(`${format.toUpperCase()} report generated successfully!`, {id: 'report-generation'});
      
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `mediverse-${selectedReport}-${dateRange}.${format}`;
      link.click();
    }, 3000);
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="space-y-6"
    >
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">AI-Powered Reports & Executive Summaries</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Generate intelligent reports with automated insights and recommendations
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiSettings} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Report Types */}
        <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">Select Report Type</h4>
          <div className="space-y-3">
            {reportTypes.map(report => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedReport === report.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : darkMode
                    ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedReport === report.id
                      ? 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <SafeIcon icon={report.icon} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">{report.name}</h5>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {report.description}
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Estimated time: {report.estimatedTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Date Range */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
            <h4 className="font-semibold mb-4 flex items-center">
              <SafeIcon icon={FiCalendar} className="mr-2" />
              Date Range
            </h4>
            <div className="space-y-2">
              {dateRanges.map(range => (
                <label key={range.id} className="flex items-center">
                  <input
                    type="radio"
                    name="dateRange"
                    value={range.id}
                    checked={dateRange === range.id}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">{range.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
            <h4 className="font-semibold mb-4 flex items-center">
              <SafeIcon icon={FiFilter} className="mr-2" />
              Filters
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}>
                  <option>All Departments</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Psychology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Patient Type</label>
                <select className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}>
                  <option>All Patients</option>
                  <option>New Patients</option>
                  <option>Returning Patients</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h4 className="font-semibold mb-4">Export & Generate Report</h4>
        <div className="grid md:grid-cols-4 gap-4">
          {exportFormats.map(format => (
            <button
              key={format.id}
              onClick={() => handleGenerateReport(format.id)}
              disabled={generating}
              className={`p-4 rounded-lg border text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode 
                  ? 'border-gray-600 hover:border-gray-500 bg-gray-700 hover:bg-gray-600' 
                  : 'border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <SafeIcon icon={format.icon} className="text-xl" />
                <span className="font-medium">{format.name}</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {format.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* AI Report Preview */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h4 className="font-semibold mb-4">AI-Generated Executive Summary Preview</h4>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-green-500 font-bold">📈</span>
              <p className="text-sm">
                <strong>Patient Volume Growth:</strong> Your platform experienced a 23% increase in patient consultations this month, with Cardiology leading at 156% growth rate.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">🎯</span>
              <p className="text-sm">
                <strong>Satisfaction Metrics:</strong> Patient satisfaction scores averaged 4.7/5, with Psychology department achieving the highest rating at 4.9/5.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-500 font-bold">⚡</span>
              <p className="text-sm">
                <strong>Performance Insights:</strong> Average response time improved by 15% to 23 seconds. Peak consultation hours are 2-4 PM, suggesting optimal staffing adjustments.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-purple-500 font-bold">🔮</span>
              <p className="text-sm">
                <strong>AI Predictions:</strong> Based on current trends, expect 18% growth next month. Recommend increasing Cardiology capacity and implementing chatbot for common queries.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => handleGenerateReport('pdf')}
            disabled={generating}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            <SafeIcon icon={FiDownload} />
            <span>{generating ? 'Generating...' : 'Generate Full Report'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsGenerator;