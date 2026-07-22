import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function AuthLayout() {
  const navigate = useNavigate();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/');
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto"
    >
      {/* Decorative ambient background blur elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Modal Container */}
      <div className="relative w-full max-w-[440px] z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button (X) */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all border-0 cursor-pointer z-30 active:scale-95 shadow-sm"
          aria-label="Close modal"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M13 1L1 13M1 1L13 13" />
          </svg>
        </button>

        {/* Form Content */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}


