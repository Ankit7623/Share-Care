import { getAlerts, markAllAsRead, updateNavBadge } from '../utils/notificationManager.js';

export const alertsView = () => {
    const alerts = getAlerts();

    return `
      <div class="screen active" style="padding: 20px; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <div style="margin-bottom: 24px; padding-top: 10px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
                <h2 style="font-size: 1.8rem; font-weight: 700; color: var(--color-text-main);">Alerts</h2>
                <p style="font-size: 0.9rem; color: var(--color-text-muted);">Urgent requests from NGOs & Volunteers</p>
            </div>
            <span style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; padding: 4px 12px; background: rgba(59, 130, 246, 0.1); border-radius: var(--radius-pill);">
                ${alerts.length} Total
            </span>
        </div>

        <div id="alerts-list-container" style="display: flex; flex-direction: column; gap: 16px; padding-bottom: 100px;">
            ${alerts.map(alert => `
                <div class="glass-card" style="padding: 16px; background: white; border-left: 4px solid ${alert.type === 'urgent' ? 'var(--color-urgent)' : 'var(--color-warning)'}; opacity: ${alert.read ? '0.8' : '1'};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span class="material-icons-round" style="color: ${alert.type === 'urgent' ? 'var(--color-urgent)' : 'var(--color-warning)'}; font-size: 1.2rem;">${alert.icon || 'notifications'}</span>
                            <span style="color: ${alert.type === 'urgent' ? 'var(--color-urgent)' : 'var(--color-warning)'}; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
                                ${alert.type === 'urgent' ? 'Critical Need' : 'Resource Request'}
                            </span>
                        </div>
                        <span style="font-size: 0.75rem; color: var(--color-text-muted);">${alert.time}</span>
                    </div>
                    <h3 style="font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 6px;">${alert.title}</h3>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px; line-height: 1.4;">${alert.desc}</p>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 12px;">
                        <span style="font-size: 0.8rem; color: var(--color-text-main); font-weight: 500;">
                            <span class="material-icons-round" style="font-size: 1rem; vertical-align: middle; margin-right: 4px; color: var(--color-primary);">verified</span> ${alert.sender}
                        </span>
                        <button class="btn-primary" style="padding: 8px 16px; font-size: 0.85rem; ${alert.type === 'urgent' ? 'background: var(--color-urgent); box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);' : ''}">
                            I Can Help
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>

      </div>
    `;
};

// Handle logic via global events
document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'alerts') {
        // Mark all as read when user visits this page
        setTimeout(() => {
            markAllAsRead();
            updateNavBadge();
        }, 500);
    }
});

document.addEventListener('new-alert', () => {
   // Re-render if you are currently on the alerts page
   const container = document.getElementById('alerts-list-container');
   if (container) {
       // A quick-and-dirty re-render of the entire view context
       // In a real framework, this would be an atomic update
       const spaApp = document.getElementById('app');
       if (spaApp) {
           spaApp.innerHTML = alertsView();
       }
   }
});
