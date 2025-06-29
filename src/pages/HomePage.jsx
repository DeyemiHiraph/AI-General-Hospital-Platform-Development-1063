import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiActivity, FiHeart, FiBrain, FiUsers, FiShield, FiClock, FiGlobe, 
  FiArrowRight, FiCheck, FiHelpCircle
} = FiIcons;

const HomePage = () => {
  const features = [
    {
      icon: FiActivity,
      title: '70+ Medical Specialties',
      description: 'Access expert AI doctors across all medical fields'
    },
    {
      icon: FiClock,
      title: '24/7 Availability',
      description: 'Get instant medical consultations anytime, anywhere'
    },
    {
      icon: FiHeart,
      title: 'Voice & Text Support',
      description: 'Communicate naturally with our AI medical experts'
    },
    {
      icon: FiShield,
      title: 'HIPAA Compliant',
      description: 'Your medical data is secure and encrypted'
    },
    {
      icon: FiBrain,
      title: 'AI-Powered Diagnosis',
      description: 'Advanced AI analysis of symptoms and medical records'
    },
    {
      icon: FiGlobe,
      title: 'Multi-language Support',
      description: 'Healthcare in your preferred language'
    }
  ];

  const specialties = [
    'General Practice', 'Cardiology', 'Neurology', 'Psychology',
    'Pediatrics', 'Oncology', 'Orthopedics', 'Dermatology'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-medical-500 to-primary-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiActivity} className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">MediVerse AI</h1>
                <p className="text-sm text-gray-600">AI General Hospital</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/faq"
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center space-x-1"
              >
                <SafeIcon icon={FiHelpCircle} className="text-lg" />
                <span>FAQ</span>
              </Link>
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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{opacity: 0, x: -50}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.8}}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                Your AI-Powered
                <span className="bg-gradient-to-r from-medical-500 to-primary-500 bg-clip-text text-transparent">
                  {' '}General Hospital
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the future of healthcare with instant access to 70+ medical specialties, 
                AI-powered diagnostics, and 24/7 expert consultations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-medical-500 to-primary-500 text-white px-8 py-4 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg flex items-center justify-center group"
                >
                  Start Free Consultation
                  <SafeIcon icon={FiArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-medical-500 hover:text-medical-500 transition-colors font-semibold text-lg flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: 50}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.8, delay: 0.2}}
              className="relative"
            >
              {/* Hero Image Placeholder */}
              <div className="bg-gradient-to-br from-medical-500 to-primary-500 rounded-xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiActivity} className="text-4xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">
                  AI-Powered Healthcare
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">70+</div>
                    <div className="text-sm">Specialties</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm">Available</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-sm">Rating</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">12k+</div>
                    <div className="text-sm">Patients</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{y: [-10, 10, -10]}}
                transition={{duration: 3, repeat: Infinity}}
                className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheck} className="text-green-500" />
                  <span className="text-sm font-medium">AI Ready</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Revolutionary Healthcare Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the next generation of medical care with our comprehensive AI-powered platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: index * 0.1}}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 medical-card"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-medical-500 to-primary-500 rounded-lg flex items-center justify-center mb-6">
                  <SafeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gradient-to-r from-medical-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              70+ Medical Specialties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From general practice to specialized care, our AI experts cover every aspect of healthcare
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.5, delay: index * 0.1}}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-gray-800">{specialty}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-flex items-center bg-gradient-to-r from-medical-500 to-primary-500 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold text-lg"
            >
              Explore All Specialties
              <SafeIcon icon={FiArrowRight} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-medical-500 to-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of patients who trust MediVerse AI for their healthcare needs. 
              Get started with a free consultation today.
            </p>
            <Link
              to="/register"
              className="bg-white text-medical-600 px-8 py-4 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg inline-flex items-center"
            >
              Start Your Free Consultation
              <SafeIcon icon={FiArrowRight} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-medical-500 to-primary-500 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiActivity} className="text-white" />
                </div>
                <span className="text-xl font-bold">MediVerse AI</span>
              </div>
              <p className="text-gray-400">
                The future of healthcare is here. Experience AI-powered medical care that's available 24/7.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Specialties</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-gray-400 mb-2">For medical emergencies:</p>
              <p className="text-2xl font-bold text-red-400">112</p>
              <p className="text-sm text-gray-400 mt-2">
                MediVerse AI provides consultation but is not a replacement for emergency services.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediVerse AI. All rights reserved. Healthcare technology for everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;