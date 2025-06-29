import {create} from 'zustand';

const useDemoStore = create((set, get) => ({
  // Demo State
  demoViews: 0,
  demoRating: 4.9,
  demoFeedback: [],
  userProgress: {},

  // Demo Analytics
  chapterViews: {
    0: 12847, // Welcome
    1: 11234, // Getting Started
    2: 10567, // AI Consultations
    3: 9876,  // Health Records
    4: 9234,  // Appointments
    5: 8765   // Analytics
  },

  // User Demo Progress Tracking
  trackDemoView: (userId = 'anonymous') => {
    set(state => ({
      demoViews: state.demoViews + 1,
      userProgress: {
        ...state.userProgress,
        [userId]: {
          ...state.userProgress[userId],
          viewCount: (state.userProgress[userId]?.viewCount || 0) + 1,
          lastViewed: new Date().toISOString()
        }
      }
    }));
  },

  // Track Chapter Progress
  trackChapterView: (chapterId, userId = 'anonymous') => {
    set(state => ({
      chapterViews: {
        ...state.chapterViews,
        [chapterId]: state.chapterViews[chapterId] + 1
      },
      userProgress: {
        ...state.userProgress,
        [userId]: {
          ...state.userProgress[userId],
          chaptersViewed: [
            ...(state.userProgress[userId]?.chaptersViewed || []),
            chapterId
          ].filter((id, index, arr) => arr.indexOf(id) === index), // Remove duplicates
          lastChapter: chapterId,
          lastViewed: new Date().toISOString()
        }
      }
    }));
  },

  // Submit Demo Feedback
  submitDemoFeedback: async (feedback) => {
    const newFeedback = {
      id: Math.random().toString(36).substr(2, 9),
      rating: feedback.rating,
      comment: feedback.comment,
      helpful: feedback.helpful,
      timestamp: new Date().toISOString(),
      userId: feedback.userId || 'anonymous'
    };

    set(state => ({
      demoFeedback: [...state.demoFeedback, newFeedback]
    }));

    // Recalculate average rating
    const {demoFeedback} = get();
    const totalRating = demoFeedback.reduce((sum, fb) => sum + fb.rating, 0);
    const avgRating = totalRating / demoFeedback.length;

    set({demoRating: Number(avgRating.toFixed(1))});

    return newFeedback;
  },

  // Get Demo Analytics
  getDemoAnalytics: () => {
    const state = get();
    const totalUsers = Object.keys(state.userProgress).length;
    const completionRate = Object.values(state.userProgress)
      .filter(progress => progress.chaptersViewed?.length >= 6).length / totalUsers;

    return {
      totalViews: state.demoViews,
      uniqueUsers: totalUsers,
      averageRating: state.demoRating,
      completionRate: (completionRate * 100).toFixed(1),
      chapterPopularity: state.chapterViews,
      feedbackCount: state.demoFeedback.length
    };
  },

  // Get User Demo Progress
  getUserProgress: (userId) => {
    const state = get();
    return state.userProgress[userId] || {
      viewCount: 0,
      chaptersViewed: [],
      lastChapter: 0,
      lastViewed: null
    };
  }
}));

export default useDemoStore;