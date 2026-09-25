import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { adminService } from '../services/api';

const ProtectedRoute = () => {
  const isAuth = adminService.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
