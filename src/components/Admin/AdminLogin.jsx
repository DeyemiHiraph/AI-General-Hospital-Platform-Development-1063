import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {Navigate, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import useAdminStore from '../../store/adminStore';
import * as FiIcons from 'react-icons/fi';

const {FiShield, FiMail, FiLock, FiEye, FiEyeOff} = FiIcons;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const {adminLogin, adminLoading, isAdminAuthenticated} = useAdminStore();

  // Check if already authenticated and redirect
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/poweradmin/dashboard');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const result = await adminLogin(formData);
    if (result.success) {
      toast.success('Welcome to MediVerse AI Admin Panel!');
      navigate('/poweradmin/dashboard');
    } else {
      toast.error(result.error || 'Invalid admin credentials');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const fillDemoCredentials = (email) => {
    setFormData({
      email: email,
      password: 'demo123'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8}}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center mb-4">
              <SafeIcon icon={FiShield} className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Power Admin Access</h2>
          <p className="mt-2 text-gray-300">Secure administrative control panel</p>
        </div>

        <motion.form
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.2}}
          className="mt-8 space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Admin Email
              </label>
              <div className="relative">
                <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white placeholder-gray-300"
                  placeholder="admin@mediverse.ai"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Admin Password
              </label>
              <div className="relative">
                <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white placeholder-gray-300"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={adminLoading}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adminLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="ml-2">Authenticating...</span>
              </div>
            ) : (
              'Access Admin Panel'
            )}
          </button>

          <div className="text-center text-sm text-gray-300">
            <p>🔐 Authorized personnel only</p>
            <p>All access attempts are logged and monitored</p>
          </div>
        </motion.form>

        <div className="text-center text-xs text-gray-400 space-y-2">
          <p className="font-medium">Demo Credentials (Click to fill):</p>
          <div className="space-y-1">
            <button 
              type="button"
              onClick={() => fillDemoCredentials('admin@mediverse.ai')}
              className="block w-full p-2 bg-white/5 hover:bg-white/10 rounded text-left transition-colors"
            >
              <strong>Power Admin:</strong> admin@mediverse.ai / demo123
            </button>
            <button 
              type="button"
              onClick={() => fillDemoCredentials('editor@mediverse.ai')}
              className="block w-full p-2 bg-white/5 hover:bg-white/10 rounded text-left transition-colors"
            >
              <strong>Editor:</strong> editor@mediverse.ai / demo123
            </button>
            <button 
              type="button"
              onClick={() => fillDemoCredentials('contributor@mediverse.ai')}
              className="block w-full p-2 bg-white/5 hover:bg-white/10 rounded text-left transition-colors"
            >
              <strong>Contributor:</strong> contributor@mediverse.ai / demo123
            </button>
          </div>
        </div>

        {/* Debug info - remove in production */}
        <div className="text-center text-xs text-gray-500">
          <p>Current URL: {window.location.href}</p>
          <p>Auth Status: {isAdminAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;