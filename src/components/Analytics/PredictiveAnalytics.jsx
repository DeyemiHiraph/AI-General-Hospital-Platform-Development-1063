import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import SafeIcon from '../../common/SafeIcon';
import useAITrainerStore from '../../store/aiTrainerStore';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiAlertTriangle, FiShield, FiTarget, FiActivity, FiHeart, FiBrain, FiEye } = FiIcons;

const PredictiveAnalytics = ({ patientData, department }) => {
  const { 
    predictions, 
    riskAssessments, 
    treatmentSuggestions,
    generatePredictions,
    assessRisk,
    generateTreatmentSuggestions
  } = useAITrainerStore();
  
  const [loading, setLoading] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [activeTab, setActiveTab] = useState('predictions');

  useEffect(() => {
    if (patientData && department) {
      loadPredictiveData();
    }
  }, [patientData, department]);

  const loadPredictiveData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        generatePredictions(patientData, department),
        assessRisk(patientData, department),
        generateTreatmentSuggestions(['headache', 'fatigue'], patientData, department)
      ]);
    } catch (error) {
      console.error('Error loading predictive data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'predictions', label: 'Health Predictions', icon: FiTrendingUp },
    { id: 'risk', label: 'Risk Assessment', icon: FiAlertTriangle },
    { id: 'treatments', label: 'Treatment Suggestions', icon: FiTarget }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getConditionIcon = (condition) => {
    if (condition.includes('Heart')) return FiHeart;
    if (condition.includes('Brain') || condition.includes('Neuro')) return FiBrain;
    return FiActivity;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg medical-card p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <SafeIcon icon={FiEye} className="mr-3 text-medical-600" />
              Predictive Analytics
            </h1>
            <p className="text-gray-600">
              AI-powered health predictions and risk assessment
            </p>
          </div>
          
          <button
            onClick={loadPredictiveData}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-medical-500 to-primary-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            <SafeIcon icon={FiTarget} />
            <span>{loading ? 'Analyzing...' : 'Refresh Analysis'}</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4">
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

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg medical-card p-12 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-medical-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiActivity} className="text-white text-2xl animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Patient Data</h3>
          <p className="text-gray-600">Our AI is processing health patterns and generating predictions...</p>
        </motion.div>
      )}

      {/* Tab Content */}
      {!loading && (
        <>
          {activeTab === 'predictions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Predictions Overview */}
              <div className="grid md:grid-cols-3 gap-6">
                {predictions.slice(-3).map((prediction, index) => (
                  <motion.div
                    key={prediction.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg medical-card p-6 cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setSelectedPrediction(prediction)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        prediction.severity === 'High' ? 'bg-red-100' :
                        prediction.severity === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <SafeIcon 
                          icon={getConditionIcon(prediction.condition)} 
                          className={`text-xl ${
                            prediction.severity === 'High' ? 'text-red-600' :
                            prediction.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                          }`} 
                        />
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        prediction.severity === 'High' ? 'bg-red-100 text-red-800' :
                        prediction.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {prediction.severity}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-2">{prediction.condition}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Probability:</span>
                        <span className="font-medium">{(prediction.probability * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timeframe:</span>
                        <span className="font-medium">{prediction.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confidence:</span>
                        <span className="font-medium">{(prediction.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          prediction.probability > 0.7 ? 'bg-red-500' :
                          prediction.probability > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${prediction.probability * 100}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Prediction View */}
              {selectedPrediction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg medical-card p-6"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {selectedPrediction.condition}
                      </h3>
                      <p className="text-gray-600">{selectedPrediction.recommendation}</p>
                    </div>
                    <button
                      onClick={() => setSelectedPrediction(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Contributing Factors</h4>
                      <div className="space-y-2">
                        {selectedPrediction.factors.map((factor, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-medical-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Prediction Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Risk Probability</span>
                          <span className="font-medium">{(selectedPrediction.probability * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Model Confidence</span>
                          <span className="font-medium">{(selectedPrediction.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Expected Timeframe</span>
                          <span className="font-medium">{selectedPrediction.timeframe}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Severity Level</span>
                          <span className={`font-medium ${
                            selectedPrediction.severity === 'High' ? 'text-red-600' :
                            selectedPrediction.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {selectedPrediction.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'risk' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {riskAssessments.slice(-1).map((assessment) => (
                <div key={assessment.id} className="bg-white rounded-xl shadow-lg medical-card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Risk Assessment</h3>
                    <span className={`px-3 py-1 rounded-full font-medium ${getRiskColor(assessment.riskLevel)}`}>
                      {assessment.riskLevel} Risk
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-4">Risk Factors</h4>
                      <div className="space-y-3">
                        {assessment.factors.map((factor, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="font-medium text-gray-800">{factor.factor}</span>
                              <span className="text-sm text-gray-500 ml-2">({factor.category})</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-red-500 h-2 rounded-full"
                                  style={{ width: `${factor.impact * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{(factor.impact * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-4">Recommendations</h4>
                      <div className="space-y-3">
                        {assessment.recommendations.map((rec, index) => (
                          <div key={index} className="p-3 border border-medical-200 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-gray-800">{rec.action}</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                rec.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {rec.priority}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Factor: {rec.factor}</span>
                              <span>Timeline: {rec.timeline}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'treatments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid gap-6">
                {treatmentSuggestions.slice(-3).map((treatment, index) => (
                  <motion.div
                    key={treatment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg medical-card p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{treatment.name}</h3>
                        <p className="text-gray-600">{treatment.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          treatment.recommendation === 'Recommended' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {treatment.recommendation}
                        </span>
                        <span className="text-lg font-bold text-gray-800">
                          {(treatment.effectiveness * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Treatment Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{treatment.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cost:</span>
                            <span className="font-medium">${treatment.cost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Evidence:</span>
                            <span className="font-medium">{treatment.evidence}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Side Effects</h4>
                        <div className="space-y-1">
                          {treatment.sideEffects.map((effect, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">{effect}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Monitoring Required</h4>
                        <div className="space-y-1">
                          {treatment.monitoring.map((monitor, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-medical-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">{monitor}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-yellow-800 mb-1">Contraindications</h5>
                      <p className="text-sm text-yellow-700">
                        {treatment.contraindications.join(', ')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default PredictiveAnalytics;