import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import useAuthStore from '../store/authStore';
import useAnalyticsEngagementStore from '../store/analyticsEngagementStore';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiTrendingUp, FiTarget } = FiIcons;

const PersonalizedWelcome = () => {
  const { user } = useAuthStore();
  const { personalizedContent, userPreferences } = useAnalyticsEngagementStore();
  const [welcomeData, setWelcomeData] = useState(null);

  useEffect(() => {
    if (user && personalizedContent[user.id]) {
      setWelcomeData(personalizedContent[user.id]);
    }
  }, [user, personalizedContent]);

  if (!user || !welcomeData) return null;

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const preferences = userPreferences[user.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-medical-500 to-primary-500 rounded-xl p-6 text-white mb-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {getTimeOfDay()}, {user.name}! 👋
          </h2>
          <p className="text-white/90 text-lg mb-4">
            {welcomeData.personalizedMessage}
          </p>
          
          {/* Personalized Stats */}
          <div className="flex items-center space-x-6 text-sm">
            {preferences?.engagementLevel && (
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTrendingUp} className="text-white/80" />
                <span>Engagement: {preferences.engagementLevel}</span>
              </div>
            )}
            {preferences?.preferredCategory && (
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTarget} className="text-white/80" />
                <span>Interest: {preferences.preferredCategory.replace('_', ' ')}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiHeart} className="text-white/80" />
              <span>Member since {new Date(user.joinDate).getFullYear()}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <p className="text-xs text-white/70">ID: {user.medicalId}</p>
        </div>
      </div>

      {/* Personalized Suggestions */}
      {welcomeData.suggestedActions && welcomeData.suggestedActions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm text-white/80 mb-2">Suggestions for you:</p>
          <div className="flex flex-wrap gap-2">
            {welcomeData.suggestedActions.slice(0, 2).map((suggestion, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/90"
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PersonalizedWelcome;