import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiClock, FiStar } = FiIcons;

const DepartmentAnalytics = ({ data, loading, detailed = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg medical-card p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const COLORS = ['#14b8a6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];

  const chartData = data?.map((dept, index) => ({
    ...dept,
    fill: COLORS[index % COLORS.length]
  })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg medical-card p-6 ${detailed ? 'col-span-full' : ''}`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Department Analytics</h3>

      {detailed ? (
        <div className="space-y-8">
          {/* Consultation Volume Chart */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">Consultation Volume by Department</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consultations" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Performance Table */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">Department Performance</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Consultations</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Avg Time (min)</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Satisfaction</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((dept, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: dept.fill }}></div>
                          <span className="font-medium text-gray-800">{dept.name}</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-gray-600">{dept.consultations.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 text-gray-600">{dept.avgTime}</td>
                      <td className="text-right py-3 px-4">
                        <div className="flex items-center justify-end">
                          <SafeIcon icon={FiStar} className="text-yellow-500 mr-1" />
                          <span className="font-medium">{dept.satisfaction}</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4">
                        <div className="flex items-center justify-end">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(dept.satisfaction / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {((dept.satisfaction / 5) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Department Statistics Summary */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-medical-50 rounded-lg">
              <div className="text-2xl font-bold text-medical-600">
                {chartData.reduce((sum, dept) => sum + dept.consultations, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Consultations</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {chartData.length > 0 ? (chartData.reduce((sum, dept) => sum + dept.avgTime, 0) / chartData.length).toFixed(1) : 0}min
              </div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {chartData.length > 0 ? (chartData.reduce((sum, dept) => sum + dept.satisfaction, 0) / chartData.length).toFixed(1) : 0}/5
              </div>
              <div className="text-sm text-gray-600">Avg Satisfaction</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Simple Bar Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="consultations" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">
                {chartData.length}
              </div>
              <div className="text-xs text-gray-600">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">
                {chartData.reduce((sum, dept) => sum + dept.consultations, 0).toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Total Consultations</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">
                {chartData.length > 0 ? (chartData.reduce((sum, dept) => sum + dept.satisfaction, 0) / chartData.length).toFixed(1) : 0}
              </div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DepartmentAnalytics;