import React from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiPlay, FiUsers, FiHeart, FiMessageSquare, FiStar, FiShield} = FiIcons;

const DemoThumbnail = ({onClick}) => {
  const features = [
    {icon: FiUsers, label: "70+ Specialists"},
    {icon: FiHeart, label: "24/7 Available"},
    {icon: FiMessageSquare, label: "AI Consultations"},
    {icon: FiShield, label: "Secure & Private"}
  ];

  return (
    <motion.div
      whileHover={{scale: 1.02}}
      whileTap={{scale: 0.98}}
      onClick={onClick}
      className="relative bg-gradient-to-br from-medical-500 to-primary-500 rounded-xl overflow-hidden cursor-pointer shadow-2xl w-full max-w-2xl mx-auto"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
      </div>

      <div className="relative p-6 sm:p-8 text-white">
        {/* Play Button */}
        <motion.div
          whileHover={{scale: 1.1}}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
            <SafeIcon icon={FiPlay} className="text-xl sm:text-2xl text-medical-600 ml-1" />
          </div>
        </motion.div>

        {/* Title */}
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">See MediVerse AI in Action</h3>
          <p className="text-medical-100 text-sm sm:text-base">
            6-minute walkthrough showing how to use our AI healthcare platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: index * 0.1}}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3"
            >
              <SafeIcon icon={feature.icon} className="text-white text-sm sm:text-base flex-shrink-0" />
              <span className="text-xs sm:text-sm text-medical-100 truncate">{feature.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-4 sm:space-x-6 text-center">
          <div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              <SafeIcon icon={FiStar} className="text-yellow-300 text-sm" />
              <span className="font-bold text-base sm:text-lg">4.9</span>
            </div>
            <p className="text-xs text-medical-100">Patient Rating</p>
          </div>
          <div className="w-px bg-white/20"></div>
          <div>
            <p className="font-bold text-base sm:text-lg">6:15</p>
            <p className="text-xs text-medical-100">Duration</p>
          </div>
          <div className="w-px bg-white/20"></div>
          <div>
            <p className="font-bold text-base sm:text-lg">12k+</p>
            <p className="text-xs text-medical-100">Views</p>
          </div>
        </div>

        {/* Hover Effect */}
        <motion.div
          initial={{opacity: 0}}
          whileHover={{opacity: 1}}
          className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{scale: 0.8}}
              whileHover={{scale: 1}}
              className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-2 sm:mb-3 mx-auto"
            >
              <SafeIcon icon={FiPlay} className="text-xl sm:text-2xl text-medical-600 ml-1" />
            </motion.div>
            <p className="font-semibold text-sm sm:text-base">Watch Demo</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DemoThumbnail;