// src/utils/notificationManager.js

const ALERTS_KEY = 'sharecare_alerts';

const defaultAlerts = [
    { 
        id: 'default-1', 
        title: 'Winter Clothes Needed Immediately', 
        desc: 'City Hope NGO is urgently looking for 50 winter jackets for the homeless shelter in Downtown area.',
        type: 'urgent',
        time: '2 hours ago',
        sender: 'City Hope NGO',
        icon: 'warning',
        read: false
    },
    { 
        id: 'default-2', 
        title: 'Notebooks for Local School', 
        desc: 'We are collecting unused notebooks and stationery for the upcoming school semester for underprivileged children.',
        type: 'info',
        time: '5 hours ago',
        sender: 'Education First Vol.',
        icon: 'campaign',
        read: true
    }
];

export const getAlerts = () => {
    const alerts = localStorage.getItem(ALERTS_KEY);
    return alerts ? JSON.parse(alerts) : defaultAlerts;
};

export const saveAlerts = (alerts) => {
    localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
    updateNavBadge();
};

export const addAlert = (newAlert) => {
    const alerts = getAlerts();
    const alert = {
        id: Date.now().toString(),
        time: 'Just now',
        read: false,
        ...newAlert
    };
    alerts.unshift(alert);
    saveAlerts(alerts);
    showToast(alert);
    
    // Dispatch event so active alerts view can refresh
    document.dispatchEvent(new CustomEvent('new-alert', { detail: alert }));
};

export const markAllAsRead = () => {
    const alerts = getAlerts().map(a => ({ ...a, read: true }));
    saveAlerts(alerts);
};

export const updateNavBadge = () => {
    const unreadCount = getAlerts().filter(a => !a.read).length;
    const badge = document.getElementById('nav-badge-alerts');
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
            badge.classList.add('alert-badge-pulse');
        } else {
            badge.style.display = 'none';
        }
    }
};

export const showToast = (alert) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${alert.type === 'urgent' ? 'urgent' : ''}`;
    toast.innerHTML = `
        <span class="material-icons-round" style="color: ${alert.type === 'urgent' ? 'var(--color-urgent)' : 'var(--color-primary)'}">${alert.icon || 'notifications'}</span>
        <div style="flex: 1;">
            <p style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 2px;">${alert.title}</p>
            <p style="font-size: 0.75rem; color: var(--color-text-muted); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">${alert.desc}</p>
        </div>
    `;

    container.appendChild(toast);

    // Click to go to alerts
    toast.onclick = () => {
        window.location.hash = 'alerts';
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 400);
    };

    // Auto remove
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 400);
        }
    }, 5000);
};

// Simulation Engine
export const initSimulation = () => {
    // Initial badge update
    updateNavBadge();

    // Trigger one "Real-time" alert after 10 seconds for demo
    setTimeout(() => {
        addAlert({
            title: 'Emergency: Food Depletion',
            desc: 'Aundh Community Kitchen has suddenly run out of rice for 200 people. Urgent pickup needed from any local donor.',
            type: 'urgent',
            sender: 'Aundh Community',
            icon: 'error_outline'
        });
    }, 10000);
};
