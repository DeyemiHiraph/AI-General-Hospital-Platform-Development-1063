import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import useAdminStore from '../../store/adminStore';

const AdminLayout = () => {
  const {isAdminAuthenticated} = useAdminStore();

  if (!isAdminAuthenticated) {
    return <Navigate to="/poweradmin" replace />;
  }

  return <Outlet />;
};

export default AdminLayout;