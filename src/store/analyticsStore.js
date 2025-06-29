import { create } from 'zustand';

const useAnalyticsStore = create((set, get) => ({
  analyticsData: null,
  loading: false,
  error: null,

  fetchAnalyticsData: async (timeRange = '30d', department = 'all') => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock analytics data
      const mockData = {
        overview: {
          totalConsultations: Math.floor(Math.random() * 10000) + 5000,
          totalPatients: Math.floor(Math.random() * 5000) + 2000,
          activeSpecialists: Math.floor(Math.random() * 100) + 70,
          avgResponseTime: Math.floor(Math.random() * 30) + 15,
          patientSatisfaction: (Math.random() * 0.5 + 4.5).toFixed(1),
          consultationGrowth: (Math.random() * 20 + 10).toFixed(1),
          newPatients: Math.floor(Math.random() * 500) + 200,
          completionRate: (Math.random() * 10 + 90).toFixed(1)
        },
        
        consultationTrends: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          consultations: Math.floor(Math.random() * 200) + 50,
          completed: Math.floor(Math.random() * 180) + 40,
          cancelled: Math.floor(Math.random() * 20) + 5
        })),
        
        departmentStats: [
          { name: 'General Practice', consultations: 1250, satisfaction: 4.7, avgTime: 18 },
          { name: 'Cardiology', consultations: 890, satisfaction: 4.8, avgTime: 25 },
          { name: 'Neurology', consultations: 650, satisfaction: 4.6, avgTime: 30 },
          { name: 'Psychology', consultations: 780, satisfaction: 4.9, avgTime: 45 },
          { name: 'Pediatrics', consultations: 560, satisfaction: 4.8, avgTime: 20 },
          { name: 'Oncology', consultations: 340, satisfaction: 4.7, avgTime: 35 },
          { name: 'Orthopedics', consultations: 450, satisfaction: 4.6, avgTime: 22 },
          { name: 'Dermatology', consultations: 380, satisfaction: 4.5, avgTime: 15 }
        ],
        
        patientDemographics: {
          ageGroups: [
            { age: '18-25', count: 450, percentage: 18 },
            { age: '26-35', count: 650, percentage: 26 },
            { age: '36-45', count: 580, percentage: 23 },
            { age: '46-55', count: 420, percentage: 17 },
            { age: '56-65', count: 280, percentage: 11 },
            { age: '65+', count: 120, percentage: 5 }
          ],
          genderDistribution: [
            { gender: 'Female', count: 1300, percentage: 52 },
            { gender: 'Male', count: 1100, percentage: 44 },
            { gender: 'Other', count: 100, percentage: 4 }
          ],
          geographicDistribution: [
            { region: 'North America', count: 1200, percentage: 48 },
            { region: 'Europe', count: 800, percentage: 32 },
            { region: 'Asia', count: 350, percentage: 14 },
            { region: 'Other', count: 150, percentage: 6 }
          ]
        },
        
        performanceMetrics: {
          systemUptime: 99.8,
          avgLoadTime: 1.2,
          errorRate: 0.1,
          apiResponseTime: 250,
          concurrentUsers: 1450,
          peakHours: [
            { hour: '09:00', users: 890 },
            { hour: '14:00', users: 1200 },
            { hour: '19:00', users: 980 }
          ],
          resourceUsage: {
            cpu: 65,
            memory: 72,
            storage: 45,
            bandwidth: 58
          }
        },
        
        realTimeMetrics: {
          activeConsultations: Math.floor(Math.random() * 50) + 20,
          waitingPatients: Math.floor(Math.random() * 30) + 10,
          onlineSpecialists: Math.floor(Math.random() * 40) + 60,
          systemLoad: Math.floor(Math.random() * 30) + 40,
          todayConsultations: Math.floor(Math.random() * 100) + 150,
          avgWaitTime: Math.floor(Math.random() * 10) + 5
        }
      };
      
      set({ analyticsData: mockData, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateRealTimeMetrics: () => {
    const { analyticsData } = get();
    if (analyticsData) {
      const updatedData = {
        ...analyticsData,
        realTimeMetrics: {
          ...analyticsData.realTimeMetrics,
          activeConsultations: Math.floor(Math.random() * 50) + 20,
          waitingPatients: Math.floor(Math.random() * 30) + 10,
          systemLoad: Math.floor(Math.random() * 30) + 40,
          todayConsultations: analyticsData.realTimeMetrics.todayConsultations + Math.floor(Math.random() * 3),
          avgWaitTime: Math.floor(Math.random() * 10) + 5
        }
      };
      set({ analyticsData: updatedData });
    }
  }
}));

export default useAnalyticsStore;