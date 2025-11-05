import React from 'react';

const InvitesAndTestingSimple = () => {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🎉 Invites & Testing Page</h1>
      <p>This page is working! If you can see this, the routing is successful.</p>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '10px',
        margin: '20px auto',
        maxWidth: '600px'
      }}>
        <h2>📧 Quick Test</h2>
        <p>The component is rendering correctly!</p>
        <button style={{
          background: '#4ecdc4',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Test Button
        </button>
      </div>
    </div>
  );
};

export default InvitesAndTestingSimple;