import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import FAQSection from '../components/FAQ/FAQSection';
import * as FiIcons from 'react-icons/fi';

const {FiActivity, FiArrowLeft} = FiIcons;

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <SafeIcon icon={FiArrowLeft} />
                <span>Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-medical-500 to-primary-500 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiActivity} className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold text-gray-800">MediVerse AI FAQ</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-medical-500 to-primary-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* FAQ Content */}
      <FAQSection />
    </div>
  );
};

export default FAQPage;