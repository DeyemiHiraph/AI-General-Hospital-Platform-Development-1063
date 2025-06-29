import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import useDemoStore from '../../store/demoStore';
import * as FiIcons from 'react-icons/fi';

const {
  FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize2, FiMinimize2,
  FiSkipForward, FiSkipBack, FiX, FiDownload, FiShare2, FiUsers,
  FiMessageSquare, FiCalendar, FiFileText, FiActivity, FiHeart
} = FiIcons;

const VideoDemo = ({isOpen, onClose}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(375); // 6 minutes 15 seconds
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  
  const {trackDemoView, trackChapterView} = useDemoStore();
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Demo chapters/sections
  const chapters = [
    {
      id: 0,
      title: "Welcome to MediVerse AI",
      description: "Introduction to your AI-powered healthcare platform",
      timestamp: 0,
      duration: 45,
      icon: FiHeart,
      highlights: ["70+ Medical Specialties", "24/7 Availability", "AI-Powered Consultations"],
      content: "Welcome to MediVerse AI! Your comprehensive AI-powered healthcare platform with access to 70+ medical specialties, available 24/7 for all your healthcare needs."
    },
    {
      id: 1,
      title: "Getting Started",
      description: "Creating your account and setting up your profile",
      timestamp: 45,
      duration: 60,
      icon: FiUsers,
      highlights: ["Quick Registration", "Health Profile Setup", "Secure Data Protection"],
      content: "Let's start by creating your account. Simply enter your details, set up your health profile, and you're ready to access our AI specialists. All your data is encrypted and HIPAA compliant."
    },
    {
      id: 2,
      title: "Consulting with AI Specialists",
      description: "How to start consultations with our AI doctors",
      timestamp: 105,
      duration: 90,
      icon: FiMessageSquare,
      highlights: ["Choose Specialty", "Voice & Text Chat", "Real-time Diagnosis"],
      content: "Browse our 70+ medical departments and start a consultation instantly. Our AI specialists can communicate via text or voice, providing real-time medical analysis and recommendations."
    },
    {
      id: 3,
      title: "Managing Health Records",
      description: "Upload and organize your medical documents",
      timestamp: 195,
      duration: 75,
      icon: FiFileText,
      highlights: ["Document Upload", "AI Analysis", "Secure Storage"],
      content: "Easily upload your medical records, lab results, and prescriptions. Our AI automatically analyzes and organizes your documents, making them searchable and accessible to your specialists."
    },
    {
      id: 4,
      title: "Booking Appointments",
      description: "Schedule follow-ups and manage your calendar",
      timestamp: 270,
      duration: 60,
      icon: FiCalendar,
      highlights: ["Easy Scheduling", "Virtual Meetings", "Appointment Reminders"],
      content: "Schedule appointments with ease. Choose from virtual consultations or in-person visits. Get automatic reminders and manage your entire healthcare calendar in one place."
    },
    {
      id: 5,
      title: "Health Analytics & Insights",
      description: "Track your health journey with personalized insights",
      timestamp: 330,
      duration: 45,
      icon: FiActivity,
      highlights: ["Health Trends", "Progress Tracking", "AI Insights"],
      content: "Monitor your health journey with comprehensive analytics. Track vital signs, medication adherence, and receive AI-powered insights about your health trends and recommendations."
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0);
      trackDemoView();
      // Auto-hide sidebar on mobile
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    }
  }, [isOpen, trackDemoView]);

  useEffect(() => {
    let interval;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          
          // Update current chapter based on timestamp
          const chapter = chapters.find(ch => 
            newTime >= ch.timestamp && newTime < ch.timestamp + ch.duration
          );
          if (chapter && chapter.id !== currentChapter) {
            setCurrentChapter(chapter.id);
            trackChapterView(chapter.id);
          }
          
          // Auto-pause at end
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen, currentChapter, chapters, duration, trackChapterView]);

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowControls(true);
    }
  }, [isPlaying]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleSeek = (percentage) => {
    const newTime = Math.floor((percentage / 100) * duration);
    setCurrentTime(newTime);
    
    // Update chapter
    const chapter = chapters.find(ch => 
      newTime >= ch.timestamp && newTime < ch.timestamp + ch.duration
    );
    if (chapter) {
      setCurrentChapter(chapter.id);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const jumpToChapter = (chapterIndex) => {
    const chapter = chapters[chapterIndex];
    if (chapter) {
      setCurrentTime(chapter.timestamp);
      setCurrentChapter(chapterIndex);
      trackChapterView(chapter.id);
      // Hide sidebar on mobile after selection
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    }
  };

  const skipForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    setCurrentTime(newTime);
  };

  const skipBackward = () => {
    const newTime = Math.max(currentTime - 10, 0);
    setCurrentTime(newTime);
  };

  if (!isOpen) return null;

  const currentChapterData = chapters[currentChapter];
  const progressPercentage = (currentTime / duration) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          ref={containerRef}
          initial={{scale: 0.9, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          exit={{scale: 0.9, opacity: 0}}
          className={`bg-white rounded-xl overflow-hidden shadow-2xl w-full h-full max-w-7xl ${
            isFullscreen ? 'max-h-full' : 'max-h-[95vh]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-medical-500 to-primary-500 text-white p-3 sm:p-4 flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold truncate">MediVerse AI Demo</h2>
              <p className="text-medical-100 text-xs sm:text-sm truncate">Patient Experience Walkthrough</p>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiFileText} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <SafeIcon icon={isFullscreen ? FiMinimize2 : FiMaximize2} />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiX} />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-full overflow-hidden">
            {/* Main Video Area */}
            <div className={`flex-1 bg-gradient-to-br from-gray-900 to-gray-800 relative ${
              showSidebar && window.innerWidth >= 768 ? '' : 'w-full'
            }`}>
              {/* Simulated Video Content */}
              <div 
                className="w-full h-full flex items-center justify-center relative cursor-pointer min-h-[300px] sm:min-h-[400px]"
                onClick={() => setShowControls(!showControls)}
                onMouseMove={() => setShowControls(true)}
              >
                {/* Chapter Content Display */}
                <div className="text-center text-white px-4 sm:px-6 max-w-4xl">
                  <motion.div
                    key={currentChapter}
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className="mb-6 sm:mb-8"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-medical-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <SafeIcon icon={currentChapterData.icon} className="text-xl sm:text-2xl md:text-3xl" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">{currentChapterData.title}</h3>
                    <p className="text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg">{currentChapterData.description}</p>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                      {currentChapterData.content}
                    </p>
                  </motion.div>

                  {/* Chapter Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
                    {currentChapterData.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.2}}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4"
                      >
                        <p className="text-xs sm:text-sm font-medium">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Time Indicator */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 rounded-lg px-2 sm:px-3 py-1">
                    <span className="text-white text-xs sm:text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Play Button Overlay */}
                {!isPlaying && (
                  <motion.button
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    onClick={handlePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <SafeIcon icon={FiPlay} className="text-2xl sm:text-3xl text-gray-800 ml-1" />
                    </div>
                  </motion.button>
                )}

                {/* Controls Overlay */}
                <AnimatePresence>
                  {showControls && (
                    <motion.div
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: 20}}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4"
                    >
                      {/* Progress Bar */}
                      <div className="mb-3 sm:mb-4">
                        <div 
                          className="w-full bg-white/20 rounded-full h-1.5 sm:h-2 cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                            handleSeek(percentage);
                          }}
                        >
                          <div
                            className="bg-medical-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                            style={{width: `${progressPercentage}%`}}
                          />
                        </div>
                      </div>

                      {/* Control Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <button
                            onClick={skipBackward}
                            className="text-white hover:text-medical-400 transition-colors"
                          >
                            <SafeIcon icon={FiSkipBack} className="text-lg sm:text-xl" />
                          </button>
                          
                          <button
                            onClick={handlePlayPause}
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-medical-500 rounded-full flex items-center justify-center hover:bg-medical-600 transition-colors"
                          >
                            <SafeIcon 
                              icon={isPlaying ? FiPause : FiPlay} 
                              className="text-white text-lg sm:text-xl"
                            />
                          </button>
                          
                          <button
                            onClick={skipForward}
                            className="text-white hover:text-medical-400 transition-colors"
                          >
                            <SafeIcon icon={FiSkipForward} className="text-lg sm:text-xl" />
                          </button>

                          <div className="text-white text-xs sm:text-sm hidden sm:block">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <div className="hidden sm:flex items-center space-x-2">
                            <button
                              onClick={toggleMute}
                              className="text-white hover:text-medical-400 transition-colors"
                            >
                              <SafeIcon icon={isMuted ? FiVolumeX : FiVolume2} />
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={isMuted ? 0 : volume}
                              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                              className="w-16 sm:w-20"
                            />
                          </div>

                          <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-medical-400 transition-colors"
                          >
                            <SafeIcon icon={isFullscreen ? FiMinimize2 : FiMaximize2} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar - Chapters */}
            <AnimatePresence>
              {showSidebar && (
                <motion.div
                  initial={{x: 300, opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  exit={{x: 300, opacity: 0}}
                  transition={{duration: 0.3}}
                  className={`${
                    window.innerWidth < 768 
                      ? 'absolute top-0 right-0 h-full w-80 max-w-[90vw] z-10 shadow-2xl' 
                      : 'relative w-80'
                  } bg-gray-50 border-l border-gray-200 overflow-y-auto`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">Demo Chapters</h3>
                      <button
                        onClick={() => setShowSidebar(false)}
                        className="md:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiX} />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {chapters.map((chapter, index) => (
                        <motion.button
                          key={chapter.id}
                          onClick={() => jumpToChapter(index)}
                          whileHover={{scale: 1.02}}
                          whileTap={{scale: 0.98}}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            currentChapter === index
                              ? 'border-medical-500 bg-medical-50 text-medical-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              currentChapter === index
                                ? 'bg-medical-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              <SafeIcon icon={chapter.icon} className="text-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm">{chapter.title}</h4>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {chapter.description}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-400">
                                  {formatTime(chapter.timestamp)}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {formatTime(chapter.duration)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-medical-500 to-primary-500 rounded-lg text-white">
                      <h4 className="font-semibold mb-2">Ready to Get Started?</h4>
                      <p className="text-sm text-medical-100 mb-3">
                        Join thousands of patients using MediVerse AI for their healthcare needs.
                      </p>
                      <button 
                        onClick={onClose}
                        className="w-full bg-white text-medical-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                      >
                        Start Free Consultation
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Overlay for sidebar */}
            {showSidebar && window.innerWidth < 768 && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="fixed inset-0 bg-black/50 z-5 md:hidden"
                onClick={() => setShowSidebar(false)}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoDemo;