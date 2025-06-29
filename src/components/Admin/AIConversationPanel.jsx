import React, {useState, useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiMessageSquare, FiSend, FiBot, FiUser, FiBarChart3, FiDownload, FiCopy} = FiIcons;

const AIConversationPanel = ({darkMode}) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      type: 'ai',
      content: "Hello! I'm your AI Analytics Assistant. Ask me anything about your patient data, trends, or insights. For example, try asking 'Show me monthly patient trends' or 'What's our busiest department?'",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const quickQuestions = [
    "Show me monthly patient trends",
    "What region has the highest patient volume?",
    "Analyze consultation satisfaction scores",
    "Find correlation between departments and wait times",
    "Generate a patient demographics report",
    "What are our peak consultation hours?",
    "Show me AI prediction accuracy trends",
    "Compare this month vs last month performance"
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI processing and response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setConversation(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (query) => {
    const responses = {
      'monthly patient trends': {
        content: "Based on the data analysis, here are the monthly patient trends:",
        chart: {
          type: 'line',
          data: [
            {month: 'Jan', patients: 1200},
            {month: 'Feb', patients: 1350},
            {month: 'Mar', patients: 1180},
            {month: 'Apr', patients: 1420},
            {month: 'May', patients: 1650}
          ]
        },
        insights: [
          "📈 Patient volume increased by 37.5% from January to May",
          "🔍 March showed a temporary dip (-12.6%) likely due to seasonal factors",
          "⚡ Average growth rate: 8.2% per month",
          "🎯 Projected June volume: ~1,750 patients"
        ]
      },
      'demographics': {
        content: "Here's the patient demographics breakdown:",
        chart: {
          type: 'pie',
          data: [
            {name: 'Age 18-35', value: 35, color: '#3b82f6'},
            {name: 'Age 36-50', value: 28, color: '#10b981'},
            {name: 'Age 51-65', value: 22, color: '#f59e0b'},
            {name: 'Age 65+', value: 15, color: '#ef4444'}
          ]
        },
        insights: [
          "👥 35% of patients are young adults (18-35)",
          "💼 Working age (36-50) represents 28% of our patient base",
          "🧓 Senior patients (65+) account for 15% of consultations",
          "📊 Gender distribution: 52% female, 48% male"
        ]
      }
    };

    // Simple keyword matching for demo
    const lowercaseQuery = query.toLowerCase();
    if (lowercaseQuery.includes('trend') || lowercaseQuery.includes('monthly')) {
      return {
        type: 'ai',
        content: responses['monthly patient trends'].content,
        chart: responses['monthly patient trends'].chart,
        insights: responses['monthly patient trends'].insights,
        timestamp: new Date().toLocaleTimeString()
      };
    } else if (lowercaseQuery.includes('demographic')) {
      return {
        type: 'ai',
        content: responses['demographics'].content,
        chart: responses['demographics'].chart,
        insights: responses['demographics'].insights,
        timestamp: new Date().toLocaleTimeString()
      };
    } else {
      return {
        type: 'ai',
        content: `I analyzed your query: "${query}". Here's what I found:\n\n📊 Based on current data patterns, I can provide insights on patient volumes, satisfaction scores, and departmental performance. The data shows consistent growth trends with some seasonal variations.\n\n💡 Would you like me to dive deeper into any specific metric or generate a detailed report?`,
        timestamp: new Date().toLocaleTimeString()
      };
    }
  };

  const handleQuickQuestion = (question) => {
    setMessage(question);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const exportConversation = () => {
    const conversationText = conversation
      .map(msg => `${msg.type.toUpperCase()}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([conversationText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-conversation.txt';
    a.click();
    URL.revokeObjectURL(url);
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
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiBot} className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Ask AI Anything</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Conversational analytics powered by advanced AI
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={exportConversation}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <SafeIcon icon={FiDownload} />
              <span>Export Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
        <h4 className="font-semibold mb-4">💡 Try asking these questions:</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className={`text-left p-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
              }`}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border flex flex-col h-96`}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {conversation.map((msg, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.type === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                }`}>
                  <SafeIcon icon={msg.type === 'user' ? FiUser : FiBot} className="text-white text-sm" />
                </div>
                
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  
                  {/* AI Insights */}
                  {msg.insights && (
                    <div className="mt-3 space-y-2">
                      {msg.insights.map((insight, idx) => (
                        <div key={idx} className={`p-2 rounded-lg ${
                          darkMode ? 'bg-gray-600' : 'bg-white'
                        }`}>
                          <p className="text-xs">{insight}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  {msg.type === 'ai' && (
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => copyToClipboard(msg.content)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <SafeIcon icon={FiCopy} className="text-xs" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <SafeIcon icon={FiBarChart3} className="text-xs" />
                      </button>
                    </div>
                  )}
                  
                  <p className={`text-xs mt-2 ${
                    msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <SafeIcon icon={FiBot} className="text-white text-sm" />
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask me about patient trends, demographics, performance metrics..."
                className={`w-full px-4 py-3 rounded-lg resize-none ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                rows="2"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SafeIcon icon={FiSend} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIConversationPanel;