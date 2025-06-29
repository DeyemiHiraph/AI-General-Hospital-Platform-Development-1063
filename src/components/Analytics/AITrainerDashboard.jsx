import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import SafeIcon from '../../common/SafeIcon';
import useAITrainerStore from '../../store/aiTrainerStore';
import * as FiIcons from 'react-icons/fi';

const { FiBrain, FiTrendingUp, FiActivity, FiTarget, FiCpu, FiZap, FiShield, FiAlertTriangle } = FiIcons;

const AITrainerDashboard = () => {
  const { 
    trainingData, 
    isTraining, 
    initializeModels, 
    trainModel, 
    getModelInsights 
  } = useAITrainerStore();
  
  const [selectedDepartment, setSelectedDepartment] = useState('cardiology');
  const [trainingProgress, setTrainingProgress] = useState(0);

  useEffect(() => {
    initializeModels();
  }, [initializeModels]);

  const handleTrainModel = async () => {
    const mockTrainingData = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      features: Array.from({ length: 10 }, () => Math.random()),
      label: Math.random() > 0.5 ? 1 : 0
    }));

    await trainModel(selectedDepartment, mockTrainingData);
  };

  const modelInsights = getModelInsights(selectedDepartment);
  const departments = Object.keys(trainingData.models || {});

  const COLORS = ['#14b8a6', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg medical-card p-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <SafeIcon icon={FiBrain} className="mr-3 text-medical-600" />
              AI Trainer Dashboard
            </h1>
            <p className="text-gray-600">
              Advanced machine learning system for medical AI specialists
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleTrainModel}
              disabled={isTraining}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-medical-500 to-primary-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              <SafeIcon icon={FiZap} />
              <span>{isTraining ? 'Training...' : 'Train Model'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Model Performance Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTarget} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {((modelInsights?.performance?.precision || 0) * 100).toFixed(1)}%
          </h3>
          <p className="text-gray-600 text-sm">Model Accuracy</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCpu} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {modelInsights?.model?.trainingDataSize?.toLocaleString() || '0'}
          </h3>
          <p className="text-gray-600 text-sm">Training Samples</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {modelInsights?.performance?.recentPredictions || 0}
          </h3>
          <p className="text-gray-600 text-sm">Recent Predictions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiActivity} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {modelInsights?.model?.status === 'active' ? 'Active' : 'Inactive'}
          </h3>
          <p className="text-gray-600 text-sm">Model Status</p>
        </motion.div>
      </div>

      {/* Training Progress */}
      {isTraining && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Training in Progress</h3>
            <span className="text-sm text-medical-600 font-medium">
              Epoch {modelInsights?.model?.epochs || 0}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-medical-500 to-primary-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${trainingProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Training {selectedDepartment} model with latest patient data...
          </p>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Model Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Performance Metrics</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Precision</span>
                <span>{((modelInsights?.performance?.precision || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(modelInsights?.performance?.precision || 0) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Recall</span>
                <span>{((modelInsights?.performance?.recall || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(modelInsights?.performance?.recall || 0) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>F1 Score</span>
                <span>{((modelInsights?.performance?.f1Score || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(modelInsights?.performance?.f1Score || 0) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>AUC Score</span>
                <span>{((modelInsights?.performance?.auc || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(modelInsights?.performance?.auc || 0) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Confusion Matrix */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg medical-card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Confusion Matrix</h3>
          
          {modelInsights?.performance?.confusionMatrix && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {modelInsights.performance.confusionMatrix.truePositives}
                </div>
                <div className="text-sm text-green-700">True Positives</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">
                  {modelInsights.performance.confusionMatrix.falsePositives}
                </div>
                <div className="text-sm text-red-700">False Positives</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {modelInsights.performance.confusionMatrix.falseNegatives}
                </div>
                <div className="text-sm text-yellow-700">False Negatives</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {modelInsights.performance.confusionMatrix.trueNegatives}
                </div>
                <div className="text-sm text-blue-700">True Negatives</div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Model Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg medical-card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Model Features & Architecture</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Input Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {modelInsights?.model?.features?.map((feature, index) => (
                <div key={index} className="bg-gray-50 px-3 py-2 rounded-lg text-sm">
                  {feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Model Configuration</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Model Type:</span>
                <span className="text-sm font-medium">{modelInsights?.model?.type?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Learning Rate:</span>
                <span className="text-sm font-medium">{modelInsights?.model?.learningRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Epochs:</span>
                <span className="text-sm font-medium">{modelInsights?.model?.epochs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Trained:</span>
                <span className="text-sm font-medium">
                  {modelInsights?.model?.lastTrained ? 
                    new Date(modelInsights.model.lastTrained).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AITrainerDashboard;