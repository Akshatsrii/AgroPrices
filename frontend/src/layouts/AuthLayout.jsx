import React from 'react';
import { Outlet } from 'react-router-dom';
import '../pages/auth/Auth.css';

export function AuthLayout() {
  return (
    <div className="auth-layout-container">
      <div className="auth-mobile-container">
        <Outlet />
      </div>
    </div>
  );
}
