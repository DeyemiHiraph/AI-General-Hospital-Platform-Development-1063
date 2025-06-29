import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../common/SafeIcon';
import useMedicalStore from '../store/medicalStore';
import useAuthStore from '../store/authStore';
import * as FiIcons from 'react-icons/fi';

const { 
  FiMessageSquare, FiMic, FiMicOff, FiSend, FiUpload, 
  FiUser, FiBot, FiClock, FiHeart, FiActivity 
} = FiIcons;

const ConsultationPage = () => {
  const { departmentId } = useParams();
  const { departments, startConsultation, addMessage, currentConsultation } = useMedicalStore();
  const { user } = useAuthStore();
  
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const department = departments.find(d => d.id === departmentId);
  
  useEffect(() => {
    if (department && !currentConsultation) {
      startConsultation(departmentId);
      // Add welcome message
      setTimeout(() => {
        addMessage({
          type: 'ai',
          content: `Hello ${user?.name}! I'm your AI ${department.name} specialist. How can I help you today?`,
          sender: `Dr. AI ${department.name}`
        });
      }, 1000);
    }
  }, [department, departmentId, startConsultation, currentConsultation, addMessage, user]);

  useEffect(() => {
    scrollToBottom();
  }, [currentConsultation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      type: 'user',
      content: message,
      sender: user?.name
    };

    addMessage(userMessage);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your symptoms, I'd recommend some initial assessments. Can you tell me more about when this started?",
        "I understand your concern. Let me analyze this information and provide you with some recommendations.",
        "Thank you for that detail. Based on what you've described, here are some potential considerations...",
        "I see. This could be related to several factors. Let me walk you through some possibilities and next steps.",
        "That's helpful information. I'd like to suggest some diagnostic approaches that might be beneficial."
      ];

      const aiResponse = {
        type: 'ai',
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: `Dr. AI ${department?.name}`
      };

      addMessage(aiResponse);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success('Voice recording started');
      // Simulate recording end after 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        setMessage('I have been experiencing chest pain for the past few days...');
        toast.success('Voice message converted to text');
      }, 3000);
    } else {
      toast.info('Recording stopped');
    }
  };

  if (!department) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Department not found</h2>
          <Link to="/app/departments" className="text-medical-600 hover:text-medical-500">
            Browse all departments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg medical-card">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-medical-50 to-primary-50 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-medical-500 to-primary-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiActivity} className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{department.name}</h1>
              <p className="text-gray-600">{department.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">AI Specialist Online</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Session ID</p>
            <p className="font-mono text-xs text-gray-400">{currentConsultation?.id}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {currentConsultation?.messages?.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                msg.type === 'user' 
                  ? 'bg-medical-500' 
                  : 'bg-gradient-to-r from-primary-500 to-medical-500'
              }`}>
                <SafeIcon icon={msg.type === 'user' ? FiUser : FiBot} className="text-white" />
              </div>
              <div className={`rounded-2xl px-4 py-3 ${
                msg.type === 'user'
                  ? 'bg-medical-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.type === 'user' ? 'text-medical-100' : 'text-gray-500'
                }`}>
                  {msg.sender} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-medical-500 flex items-center justify-center">
                <SafeIcon icon={FiBot} className="text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-end space-x-4">
          <button className="p-3 text-gray-500 hover:text-medical-600 hover:bg-medical-50 rounded-lg transition-colors">
            <SafeIcon icon={FiUpload} className="text-xl" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your symptoms or ask a question..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-transparent resize-none"
              rows="1"
              style={{ minHeight: '48px' }}
            />
          </div>

          <button
            onClick={toggleRecording}
            className={`p-3 rounded-lg transition-all duration-300 ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-gray-500 hover:text-medical-600 hover:bg-medical-50'
            }`}
          >
            <SafeIcon icon={isRecording ? FiMicOff : FiMic} className="text-xl" />
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-3 bg-gradient-to-r from-medical-500 to-primary-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={FiSend} className="text-xl" />
          </button>
        </div>

        {isRecording && (
          <div className="mt-3 flex items-center justify-center space-x-2 text-red-600">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Recording... Speak now</span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {[
            'I need help with symptoms',
            'Review my test results',
            'Medication questions',
            'Follow-up appointment'
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-medical-50 hover:text-medical-700 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;