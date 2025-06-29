import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import useSEOStore from '../../store/seoStore';
import * as FiIcons from 'react-icons/fi';

const {
  FiSearch, FiTarget, FiImage, FiLink, FiCode, FiTrendingUp, FiZap, FiEye,
  FiEdit3, FiSave, FiRefreshCw, FiCheck, FiArrowUp, FiGlobe, FiSettings,
  FiBarChart3, FiAlertTriangle, FiCpu, FiDownload, FiExternalLink
} = FiIcons;

const SEOOptimizationPanel = ({ darkMode }) => {
  const {
    seoMetrics,
    optimizationSuggestions,
    schemaMarkup,
    internalLinks,
    backlinks,
    loading,
    initializeSEO,
    optimizeTitleTag,
    optimizeMetaDescription,
    optimizeImageAlt,
    generateSchema,
    generateInternalLinks,
    generateBacklinks,
    applySEOOptimization
  } = useSEOStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPage, setSelectedPage] = useState('homepage');
  const [optimizationProgress, setOptimizationProgress] = useState(0);

  useEffect(() => {
    initializeSEO();
  }, [initializeSEO]);

  const seoTabs = [
    { id: 'overview', label: 'SEO Overview', icon: FiBarChart3 },
    { id: 'onpage', label: 'On-Page SEO', icon: FiTarget },
    { id: 'schema', label: 'Schema Markup', icon: FiCode },
    { id: 'internal', label: 'Internal Links', icon: FiLink },
    { id: 'offpage', label: 'Off-Page SEO', icon: FiGlobe },
    { id: 'analytics', label: 'SEO Analytics', icon: FiTrendingUp }
  ];

  const pages = [
    { id: 'homepage', name: 'Homepage', url: '/', status: 'optimized' },
    { id: 'departments', name: 'Departments', url: '/departments', status: 'needs-optimization' },
    { id: 'faq', name: 'FAQ Page', url: '/faq', status: 'optimized' },
    { id: 'login', name: 'Login Page', url: '/login', status: 'needs-optimization' },
    { id: 'register', name: 'Register Page', url: '/register', status: 'needs-optimization' }
  ];

  const handleOptimizeAll = async () => {
    setOptimizationProgress(0);
    const steps = [
      'Analyzing page content...',
      'Optimizing title tags...',
      'Optimizing meta descriptions...',
      'Processing images...',
      'Generating schema markup...',
      'Creating internal links...',
      'Finalizing optimization...'
    ];

    for (let i = 0; i < steps.length; i++) {
      toast.loading(steps[i], { id: 'seo-optimization' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOptimizationProgress(((i + 1) / steps.length) * 100);
    }

    await applySEOOptimization(selectedPage);
    toast.success('SEO optimization completed successfully!', { id: 'seo-optimization' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimized': return 'bg-green-100 text-green-800';
      case 'needs-optimization': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiSearch} className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">AI SEO Optimization</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Automated on-page and off-page SEO optimization powered by AI
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleOptimizeAll}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <SafeIcon icon={FiZap} />
              <span>Optimize All</span>
            </button>
            <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}>
              <SafeIcon icon={FiSettings} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {optimizationProgress > 0 && optimizationProgress < 100 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Optimizing...</span>
              <span>{optimizationProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${optimizationProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-4 mt-6 overflow-x-auto">
          {seoTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : darkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SEO Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* SEO Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTrendingUp} className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{seoMetrics?.seoScore || 85}/100</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>SEO Score</p>
            </div>

            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiEye} className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{seoMetrics?.organicTraffic || '12.5k'}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Organic Traffic</p>
            </div>

            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTarget} className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{seoMetrics?.keywordRankings || 247}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Keyword Rankings</p>
            </div>

            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiLink} className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{seoMetrics?.backlinks || 1847}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Quality Backlinks</p>
            </div>
          </div>

          {/* Page Status */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
            <h4 className="font-semibold mb-4">Page Optimization Status</h4>
            <div className="space-y-3">
              {pages.map(page => (
                <div key={page.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={FiTarget} className="text-blue-600 text-sm" />
                    </div>
                    <div>
                      <h5 className="font-medium">{page.name}</h5>
                      <p className="text-sm text-gray-500">{page.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page.status)}`}>
                      {page.status === 'optimized' ? 'Optimized' : 'Needs Optimization'}
                    </span>
                    <button
                      onClick={() => setSelectedPage(page.id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiEdit3} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* On-Page SEO */}
      {activeTab === 'onpage' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Title Tag Optimization */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold flex items-center">
                  <SafeIcon icon={FiTarget} className="mr-2 text-blue-500" />
                  Title Tag Optimization
                </h4>
                <button
                  onClick={() => optimizeTitleTag(selectedPage)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  AI Optimize
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Title</label>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-sm`}>
                    MediVerse AI - Your AI General Hospital
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">AI Optimized Title</label>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                    MediVerse AI: 24/7 AI Doctor Consultations | 70+ Medical Specialties Online
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Length: 78 characters</span>
                    <span className="text-green-600">✓ SEO Optimized</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Description Optimization */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold flex items-center">
                  <SafeIcon icon={FiSearch} className="mr-2 text-green-500" />
                  Meta Description
                </h4>
                <button
                  onClick={() => optimizeMetaDescription(selectedPage)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  AI Optimize
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">AI Optimized Description</label>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                    Get instant AI doctor consultations 24/7 with MediVerse AI. Access 70+ medical specialties, 
                    secure health records, and personalized treatment plans. Start your free consultation today!
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Length: 155 characters</span>
                    <span className="text-green-600">✓ Perfect Length</span>
                    <span className="text-blue-600">↗ High CTR Keywords</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Alt Text Optimization */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold flex items-center">
                <SafeIcon icon={FiImage} className="mr-2 text-purple-500" />
                Image Alt Text Optimization
              </h4>
              <button
                onClick={() => optimizeImageAlt(selectedPage)}
                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
              >
                AI Analyze Images
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  src: '/medical-icon.svg',
                  current: 'Medical icon',
                  optimized: 'AI-powered medical consultation platform logo with stethoscope icon for telemedicine services'
                },
                {
                  src: '/hero-image.jpg',
                  current: 'Hero image',
                  optimized: 'Doctor using AI technology for patient consultation and diagnosis in modern telehealth platform'
                },
                {
                  src: '/features-image.jpg',
                  current: 'Features',
                  optimized: '70+ medical specialties available 24/7 through AI-powered healthcare consultation platform'
                }
              ].map((image, index) => (
                <div key={index} className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="w-full h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-3"></div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Current Alt Text</label>
                      <p className="text-sm text-gray-600">{image.current}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-green-600">AI Optimized</label>
                      <p className="text-sm text-green-700">{image.optimized}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schema Markup */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">1-Click Schema Generation</h4>
              <button
                onClick={() => generateSchema(selectedPage)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Generate Schema
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3">Available Schema Types</h5>
                <div className="space-y-2">
                  {[
                    { type: 'Organization', status: 'active', description: 'Business information and contact details' },
                    { type: 'WebSite', status: 'active', description: 'Website search functionality' },
                    { type: 'MedicalOrganization', status: 'recommended', description: 'Healthcare provider information' },
                    { type: 'Service', status: 'recommended', description: 'Medical consultation services' },
                    { type: 'FAQPage', status: 'active', description: 'FAQ structured data' },
                    { type: 'Review', status: 'pending', description: 'Patient reviews and ratings' }
                  ].map((schema, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div>
                        <span className="font-medium">{schema.type}</span>
                        <p className="text-xs text-gray-500">{schema.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        schema.status === 'active' ? 'bg-green-100 text-green-800' :
                        schema.status === 'recommended' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {schema.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-3">Generated Schema Preview</h5>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-sm font-mono overflow-x-auto`}>
                  <pre>{`{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "MediVerse AI",
  "description": "AI-powered healthcare platform",
  "url": "https://mediverse-ai.com",
  "telephone": "+1-800-MEDIVERSE",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "medicalSpecialty": [
    "Cardiology", "Neurology", "Psychology"
  ]
}`}</pre>
                </div>
                <button className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Apply Schema Markup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Internal Links */}
      {activeTab === 'internal' && (
        <div className="space-y-6">
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Smart Internal Link Suggestions</h4>
              <button
                onClick={() => generateInternalLinks(selectedPage)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Analyze & Suggest
              </button>
            </div>
            
            <div className="space-y-4">
              {(internalLinks[selectedPage] || [
                {
                  anchor: 'AI medical consultations',
                  target: '/departments',
                  context: 'Experience the future of healthcare with instant access to',
                  reason: 'Relevant service page with high authority',
                  strength: 'high'
                },
                {
                  anchor: 'frequently asked questions',
                  target: '/faq',
                  context: 'For more information, check our',
                  reason: 'Improves user experience and reduces bounce rate',
                  strength: 'medium'
                },
                {
                  anchor: 'patient testimonials',
                  target: '/testimonials',
                  context: 'Read what patients say about our',
                  reason: 'Builds trust and social proof',
                  strength: 'high'
                }
              ]).map((link, index) => (
                <div key={index} className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        link.strength === 'high' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {link.strength} impact
                      </span>
                      <SafeIcon icon={FiLink} className="text-blue-500" />
                    </div>
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                      Apply Link
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Context: </span>
                      <span className="text-sm">"{link.context} <strong className="text-blue-600">{link.anchor}</strong>"</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Target: </span>
                      <span className="text-sm font-mono">{link.target}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Reason: </span>
                      <span className="text-sm">{link.reason}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Off-Page SEO */}
      {activeTab === 'offpage' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Backlink Generation */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">White Hat Backlink Generation</h4>
                <button
                  onClick={() => generateBacklinks()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Generate Opportunities
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  {
                    site: 'HealthTech Weekly',
                    type: 'Guest Post',
                    da: 75,
                    topic: 'AI in Healthcare: The Future of Medical Consultations',
                    status: 'opportunity'
                  },
                  {
                    site: 'Medical Innovation Hub',
                    type: 'Resource Mention',
                    da: 68,
                    topic: 'Comprehensive AI Healthcare Platforms',
                    status: 'in-progress'
                  },
                  {
                    site: 'TechCrunch Health',
                    type: 'Expert Quote',
                    da: 92,
                    topic: 'Telemedicine Trends 2024',
                    status: 'completed'
                  }
                ].map((opportunity, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium">{opportunity.site}</h5>
                        <p className="text-sm text-gray-600">{opportunity.topic}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        opportunity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        opportunity.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {opportunity.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>DA: {opportunity.da}</span>
                        <span>{opportunity.type}</span>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backlink Monitoring */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <h4 className="font-semibold mb-4">Backlink Portfolio</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-2xl font-bold text-green-600">1,847</div>
                    <div className="text-sm text-gray-600">Total Links</div>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <div className="text-sm text-gray-600">Referring Domains</div>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-2xl font-bold text-purple-600">67</div>
                    <div className="text-sm text-gray-600">Avg Domain Authority</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium">Recent Backlinks</h5>
                  {[
                    { domain: 'healthline.com', da: 91, type: 'Editorial', date: '2 days ago' },
                    { domain: 'medicalxpress.com', da: 78, type: 'Resource', date: '5 days ago' },
                    { domain: 'techreview.com', da: 85, type: 'Guest Post', date: '1 week ago' }
                  ].map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-600 rounded">
                      <div>
                        <span className="font-medium text-sm">{link.domain}</span>
                        <span className="text-xs text-gray-500 ml-2">DA: {link.da}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{link.type}</div>
                        <div className="text-xs text-gray-400">{link.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <h4 className="font-semibold mb-4">Keyword Performance</h4>
              <div className="space-y-3">
                {[
                  { keyword: 'AI doctor consultation', position: 3, traffic: 1247, trend: 'up' },
                  { keyword: 'online medical advice', position: 7, traffic: 892, trend: 'up' },
                  { keyword: 'telemedicine platform', position: 12, traffic: 456, trend: 'stable' },
                  { keyword: 'virtual healthcare', position: 8, traffic: 634, trend: 'down' }
                ].map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded">
                    <div>
                      <span className="font-medium">{keyword.keyword}</span>
                      <div className="text-sm text-gray-500">Position: #{keyword.position}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{keyword.traffic}</div>
                      <div className={`text-sm ${
                        keyword.trend === 'up' ? 'text-green-600' :
                        keyword.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {keyword.trend === 'up' ? '↗' : keyword.trend === 'down' ? '↘' : '→'} {keyword.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
              <h4 className="font-semibold mb-4">SEO Recommendations</h4>
              <div className="space-y-3">
                {[
                  {
                    type: 'critical',
                    title: 'Optimize Core Web Vitals',
                    description: 'Improve LCP by 0.8s for better rankings',
                    impact: 'High'
                  },
                  {
                    type: 'warning',
                    title: 'Update Outdated Content',
                    description: '3 pages need content refresh',
                    impact: 'Medium'
                  },
                  {
                    type: 'info',
                    title: 'Add More Internal Links',
                    description: 'Opportunity to add 12 strategic links',
                    impact: 'Low'
                  }
                ].map((rec, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${
                    rec.type === 'critical' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' :
                    rec.type === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20' :
                    'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                  }`}>
                    <div className="flex items-start space-x-2">
                      <SafeIcon 
                        icon={rec.type === 'critical' ? FiAlertTriangle : rec.type === 'warning' ? FiAlertTriangle : FiTrendingUp}
                        className={`mt-0.5 ${
                          rec.type === 'critical' ? 'text-red-600' :
                          rec.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                        }`}
                      />
                      <div className="flex-1">
                        <h5 className="font-medium">{rec.title}</h5>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                        <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                          rec.impact === 'High' ? 'bg-red-100 text-red-800' :
                          rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {rec.impact} Impact
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SEOOptimizationPanel;