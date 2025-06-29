import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ConsultationTrends = ({ data, loading, detailed = false }) => {
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = data?.map(item => ({
    ...item,
    date: formatDate(item.date)
  })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg medical-card p-6 ${detailed ? 'col-span-full' : ''}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Consultation Trends</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-medical-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Total</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Cancelled</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={detailed ? 400 : 280}>
        {detailed ? (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="consultations"
              stackId="1"
              stroke="#14b8a6"
              fill="#14b8a6"
              fillOpacity={0.6}
              name="Total Consultations"
            />
            <Area
              type="monotone"
              dataKey="completed"
              stackId="2"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
              name="Completed"
            />
            <Area
              type="monotone"
              dataKey="cancelled"
              stackId="3"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
              name="Cancelled"
            />
          </AreaChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="consultations"
              stroke="#14b8a6"
              strokeWidth={2}
              dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
              name="Total Consultations"
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Completed"
            />
          </LineChart>
        )}
      </ResponsiveContainer>

      {detailed && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-medical-50 rounded-lg">
            <div className="text-2xl font-bold text-medical-600">
              {chartData.reduce((sum, item) => sum + item.consultations, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Consultations</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {chartData.reduce((sum, item) => sum + item.completed, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {chartData.reduce((sum, item) => sum + item.cancelled, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ConsultationTrends;