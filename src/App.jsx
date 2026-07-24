import React from 'react';

export default function App() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ fontSize: '60px', marginBottom: '10px' }}>💖</div>
        <h1 style={styles.title}>Welcome Bubu!</h1>
        <p style={styles.subtitle}>
          Something very special is being prepared for you... stay tuned!
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffe5ec',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(255, 77, 109, 0.2)',
    textAlign: 'center',
    maxWidth: '350px',
    margin: '20px',
  },
  title: {
    color: '#ff4d6d',
    margin: '10px 0',
  },
  subtitle: {
    color: '#590d22',
    fontSize: '16px',
    lineHeight: '1.5',
  },
};