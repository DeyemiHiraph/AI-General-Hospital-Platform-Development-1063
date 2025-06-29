import React, {useState} from 'react';
import {motion} from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import usePowerAdminStore from '../../store/powerAdminStore';
import * as FiIcons from 'react-icons/fi';

const {
  FiCode, FiPlus, FiCopy, FiDownload, FiKey, FiGlobe, 
  FiSettings, FiTrash2, FiEye, FiShield, FiZap
} = FiIcons;

const APIGenerator = ({darkMode}) => {
  const {generateAPI, generatedAPIs} = usePowerAdminStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAPI, setNewAPI] = useState({
    name: '',
    description: '',
    method: 'GET',
    dataSource: 'patients',
    authentication: 'token'
  });

  const [generatedTokens, setGeneratedTokens] = useState([
    {
      id: '1',
      name: 'Production API Key',
      token: 'mv_prod_12345abcdef67890',
      permissions: ['read', 'write'],
      createdAt: '2024-01-15',
      lastUsed: '2 hours ago',
      isActive: true
    },
    {
      id: '2',
      name: 'Analytics Dashboard',
      token: 'mv_dash_98765fedcba54321',
      permissions: ['read'],
      createdAt: '2024-01-10',
      lastUsed: '1 day ago',
      isActive: true
    }
  ]);

  const dataSources = [
    {id: 'patients', name: 'Patient Data', description: 'Patient records and demographics'},
    {id: 'consultations', name: 'Consultations', description: 'Medical consultations and sessions'},
    {id: 'departments', name: 'Departments', description: 'Department information and metrics'},
    {id: 'analytics', name: 'Analytics', description: 'Aggregated analytics and insights'},
    {id: 'reports', name: 'Reports', description: 'Generated reports and summaries'}
  ];

  const mockAPIs = [
    {
      id: '1',
      name: 'Patient Analytics API',
      endpoint: '/api/v1/patient-analytics',
      method: 'GET',
      description: 'Retrieve patient analytics and metrics',
      dataSource: 'patients',
      createdAt: '2024-01-15',
      requests: 1547,
      isActive: true
    },
    {
      id: '2',
      name: 'Department Performance API',
      endpoint: '/api/v1/department-performance',
      method: 'GET',
      description: 'Get department performance data',
      dataSource: 'departments',
      createdAt: '2024-01-12',
      requests: 892,
      isActive: true
    },
    {
      id: '3',
      name: 'Consultation Reports API',
      endpoint: '/api/v1/consultation-reports',
      method: 'POST',
      description: 'Generate and retrieve consultation reports',
      dataSource: 'consultations',
      createdAt: '2024-01-10',
      requests: 234,
      isActive: false
    }
  ];

  const handleCreateAPI = () => {
    if (!newAPI.name || !newAPI.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const api = generateAPI(newAPI);
    toast.success(`API "${api.name}" created successfully!`);
    setShowCreateModal(false);
    setNewAPI({
      name: '',
      description: '',
      method: 'GET',
      dataSource: 'patients',
      authentication: 'token'
    });
  };

  const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = 'mv_api_';
    for (let i = 0; i < 32; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const newToken = {
      id: Math.random().toString(36).substr(2, 9),
      name: `API Token ${generatedTokens.length + 1}`,
      token: token,
      permissions: ['read'],
      createdAt: new Date().toLocaleDateString(),
      lastUsed: 'Never',
      isActive: true
    };

    setGeneratedTokens(prev => [...prev, newToken]);
    toast.success('New API token generated!');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="space-y-6"
    >
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiCode} className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">API Generator</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Auto-generate REST APIs for your data with secure token-based access
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} />
            <span>Create API</span>
          </button>
        </div>
      </div>

      {/* API Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiGlobe} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{mockAPIs.length + generatedAPIs.length}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total APIs</p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiZap} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">2,673</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>API Requests</p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiKey} className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{generatedTokens.length}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Tokens</p>
        </div>
      </div>

      {/* Generated APIs */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h4 className="font-semibold mb-4">Generated APIs</h4>
        
        <div className="space-y-4">
          {mockAPIs.map(api => (
            <div
              key={api.id}
              className={`p-4 rounded-lg border ${
                darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="font-medium">{api.name}</h5>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMethodColor(api.method)}`}>
                      {api.method}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      api.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {api.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    {api.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="font-mono text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                      {api.endpoint}
                    </span>
                    <span>{api.requests} requests</span>
                    <span>Created {api.createdAt}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(api.endpoint)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiCopy} />
                  </button>
                  <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                    <SafeIcon icon={FiEye} />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                    <SafeIcon icon={FiSettings} />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <SafeIcon icon={FiTrash2} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Tokens */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">API Tokens</h4>
          <button
            onClick={generateToken}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <SafeIcon icon={FiKey} />
            <span>Generate Token</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {generatedTokens.map(token => (
            <div
              key={token.id}
              className={`p-4 rounded-lg border ${
                darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="font-medium">{token.name}</h5>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      token.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {token.isActive ? 'Active' : 'Revoked'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <code className={`text-sm font-mono px-3 py-1 rounded ${
                      darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'
                    }`}>
                      {token.token.slice(0, 20)}...
                    </code>
                    <button
                      onClick={() => copyToClipboard(token.token)}
                      className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                    >
                      <SafeIcon icon={FiCopy} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Permissions: {token.permissions.join(', ')}</span>
                    <span>Created: {token.createdAt}</span>
                    <span>Last used: {token.lastUsed}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                    <SafeIcon icon={FiSettings} />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <SafeIcon icon={FiTrash2} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Documentation */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h4 className="font-semibold mb-4">Quick Start Guide</h4>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <h5 className="font-medium mb-2">1. Get Your API Token</h5>
            <p className="text-sm text-gray-600 mb-2">Generate an API token from the tokens section above.</p>
            <code className={`block text-sm p-2 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
              curl -H "Authorization: Bearer YOUR_TOKEN" https://api.mediverse.ai/v1/patients
            </code>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <h5 className="font-medium mb-2">2. Make API Requests</h5>
            <p className="text-sm text-gray-600 mb-2">Use your token to authenticate API requests.</p>
            <code className={`block text-sm p-2 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
              {`{
  "status": "success",
  "data": {
    "patients": [...],
    "total": 1247
  }
}`}
            </code>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <h5 className="font-medium mb-2">3. Handle Responses</h5>
            <p className="text-sm text-gray-600">All responses are in JSON format with consistent structure.</p>
          </div>
        </div>
      </div>

      {/* Create API Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Create New API</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">API Name *</label>
                <input
                  type="text"
                  value={newAPI.name}
                  onChange={(e) => setNewAPI({...newAPI, name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholder="Patient Analytics API"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={newAPI.description}
                  onChange={(e) => setNewAPI({...newAPI, description: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  rows="3"
                  placeholder="API for retrieving patient analytics and metrics"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Method</label>
                  <select
                    value={newAPI.method}
                    onChange={(e) => setNewAPI({...newAPI, method: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Data Source</label>
                  <select
                    value={newAPI.dataSource}
                    onChange={(e) => setNewAPI({...newAPI, dataSource: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    {dataSources.map(source => (
                      <option key={source.id} value={source.id}>
                        {source.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAPI}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create API
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default APIGenerator;