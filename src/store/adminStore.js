import {create} from 'zustand';

const useAdminStore = create((set, get) => ({
  // Admin Authentication
  adminUser: null,
  isAdminAuthenticated: false,
  adminLoading: false,

  // Admin Roles & Permissions
  adminRoles: {
    'power-admin': {
      name: 'Power Admin',
      permissions: [
        'manage_users',
        'manage_teams', 
        'manage_roles',
        'view_analytics',
        'manage_content',
        'system_settings',
        'ai_helpdesk'
      ]
    },
    'editor': {
      name: 'Editor',
      permissions: [
        'create_content',
        'edit_content',
        'view_analytics'
      ]
    },
    'contributor': {
      name: 'Contributor',
      permissions: [
        'create_content',
        'edit_own_content'
      ]
    }
  },

  // System Health
  systemHealth: {
    apiUsage: 8547,
    activeUsers: 342,
    serverLoad: 68,
    aiUsage: 1247,
    uptime: 99.8
  },

  // Admin Authentication
  adminLogin: async (credentials) => {
    set({adminLoading: true});
    
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple credential check
      const validEmails = [
        'admin@mediverse.ai',
        'editor@mediverse.ai', 
        'contributor@mediverse.ai'
      ];

      if (!validEmails.includes(credentials.email)) {
        throw new Error('Invalid admin credentials');
      }

      // Determine role based on email
      let role = 'contributor';
      if (credentials.email === 'admin@mediverse.ai') {
        role = 'power-admin';
      } else if (credentials.email === 'editor@mediverse.ai') {
        role = 'editor';
      }

      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        name: role === 'power-admin' ? 'Power Admin' : role === 'editor' ? 'Content Editor' : 'Contributor',
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
        loginTime: new Date().toISOString()
      };

      set({
        adminUser: user,
        isAdminAuthenticated: true,
        adminLoading: false
      });

      return {success: true};
    } catch (error) {
      set({adminLoading: false});
      return {success: false, error: error.message};
    }
  },

  adminLogout: () => {
    set({
      adminUser: null,
      isAdminAuthenticated: false
    });
  },

  // System Health Monitoring
  updateSystemHealth: () => {
    const newHealth = {
      apiUsage: Math.floor(Math.random() * 10000) + 5000,
      activeUsers: Math.floor(Math.random() * 500) + 200,
      serverLoad: Math.floor(Math.random() * 50) + 30,
      aiUsage: Math.floor(Math.random() * 1000) + 500,
      uptime: 99.8 + (Math.random() * 0.2),
      lastUpdated: new Date().toISOString()
    };

    set({systemHealth: newHealth});
    return newHealth;
  }
}));

export default useAdminStore;