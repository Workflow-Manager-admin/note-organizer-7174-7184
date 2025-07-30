import React from 'react';

// PUBLIC_INTERFACE
function TopNav({ title, accent }) {
  return (
    <nav className="top-nav" style={{
      background: '#fff',
      borderBottom: `2px solid ${accent}`,
      height: 56,
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem',
      fontWeight: 600,
      fontSize: 22,
      letterSpacing: '0.02em',
      color: '#282c34',
      zIndex: 2
    }}>
      <span style={{
        color: accent,
        fontWeight: 700,
        fontFamily: 'inherit',
        marginRight: 8,
      }}>📝</span>
      <span>{title}</span>
    </nav>
  );
}

export default TopNav;
