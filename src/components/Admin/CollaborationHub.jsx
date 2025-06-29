import React, {useState} from 'react';
import {motion} from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiUsers, FiMessageSquare, FiShare2, FiPlus, FiEdit, FiTrash2,
  FiEye, FiStar, FiClock, FiCheck, FiX, FiMail, FiLink
} = FiIcons;

const CollaborationHub = ({darkMode}) => {
  const [activeTab, setActiveTab] = useState('team');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [newComment, setNewComment] = useState('');

  const tabs = [
    {id: 'team', label: 'Team Members', icon: FiUsers},
    {id: 'shared', label: 'Shared Dashboards', icon: FiShare2},
    {id: 'comments', label: 'Comments & Reviews', icon: FiMessageSquare}
  ];

  const teamMembers = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@mediverse.ai',
      role: 'Senior Analyst',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      status: 'online',
      lastActive: 'Now',
      permissions: ['view', 'edit', 'share']
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@mediverse.ai',
      role: 'Data Scientist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      status: 'offline',
      lastActive: '2 hours ago',
      permissions: ['view', 'edit']
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@mediverse.ai',
      role: 'Clinical Researcher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      status: 'away',
      lastActive: '30 minutes ago',
      permissions: ['view']
    }
  ];

  const sharedDashboards = [
    {
      id: '1',
      name: 'Patient Analytics Dashboard',
      description: 'Comprehensive patient data visualization',
      owner: 'Dr. Sarah Johnson',
      sharedWith: 5,
      lastModified: '2 hours ago',
      permissions: 'edit',
      views: 234,
      comments: 12
    },
    {
      id: '2',
      name: 'Department Performance Report',
      description: 'Monthly department metrics and KPIs',
      owner: 'Dr. Michael Chen',
      sharedWith: 8,
      lastModified: '1 day ago',
      permissions: 'view',
      views: 156,
      comments: 7
    },
    {
      id: '3',
      name: 'Predictive Analytics Model',
      description: 'AI-powered patient outcome predictions',
      owner: 'Dr. Emily Rodriguez',
      sharedWith: 3,
      lastModified: '3 days ago',
      permissions: 'edit',
      views: 89,
      comments: 15
    }
  ];

  const comments = [
    {
      id: '1',
      author: 'Dr. Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      content: 'The patient satisfaction trends look promising. Should we investigate the factors behind the Q2 improvement?',
      timestamp: '2 hours ago',
      dashboardId: '1',
      dashboardName: 'Patient Analytics Dashboard',
      replies: 3,
      resolved: false
    },
    {
      id: '2',
      author: 'Dr. Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      content: 'I notice some anomalies in the Cardiology department data. We might need to review the data collection process.',
      timestamp: '4 hours ago',
      dashboardId: '2',
      dashboardName: 'Department Performance Report',
      replies: 1,
      resolved: true
    },
    {
      id: '3',
      author: 'Dr. Emily Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      content: 'Great work on the predictive model accuracy! The 94.7% accuracy rate is impressive.',
      timestamp: '1 day ago',
      dashboardId: '3',
      dashboardName: 'Predictive Analytics Model',
      replies: 2,
      resolved: false
    }
  ];

  const handleInviteMember = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }

    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    toast.success('Comment added successfully');
    setNewComment('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Senior Analyst': return 'bg-blue-100 text-blue-800';
      case 'Data Scientist': return 'bg-purple-100 text-purple-800';
      case 'Clinical Researcher': return 'bg-green-100 text-green-800';
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
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Collaboration Hub</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Team collaboration and shared workspace management
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} />
            <span>Invite Member</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mt-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
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

      {/* Tab Content */}
      {activeTab === 'team' && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">Team Members ({teamMembers.length})</h4>
          
          <div className="space-y-4">
            {teamMembers.map(member => (
              <div
                key={member.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 ${
                      darkMode ? 'border-gray-700' : 'border-white'
                    }`}></div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium">{member.name}</h5>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {member.email}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {member.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex flex-wrap gap-1">
                    {member.permissions.map(permission => (
                      <span
                        key={permission}
                        className={`px-2 py-1 text-xs rounded-full ${
                          darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-1">
                    <button className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}>
                      <SafeIcon icon={FiEdit} />
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
      )}

      {activeTab === 'shared' && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
          <h4 className="font-semibold mb-4">Shared Dashboards ({sharedDashboards.length})</h4>
          
          <div className="grid gap-4">
            {sharedDashboards.map(dashboard => (
              <div
                key={dashboard.id}
                className={`p-4 rounded-lg border ${
                  darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h5 className="font-medium mb-1">{dashboard.name}</h5>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {dashboard.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>By {dashboard.owner}</span>
                      <span>•</span>
                      <span>Shared with {dashboard.sharedWith} people</span>
                      <span>•</span>
                      <span>{dashboard.lastModified}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                      <SafeIcon icon={FiEye} />
                    </button>
                    <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                      <SafeIcon icon={FiShare2} />
                    </button>
                    <button className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors">
                      <SafeIcon icon={FiStar} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiEye} className="text-gray-400" />
                      <span>{dashboard.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiMessageSquare} className="text-gray-400" />
                      <span>{dashboard.comments} comments</span>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    dashboard.permissions === 'edit'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {dashboard.permissions}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="space-y-6">
          {/* Add Comment */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
            <h4 className="font-semibold mb-4">Add Comment</h4>
            <div className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts or feedback..."
                className={`w-full px-4 py-3 rounded-lg resize-none ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                rows="3"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
            <h4 className="font-semibold mb-4">Recent Comments ({comments.length})</h4>
            
            <div className="space-y-4">
              {comments.map(comment => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg border ${
                    darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium">{comment.author}</h5>
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {comment.timestamp}
                          </span>
                          {comment.resolved && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Resolved
                            </span>
                          )}
                        </div>
                        
                        <div className="flex space-x-1">
                          <button className={`p-1 rounded transition-colors ${
                            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                          }`}>
                            <SafeIcon icon={FiEdit} className="text-sm" />
                          </button>
                          {!comment.resolved && (
                            <button className="p-1 text-green-500 hover:text-green-600 rounded transition-colors">
                              <SafeIcon icon={FiCheck} className="text-sm" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                        {comment.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>On: {comment.dashboardName}</span>
                          <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                            <SafeIcon icon={FiMessageSquare} />
                            <span>{comment.replies} replies</span>
                          </button>
                        </div>
                        
                        <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 text-sm transition-colors">
                          <SafeIcon icon={FiLink} />
                          <span>View Dashboard</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Invite Team Member</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className={`text-gray-400 hover:text-gray-600`}
              >
                <SafeIcon icon={FiX} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="colleague@mediverse.ai"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}>
                  <option>Viewer</option>
                  <option>Editor</option>
                  <option>Admin</option>
                </select>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleInviteMember}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CollaborationHub;