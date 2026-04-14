// src/views/splash.js
export const splashView = () => {
  // Auto-redirect to Auth (or Home if logged in) after 2.5s
  setTimeout(() => {
    const currentHash = window.location.hash.slice(1) || 'splash';
    if (currentHash === 'splash') {
      // Mock auth check
      const isAuth = localStorage.getItem('sharecare_user');
      window.location.hash = isAuth ? 'home' : 'auth';
    }
  }, 2500);

  return `
    <div class="screen active" style="background: var(--bg-gradient); color: white; justify-content: center; align-items: center; text-align: center; height: 100%;">
      <div class="logo-container" style="animation: pulse 2s infinite;">
        <span class="material-icons-round" style="font-size: 80px; margin-bottom: 20px;">volunteer_activism</span>
      </div>
      <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; letter-spacing: 1px;">ShareCare</h1>
      <p style="font-size: 1.1rem; font-weight: 400; opacity: 0.9;">Helping Hands, Saving Lives</p>
      
      <div style="position: absolute; bottom: 50px; display: flex; gap: 8px;">
        <div class="dot" style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: blink 1s infinite 0s;"></div>
        <div class="dot" style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: blink 1s infinite 0.2s;"></div>
        <div class="dot" style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: blink 1s infinite 0.4s;"></div>
      </div>
      
      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      </style>
    </div>
  `;
};
