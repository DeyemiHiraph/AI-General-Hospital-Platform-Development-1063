import React, {useState, useRef} from 'react';
import {motion} from 'framer-motion';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter
} from 'recharts';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiBarChart3, FiPieChart, FiTrendingUp, FiDownload, FiShare2,
  FiSettings, FiPlus, FiEdit, FiTrash2, FiMaximize2, FiRefreshCw
} = FiIcons;

const AIAnalyticsPanel = ({darkMode}) => {
  const [selectedChart, setSelectedChart] = useState('line');
  const [draggedChart, setDraggedChart] = useState(null);
  const dashboardRef = useRef(null);

  // Sample data
  const patientData = [
    {month: 'Jan', patients: 1200, consultations: 890, satisfaction: 4.5},
    {month: 'Feb', patients: 1350, consultations: 1020, satisfaction: 4.6},
    {month: 'Mar', patients: 1180, consultations: 950, satisfaction: 4.4},
    {month: 'Apr', patients: 1420, consultations: 1150, satisfaction: 4.7},
    {month: 'May', patients: 1650, consultations: 1340, satisfaction: 4.8},
    {month: 'Jun', patients: 1580, consultations: 1280, satisfaction: 4.6}
  ];

  const departmentData = [
    {name: 'Cardiology', value: 2340, color: '#8884d8'},
    {name: 'Neurology', value: 1890, color: '#82ca9d'},
    {name: 'Psychology', value: 1560, color: '#ffc658'},
    {name: 'Pediatrics', value: 1320, color: '#ff7300'},
    {name: 'Oncology', value: 980, color: '#8dd1e1'}
  ];

  const chartTypes = [
    {id: 'line', name: 'Line Chart', icon: FiTrendingUp},
    {id: 'bar', name: 'Bar Chart', icon: FiBarChart3},
    {id: 'pie', name: 'Pie Chart', icon: FiPieChart},
    {id: 'scatter', name: 'Scatter Plot', icon: FiBarChart3}
  ];

  const handleExportChart = (format) => {
    // Implementation for exporting charts
    console.log(`Exporting chart as ${format}`);
  };

  const renderChart = (type, data, title) => {
    const chartProps = {
      width: '100%',
      height: 300,
      data: data
    };

    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer {...chartProps}>
            <LineChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="consultations" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer {...chartProps}>
            <BarChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
              <Legend />
              <Bar dataKey="patients" fill="#3b82f6" />
              <Bar dataKey="consultations" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer {...chartProps}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer {...chartProps}>
            <ScatterChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="patients" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis dataKey="satisfaction" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
              <Scatter dataKey="consultations" fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="space-y-6"
    >
      {/* Chart Type Selector */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">AI Dashboard Builder</h3>
          <div className="flex space-x-2">
            <button className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}>
              <SafeIcon icon={FiRefreshCw} />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}>
              <SafeIcon icon={FiSettings} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartTypes.map(chart => (
            <button
              key={chart.id}
              onClick={() => setSelectedChart(chart.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedChart === chart.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : darkMode
                  ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                  : 'border-gray-200 hover:border-gray-300 bg-gray-50'
              }`}
            >
              <SafeIcon icon={chart.icon} className="text-2xl mb-2 mx-auto" />
              <p className="text-sm font-medium">{chart.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Display */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold">Patient Analytics Dashboard</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time patient data and consultation metrics
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExportChart('png')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <SafeIcon icon={FiDownload} />
              <span>Export PNG</span>
            </button>
            <button
              onClick={() => handleExportChart('pdf')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <SafeIcon icon={FiDownload} />
              <span>Export PDF</span>
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}>
              <SafeIcon icon={FiShare2} />
            </button>
          </div>
        </div>

        <div ref={dashboardRef} className="min-h-[400px]">
          {renderChart(selectedChart, patientData, 'Patient Analytics')}
        </div>
      </div>

      {/* AI Insights */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h3 className="text-xl font-semibold mb-4">AI-Generated Insights</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <h4 className="font-semibold text-blue-600 mb-2">📈 Trend Analysis</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Patient consultations have increased by 18% this month, with Cardiology showing the highest growth at 23%. 
              Peak consultation hours are between 2-4 PM.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <h4 className="font-semibold text-green-600 mb-2">🎯 Recommendations</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Consider increasing staff capacity for Cardiology department. 
              Patient satisfaction scores suggest implementing follow-up protocols for better care continuity.
            </p>
          </div>
        </div>
      </div>

      {/* Drag & Drop Dashboard Builder */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Dashboard Composer</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <SafeIcon icon={FiPlus} />
            <span>Add Widget</span>
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 min-h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-move`}>
            <h4 className="font-medium mb-2">Patient Count</h4>
            <p className="text-2xl font-bold text-blue-600">12,847</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-move`}>
            <h4 className="font-medium mb-2">Avg Response Time</h4>
            <p className="text-2xl font-bold text-green-600">23s</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-move`}>
            <h4 className="font-medium mb-2">Satisfaction Score</h4>
            <p className="text-2xl font-bold text-yellow-600">4.7/5</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAnalyticsPanel;