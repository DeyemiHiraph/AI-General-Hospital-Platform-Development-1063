import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar} from 'recharts';
import SafeIcon from '../../common/SafeIcon';
import usePowerAdminStore from '../../store/powerAdminStore';
import * as FiIcons from 'react-icons/fi';

const {FiTrendingUp, FiTarget, FiZap, FiBrain, FiAlertTriangle, FiCheckCircle} = FiIcons;

const PredictiveAnalytics = ({darkMode}) => {
  const {generatePredictions, aiInsights, loading} = usePowerAdminStore();
  const [selectedModel, setSelectedModel] = useState('patient_volume');
  const [predictionData, setPredictionData] = useState([]);

  useEffect(() => {
    loadPredictions();
  }, [selectedModel]);

  const loadPredictions = async () => {
    try {
      await generatePredictions(selectedModel);
      // Generate sample prediction data
      const data = generateSamplePredictions(selectedModel);
      setPredictionData(data);
    } catch (error) {
      console.error('Failed to load predictions:', error);
    }
  };

  const mlModels = [
    {
      id: 'patient_volume',
      name: 'Patient Volume Prediction',
      description: 'Forecast patient consultation volumes',
      accuracy: 94.2,
      icon: FiTrendingUp
    },
    {
      id: 'department_load',
      name: 'Department Load Balancing',
      description: 'Predict department capacity requirements',
      accuracy: 91.8,
      icon: FiTarget
    },
    {
      id: 'satisfaction',
      name: 'Satisfaction Forecasting',
      description: 'Predict patient satisfaction trends',
      accuracy: 87.5,
      icon: FiCheckCircle
    },
    {
      id: 'anomaly_detection',
      name: 'Anomaly Detection',
      description: 'Identify unusual patterns and outliers',
      accuracy: 96.1,
      icon: FiAlertTriangle
    }
  ];

  const generateSamplePredictions = (modelType) => {
    const baseData = Array.from({length: 30}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}),
        actual: i < 15 ? Math.floor(Math.random() * 100) + 100 : null,
        predicted: Math.floor(Math.random() * 100) + 120,
        confidence: Math.random() * 20 + 80
      };
    });

    switch (modelType) {
      case 'patient_volume':
        return baseData.map(d => ({
          ...d,
          predicted: d.predicted + Math.sin(Math.random() * 10) * 20
        }));
      case 'department_load':
        return baseData.map(d => ({
          ...d,
          predicted: d.predicted * 0.8 + Math.random() * 40
        }));
      default:
        return baseData;
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="space-y-6"
    >
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiBrain} className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Predictive Analytics & ML Tools</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Advanced machine learning models for healthcare forecasting
            </p>
          </div>
        </div>
      </div>

      {/* ML Models Selection */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h4 className="font-semibold mb-4">Machine Learning Models</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mlModels.map(model => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedModel === model.id
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : darkMode
                  ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                  : 'border-gray-200 hover:border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedModel === model.id
                    ? 'bg-purple-500 text-white'
                    : darkMode
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  <SafeIcon icon={model.icon} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{model.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      model.accuracy > 95 ? 'bg-green-100 text-green-800' :
                      model.accuracy > 90 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {model.accuracy}%
                    </span>
                  </div>
                </div>
              </div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Chart */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="font-semibold">Prediction Results</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {mlModels.find(m => m.id === selectedModel)?.name} - Next 30 Days
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Predicted</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="date" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: darkMode ? '#ffffff' : '#000000'
              }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{fill: '#3b82f6', strokeWidth: 2, r: 4}}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{fill: '#10b981', strokeWidth: 2, r: 4}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Model Performance */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">Model Performance</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy</span>
              <span className="font-medium">
                {mlModels.find(m => m.id === selectedModel)?.accuracy}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Precision</span>
              <span className="font-medium">92.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Recall</span>
              <span className="font-medium">89.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>F1 Score</span>
              <span className="font-medium">91.0%</span>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">AI-Generated Insights</h4>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className="text-sm font-medium text-blue-600 mb-1">📈 Trend Prediction</p>
              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Patient volume expected to increase 18% next week, primarily in Cardiology department.
              </p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className="text-sm font-medium text-green-600 mb-1">🎯 Optimization</p>
              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Recommend adding 2 more specialists during peak hours (2-4 PM) to maintain service quality.
              </p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
              <p className="text-sm font-medium text-yellow-600 mb-1">⚠️ Alert</p>
              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Potential capacity constraint detected in Neurology for next Thursday - Friday.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Tools */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h4 className="font-semibold mb-4">Advanced Analytics Tools</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <button className={`p-4 rounded-lg text-left transition-colors ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
          }`}>
            <SafeIcon icon={FiZap} className="text-yellow-500 text-xl mb-2" />
            <h5 className="font-medium mb-1">Anomaly Detection</h5>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Detect unusual patterns in patient data
            </p>
          </button>
          
          <button className={`p-4 rounded-lg text-left transition-colors ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
          }`}>
            <SafeIcon icon={FiTarget} className="text-green-500 text-xl mb-2" />
            <h5 className="font-medium mb-1">Clustering Analysis</h5>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Segment patients by behavior patterns
            </p>
          </button>
          
          <button className={`p-4 rounded-lg text-left transition-colors ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
          }`}>
            <SafeIcon icon={FiTrendingUp} className="text-blue-500 text-xl mb-2" />
            <h5 className="font-medium mb-1">Time Series Forecasting</h5>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Long-term trend predictions
            </p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictiveAnalytics;