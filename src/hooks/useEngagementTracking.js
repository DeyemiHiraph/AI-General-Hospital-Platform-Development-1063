import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useAnalyticsEngagementStore from '../store/analyticsEngagementStore';
import useAuthStore from '../store/authStore';

const useEngagementTracking = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const {
    initializeUserSession,
    trackPageView,
    trackUserInteraction,
    endUserSession,
    analyzeUserBehavior,
    generatePersonalizedContent
  } = useAnalyticsEngagementStore();

  const sessionStartTime = useRef(Date.now());
  const currentPage = useRef(null);

  // Initialize session on mount
  useEffect(() => {
    if (user) {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('utm_source') || 
                    urlParams.get('ref') || 
                    document.referrer ? 'referral' : 'direct';
      
      initializeUserSession(user.id, source);
    }

    // Cleanup on unmount
    return () => {
      if (user) {
        endUserSession(user.id);
      }
    };
  }, [user, initializeUserSession, endUserSession]);

  // Track page views
  useEffect(() => {
    if (user && location.pathname !== currentPage.current) {
      const timeSpent = currentPage.current ? Date.now() - sessionStartTime.current : 0;
      
      // Update time spent on previous page
      if (currentPage.current && timeSpent > 1000) { // At least 1 second
        trackUserInteraction(user.id, {
          type: 'page_time',
          element: currentPage.current,
          value: timeSpent
        });
      }

      // Track new page view
      trackPageView(user.id, {
        path: location.pathname,
        title: document.title,
        referrer: currentPage.current
      });

      currentPage.current = location.pathname;
      sessionStartTime.current = Date.now();
    }
  }, [location.pathname, user, trackPageView, trackUserInteraction]);

  // Track click interactions
  useEffect(() => {
    const handleClick = (event) => {
      if (user) {
        const rect = event.target.getBoundingClientRect();
        trackUserInteraction(user.id, {
          type: 'click',
          element: event.target.tagName + (event.target.className ? '.' + event.target.className.split(' ').join('.') : ''),
          coordinates: {
            x: Math.round(rect.left + rect.width / 2),
            y: Math.round(rect.top + rect.height / 2)
          },
          value: event.target.textContent || event.target.value
        });
      }
    };

    const handleScroll = () => {
      if (user) {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        trackUserInteraction(user.id, {
          type: 'scroll',
          element: 'window',
          value: scrollDepth
        });
      }
    };

    const handleFormSubmit = (event) => {
      if (user) {
        trackUserInteraction(user.id, {
          type: 'form_submit',
          element: event.target.id || event.target.className,
          value: 'form_submitted'
        });
      }
    };

    // Add event listeners
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('submit', handleFormSubmit);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, [user, trackUserInteraction]);

  // Periodic behavior analysis
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        analyzeUserBehavior(user.id);
        generatePersonalizedContent(user.id);
      }, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, [user, analyzeUserBehavior, generatePersonalizedContent]);

  return {
    trackInteraction: (data) => {
      if (user) {
        trackUserInteraction(user.id, data);
      }
    }
  };
};

export default useEngagementTracking;