import React from 'react';
import useAuthStore from '../../store/authStore';

const RoleBasedComponent = ({ 
  roles = [], 
  permissions = [], 
  children, 
  fallback = null 
}) => {
  const { canAccess, hasAnyPermission } = useAuthStore();

  // Check role-based access
  if (roles.length > 0 && !canAccess(roles)) {
    return fallback;
  }

  // Check permission-based access
  if (permissions.length > 0 && !hasAnyPermission(permissions)) {
    return fallback;
  }

  return children;
};

export default RoleBasedComponent;