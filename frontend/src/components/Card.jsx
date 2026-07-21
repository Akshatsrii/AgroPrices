import React from 'react';
import './Card.css';

export function Card({ children, className = '', hoverable = false, ...props }) {
  return (
    <div className={`card ${hoverable ? 'hover-lift' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}
