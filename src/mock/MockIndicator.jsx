// MOCK INDICATOR - FOR LOCAL DEVELOPMENT ONLY
// This entire mock folder can be deleted when no longer needed

import React from 'react';
import { isMockMode, toggleMockMode } from './mockSystem';

export default function MockIndicator() {
  // Only show in development
  if (!import.meta.env.DEV) return null;

  const isActive = isMockMode();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        background: isActive ? 'rgba(255, 165, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        fontFamily: 'monospace',
        border: `2px solid ${isActive ? '#ff8c00' : '#333'}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        userSelect: 'none'
      }}
      onClick={toggleMockMode}
      title="Click to toggle mock mode"
    >
      <span
        style={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: isActive ? '#00ff00' : '#ff0000',
          animation: isActive ? 'pulse 2s infinite' : 'none'
        }}
      />
      <span>
        {isActive ? '🎭 MOCK MODE' : '📡 REAL API'}
      </span>
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}