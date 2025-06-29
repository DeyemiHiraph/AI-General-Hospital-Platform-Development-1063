import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import useAdminStore from '../../store/adminStore';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare, FiBot, FiUser, FiSend, FiZap, FiCheckCircle, FiClock, FiAlertTriangle } = FiIcons;

const AIHelpDesk = () => {
  const { supportTickets, createSupportTicket, updateTicketStatus, generateAISuggestion } = useAdminStore();
  const [activeTicket, setActiveTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'technical',
    priority: 'medium'
  });
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    
    if (!newTicket.title || !newTicket.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const result = await createSupportTicket(newTicket);
    if (result.success) {
      toast.success('Support ticket created successfully!');
      setNewTicket({ title: '', description: '', category: 'technical', priority: 'medium' });
    }
  };

  const handleAIChat = async () => {
    if (!aiMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: aiMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setAiMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I've analyzed the issue. This appears to be related to user session management. I recommend clearing the user cache and restarting their session.",
        "Based on the error logs, this seems to be a database connection timeout. Try increasing the connection pool size in the configuration.",
        "This is likely a rate limiting issue. The user may have exceeded the API call limit. Check their usage and consider increasing their quota.",
        "The symptoms suggest a frontend rendering issue. Try clearing the browser cache and refreshing the application state.",
        "This appears to be a permission-related problem. Verify the user's role assignments and access levels in the admin panel."
      ];

      const aiResponse = {
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString(),
        actions: [
          'Clear user cache',
          'Reset user session',
          'Check API limits',
          'Verify permissions'
        ]
      };

      setChatHistory(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const executeAIAction = (action) => {
    toast.success(`Executing: ${action}`);
    // Here you would implement the actual action execution
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">AI Help Desk</h2>
        <p className="text-gray-400">AI-powered support system for automated issue resolution</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Support Tickets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create New Ticket */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Create Support Ticket</h3>
            
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="technical">Technical</option>
                    <option value="user-account">User Account</option>
                    <option value="performance">Performance</option>
                    <option value="billing">Billing</option>
                    <option value="feature-request">Feature Request</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  rows="4"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the issue..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Create Ticket
              </button>
            </form>
          </div>

          {/* Tickets List */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Recent Support Tickets</h3>
            </div>
            
            <div className="divide-y divide-gray-700">
              {supportTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-6 hover:bg-gray-750 cursor-pointer"
                  onClick={() => setActiveTicket(ticket)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-medium">{ticket.title}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{ticket.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        <span>Category: {ticket.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateTicketStatus(ticket.id, 'resolved');
                        }}
                        className="p-2 text-green-400 hover:text-green-300"
                      >
                        <SafeIcon icon={FiCheckCircle} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Chat Assistant */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 flex flex-col h-96">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiBot} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <p className="text-gray-400 text-sm">Ready to help with technical issues</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <SafeIcon icon={FiMessageSquare} className="text-4xl mb-4 mx-auto" />
                <p>Ask me about any technical issues or system problems.</p>
              </div>
            ) : (
              chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <SafeIcon icon={message.type === 'user' ? FiUser : FiBot} />
                      <span className="text-xs opacity-75">{message.timestamp}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    
                    {message.actions && (
                      <div className="mt-3 space-y-1">
                        {message.actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => executeAIAction(action)}
                            className="flex items-center space-x-2 w-full text-left px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded text-xs transition-colors"
                          >
                            <SafeIcon icon={FiZap} />
                            <span>{action}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAIChat()}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Ask AI for help..."
              />
              <button
                onClick={handleAIChat}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <SafeIcon icon={FiSend} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIHelpDesk;