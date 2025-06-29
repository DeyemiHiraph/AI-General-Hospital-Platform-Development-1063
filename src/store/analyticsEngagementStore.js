import {create} from 'zustand';

const useAnalyticsEngagementStore = create((set, get) => ({
  // User Engagement Data
  userSessions: {},
  userBehavior: {},
  heatmapData: {},
  engagementMetrics: {
    totalPageViews: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    conversionRate: 0
  },

  // Performance Predictions
  performancePredictions: {
    oneMonth: null,
    oneYear: null,
    fiveYear: null
  },

  // User Personalization
  userPreferences: {},
  personalizedContent: {},

  // Traffic Sources
  trafficSources: {
    organic: 0,
    social: 0,
    direct: 0,
    referral: 0,
    email: 0
  },

  // Initialize user session
  initializeUserSession: (userId, source = 'direct') => {
    const sessionId = Math.random().toString(36).substr(2, 9);
    const session = {
      id: sessionId,
      userId,
      startTime: Date.now(),
      source,
      pageViews: [],
      interactions: [],
      isActive: true
    };

    set(state => ({
      userSessions: {
        ...state.userSessions,
        [userId]: session
      }
    }));

    // Update traffic sources
    get().updateTrafficSource(source);
    return sessionId;
  },

  // Track page view
  trackPageView: (userId, pageData) => {
    const timestamp = Date.now();
    const pageView = {
      page: pageData.path,
      title: pageData.title,
      timestamp,
      timeSpent: 0,
      scrollDepth: 0,
      interactions: 0
    };

    set(state => {
      const session = state.userSessions[userId];
      if (!session) return state;

      return {
        userSessions: {
          ...state.userSessions,
          [userId]: {
            ...session,
            pageViews: [...session.pageViews, pageView],
            lastActivity: timestamp
          }
        },
        engagementMetrics: {
          ...state.engagementMetrics,
          totalPageViews: state.engagementMetrics.totalPageViews + 1
        }
      };
    });
  },

  // Track user interaction
  trackUserInteraction: (userId, interactionData) => {
    const interaction = {
      type: interactionData.type,
      element: interactionData.element,
      coordinates: interactionData.coordinates,
      timestamp: Date.now(),
      value: interactionData.value || null
    };

    set(state => {
      const session = state.userSessions[userId];
      if (!session) return state;

      return {
        userSessions: {
          ...state.userSessions,
          [userId]: {
            ...session,
            interactions: [...session.interactions, interaction]
          }
        }
      };
    });

    // Update heatmap data
    get().updateHeatmapData(interaction);
  },

  // Update heatmap data
  updateHeatmapData: (interaction) => {
    if (interaction.type === 'click' && interaction.coordinates) {
      set(state => {
        const key = `${interaction.coordinates.x}-${interaction.coordinates.y}`;
        return {
          heatmapData: {
            ...state.heatmapData,
            [key]: (state.heatmapData[key] || 0) + 1
          }
        };
      });
    }
  },

  // Update traffic source
  updateTrafficSource: (source) => {
    set(state => ({
      trafficSources: {
        ...state.trafficSources,
        [source]: state.trafficSources[source] + 1
      }
    }));
  },

  // Analyze user behavior
  analyzeUserBehavior: (userId) => {
    const state = get();
    const session = state.userSessions[userId];
    if (!session) return null;

    const totalTimeSpent = session.pageViews.reduce((total, page) => total + page.timeSpent, 0);
    const avgTimePerPage = totalTimeSpent / session.pageViews.length;
    const interactionRate = session.interactions.length / session.pageViews.length;

    const behavior = {
      sessionDuration: Date.now() - session.startTime,
      pageViewCount: session.pageViews.length,
      avgTimePerPage,
      interactionRate,
      bounced: session.pageViews.length === 1 && totalTimeSpent < 30000,
      engagementScore: calculateEngagementScore(session)
    };

    set(state => ({
      userBehavior: {
        ...state.userBehavior,
        [userId]: behavior
      }
    }));

    return behavior;
  },

  // Generate personalized content
  generatePersonalizedContent: (userId) => {
    const state = get();
    const behavior = state.userBehavior[userId];
    const session = state.userSessions[userId];

    if (!behavior || !session) return null;

    // Analyze user preferences based on behavior
    const preferences = analyzeUserPreferences(session, behavior);

    // Generate personalized recommendations
    const personalizedContent = {
      recommendedPages: generatePageRecommendations(preferences),
      suggestedActions: generateActionSuggestions(behavior),
      personalizedMessage: generatePersonalizedMessage(preferences),
      contentPriority: determinContentPriority(preferences)
    };

    set(state => ({
      userPreferences: {
        ...state.userPreferences,
        [userId]: preferences
      },
      personalizedContent: {
        ...state.personalizedContent,
        [userId]: personalizedContent
      }
    }));

    return personalizedContent;
  },

  // Predict performance
  predictPerformance: () => {
    const state = get();
    const currentMetrics = state.engagementMetrics;
    const userBehaviors = Object.values(state.userBehavior);

    if (userBehaviors.length === 0) return null;

    // Calculate growth rates
    const avgEngagementScore = userBehaviors.reduce((sum, b) => sum + b.engagementScore, 0) / userBehaviors.length;
    const conversionTrend = calculateConversionTrend(userBehaviors);

    const predictions = {
      oneMonth: {
        expectedUsers: Math.floor(currentMetrics.totalPageViews * 1.1),
        expectedEngagement: avgEngagementScore * 1.05,
        expectedConversion: currentMetrics.conversionRate * (1 + conversionTrend),
        confidence: 0.85
      },
      oneYear: {
        expectedUsers: Math.floor(currentMetrics.totalPageViews * Math.pow(1.1, 12)),
        expectedEngagement: avgEngagementScore * 1.5,
        expectedConversion: currentMetrics.conversionRate * 2,
        confidence: 0.65
      },
      fiveYear: {
        expectedUsers: Math.floor(currentMetrics.totalPageViews * Math.pow(1.1, 60)),
        expectedEngagement: avgEngagementScore * 3,
        expectedConversion: currentMetrics.conversionRate * 5,
        confidence: 0.45
      }
    };

    set({performancePredictions: predictions});
    return predictions;
  },

  // End user session
  endUserSession: (userId) => {
    const state = get();
    const session = state.userSessions[userId];

    if (session) {
      const sessionDuration = Date.now() - session.startTime;

      set(state => ({
        userSessions: {
          ...state.userSessions,
          [userId]: {
            ...session,
            endTime: Date.now(),
            duration: sessionDuration,
            isActive: false
          }
        }
      }));

      // Analyze behavior before session ends
      get().analyzeUserBehavior(userId);
      get().generatePersonalizedContent(userId);
    }
  },

  // Get engagement analytics
  getEngagementAnalytics: () => {
    const state = get();
    const sessions = Object.values(state.userSessions);
    const behaviors = Object.values(state.userBehavior);

    const totalSessions = sessions.length;
    const activeSessions = sessions.filter(s => s.isActive).length;
    const avgSessionDuration = sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / totalSessions;
    const bounceRate = behaviors.filter(b => b.bounced).length / behaviors.length;

    return {
      totalSessions,
      activeSessions,
      avgSessionDuration,
      bounceRate,
      trafficSources: state.trafficSources,
      heatmapData: state.heatmapData,
      performancePredictions: state.performancePredictions
    };
  }
}));

// Helper functions
function calculateEngagementScore(session) {
  const timeWeight = Math.min(session.pageViews.length * 10, 100);
  const interactionWeight = Math.min(session.interactions.length * 5, 50);
  const durationWeight = Math.min((Date.now() - session.startTime) / 60000 * 2, 30);
  return (timeWeight + interactionWeight + durationWeight) / 180 * 100;
}

function analyzeUserPreferences(session, behavior) {
  const pageCategories = session.pageViews.map(pv => categorizeePage(pv.page));
  const mostVisitedCategory = getMostFrequent(pageCategories);

  return {
    preferredCategory: mostVisitedCategory,
    engagementLevel: behavior.engagementScore > 70 ? 'high' : behavior.engagementScore > 40 ? 'medium' : 'low',
    sessionPattern: behavior.sessionDuration > 300000 ? 'long' : behavior.sessionDuration > 60000 ? 'medium' : 'short',
    interactionStyle: behavior.interactionRate > 2 ? 'active' : behavior.interactionRate > 0.5 ? 'moderate' : 'passive'
  };
}

function categorizeePage(path) {
  if (path.includes('department')) return 'medical_services';
  if (path.includes('consultation')) return 'consultations';
  if (path.includes('record')) return 'health_records';
  if (path.includes('appointment')) return 'appointments';
  if (path.includes('analytics')) return 'health_analytics';
  return 'general';
}

function getMostFrequent(arr) {
  return arr.reduce((a, b, i, arr) => 
    arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b, null
  );
}

function generatePageRecommendations(preferences) {
  const recommendations = {
    medical_services: ['/app/departments/cardiology', '/app/departments/neurology'],
    consultations: ['/app/emergency', '/app/consultation/general-practice'],
    health_records: ['/app/records', '/app/profile'],
    appointments: ['/app/appointments', '/app/departments'],
    health_analytics: ['/app/analytics', '/app/dashboard']
  };

  return recommendations[preferences.preferredCategory] || ['/app/dashboard'];
}

function generateActionSuggestions(behavior) {
  const suggestions = [];

  if (behavior.engagementScore < 50) {
    suggestions.push('Complete your health profile for better recommendations');
  }
  if (behavior.pageViewCount < 3) {
    suggestions.push('Explore our medical specialties');
  }
  if (behavior.interactionRate < 1) {
    suggestions.push('Try our AI consultation feature');
  }

  return suggestions;
}

function generatePersonalizedMessage(preferences) {
  const messages = {
    high: "Welcome back! Your health journey continues with our advanced AI specialists.",
    medium: "Good to see you again! Discover new ways to improve your health.",
    low: "Welcome! Let's make your health journey more engaging."
  };

  return messages[preferences.engagementLevel];
}

function determinContentPriority(preferences) {
  return {
    primary: preferences.preferredCategory,
    secondary: preferences.engagementLevel === 'high' ? 'advanced_features' : 'basic_features',
    personalization: preferences.interactionStyle
  };
}

function calculateConversionTrend(behaviors) {
  const recentBehaviors = behaviors.slice(-10);
  const avgRecentScore = recentBehaviors.reduce((sum, b) => sum + b.engagementScore, 0) / recentBehaviors.length;
  return (avgRecentScore - 50) / 100; // Normalized trend
}

export default useAnalyticsEngagementStore;