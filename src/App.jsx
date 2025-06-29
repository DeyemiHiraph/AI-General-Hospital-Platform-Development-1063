import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DepartmentsPage from './pages/DepartmentsPage';
import ConsultationPage from './pages/ConsultationPage';
import ProfilePage from './pages/ProfilePage';
import RecordsPage from './pages/RecordsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import EmergencyPage from './pages/EmergencyPage';
import AnalyticsPage from './pages/AnalyticsPage';
import FAQPage from './pages/FAQPage';
import AdminLogin from './components/Admin/AdminLogin';
import PowerAdminDashboard from './components/Admin/PowerAdminDashboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/faq" element={<FAQPage />} />
        
        {/* Admin Routes */}
        <Route path="/poweradmin" element={<AdminLogin />} />
        <Route path="/poweradmin/dashboard" element={<PowerAdminDashboard />} />
        
        {/* Main App Routes */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="consultation/:departmentId" element={<ConsultationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="records" element={<RecordsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="emergency" element={<EmergencyPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;