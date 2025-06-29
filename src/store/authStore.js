import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  
  // User roles and permissions
  roles: {
    patient: {
      name: 'Patient',
      permissions: [
        'view_own_profile',
        'edit_own_profile',
        'book_appointments',
        'view_own_records',
        'upload_records',
        'start_consultations',
        'view_own_consultations'
      ]
    },
    doctor: {
      name: 'Doctor',
      permissions: [
        'view_own_profile',
        'edit_own_profile',
        'view_patient_records',
        'create_prescriptions',
        'manage_appointments',
        'view_consultations',
        'respond_to_consultations',
        'access_medical_tools'
      ]
    },
    admin: {
      name: 'Administrator',
      permissions: [
        'manage_users',
        'view_all_records',
        'manage_departments',
        'view_analytics',
        'system_settings',
        'manage_roles',
        'export_data',
        'view_all_consultations'
      ]
    }
  },

  login: async (credentials) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine role based on email domain or other logic
      let role = 'patient';
      if (credentials.email.includes('@doctor.') || credentials.email.includes('@med.')) {
        role = 'doctor';
      } else if (credentials.email.includes('@admin.') || credentials.email === 'admin@mediverse.ai') {
        role = 'admin';
      }

      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
        medicalId: role === 'patient' ? 'MV' + Math.random().toString(36).substr(2, 8).toUpperCase() : null,
        doctorId: role === 'doctor' ? 'DR' + Math.random().toString(36).substr(2, 8).toUpperCase() : null,
        adminId: role === 'admin' ? 'AD' + Math.random().toString(36).substr(2, 8).toUpperCase() : null,
        joinDate: new Date().toISOString(),
        department: role === 'doctor' ? 'General Practice' : null,
        specialization: role === 'doctor' ? 'Primary Care' : null,
        isActive: true,
        lastLogin: new Date().toISOString()
      };

      set({ user, isAuthenticated: true, loading: false });
      localStorage.setItem('mediverse_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.message };
    }
  },

  register: async (userData) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Default role is patient, but can be changed during registration
      const role = userData.role || 'patient';
      
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
        medicalId: role === 'patient' ? 'MV' + Math.random().toString(36).substr(2, 8).toUpperCase() : null,
        doctorId: role === 'doctor' ? 'DR' + Math.random().toString(36).substr(2, 8).toUpperCase() : null,
        adminId: role === 'admin' ? 'AD' + Math.random().toString(36).substr(2, 8).toUpperCase() : null,
        joinDate: new Date().toISOString(),
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        phone: userData.phone,
        department: userData.department || null,
        specialization: userData.specialization || null,
        licenseNumber: userData.licenseNumber || null,
        isActive: true,
        lastLogin: new Date().toISOString()
      };

      set({ user, isAuthenticated: true, loading: false });
      localStorage.setItem('mediverse_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error: error.message };
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('mediverse_user');
  },

  initializeAuth: () => {
    const stored = localStorage.getItem('mediverse_user');
    if (stored) {
      const user = JSON.parse(stored);
      set({ user, isAuthenticated: true });
    }
  },

  // Permission checking functions
  hasPermission: (permission) => {
    const { user, roles } = get();
    if (!user || !user.role) return false;
    
    const userRole = roles[user.role];
    return userRole && userRole.permissions.includes(permission);
  },

  hasAnyPermission: (permissions) => {
    return permissions.some(permission => get().hasPermission(permission));
  },

  isRole: (role) => {
    const { user } = get();
    return user && user.role === role;
  },

  canAccess: (requiredRoles) => {
    const { user } = get();
    if (!user) return false;
    return requiredRoles.includes(user.role);
  },

  // Update user role (admin only)
  updateUserRole: async (userId, newRole) => {
    const { user, hasPermission } = get();
    if (!hasPermission('manage_roles')) {
      return { success: false, error: 'Insufficient permissions' };
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // If updating own role, update local state
      if (user.id === userId) {
        const updatedUser = { ...user, role: newRole };
        set({ user: updatedUser });
        localStorage.setItem('mediverse_user', JSON.stringify(updatedUser));
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}));

export default useAuthStore;