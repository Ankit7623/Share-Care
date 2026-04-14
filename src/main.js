// main.js
import './style.css';
import { registerRoute, initRouter } from './router.js';

// Import Views
import { splashView } from './views/splash.js';
import { authView } from './views/auth.js';
import { homeView } from './views/home.js';
import { addDonationView } from './views/addDonation.js';
import { mapView } from './views/mapView.js';
import { alertsView } from './views/alerts.js';
import { chatView } from './views/chat.js';
import { profileView } from './views/profile.js';
import { foodView } from './views/food.js';
import { aiAssistantView } from './views/aiAssistant.js';
import { clothesView } from './views/clothes.js';
import { booksView } from './views/books.js';
import { essentialsView } from './views/essentials.js';
import { detailsView } from './views/details.js';
import { myDonationsView } from './views/myDonations.js';
import { myNeedsView } from './views/myNeeds.js';
import { modifyRequestView } from './views/modifyRequest.js';
import { boostRequestView } from './views/boostRequest.js';
import { messageThreadView } from './views/messageThread.js';
import { settingsView } from './views/settings.js';
import { initSimulation } from './utils/notificationManager.js';

// Setup Mock Initial State
if (!localStorage.getItem('sharecare_requests')) {
    localStorage.setItem('sharecare_requests', JSON.stringify([
        { id: 'req-1', title: 'Need 5L cooking oil', category: 'food', status: 'pending', time: '1 day ago', views: 12 },
        { id: 'req-2', title: 'Handwash', category: 'essentials', status: 'matched', time: '2 days ago', views: 45 }
    ]));
} else {
    // Migration: Update stale mock data if detected
    const reqs = JSON.parse(localStorage.getItem('sharecare_requests'));
    const updated = reqs.map(r => {
        if (r.title === 'Sanitary pads bulk') {
            return { ...r, title: 'Handwash' };
        }
        return r;
    });
    localStorage.setItem('sharecare_requests', JSON.stringify(updated));
}

if (!localStorage.getItem('sharecare_user')) {
    // For development, we'll keep it empty. 
    // Later tied to Firebase Auth
}

// Register all routes
registerRoute('splash', splashView);
registerRoute('auth', authView);
registerRoute('home', homeView);
registerRoute('add-donation', addDonationView);
registerRoute('map', mapView);
registerRoute('alerts', alertsView);
registerRoute('chat', chatView);
registerRoute('profile', profileView);
registerRoute('food', foodView);
registerRoute('clothes', clothesView);
registerRoute('books', booksView);
registerRoute('essentials', essentialsView);
registerRoute('details', detailsView);
registerRoute('ai-assistant', aiAssistantView);
registerRoute('my-donations', myDonationsView);
registerRoute('my-needs', myNeedsView);
registerRoute('modify-request', modifyRequestView);
registerRoute('boost-request', boostRequestView);
registerRoute('message', messageThreadView);
registerRoute('settings', settingsView);

// PWA Install Event Hook
window.deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredInstallPrompt = e;
  
  // Custom logic: Dispatch an event so views know it's available
  document.dispatchEvent(new CustomEvent('pwaInstallAvailable'));
});

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  initRouter('app');
  
  // FAB click listener
  const aiFab = document.getElementById('mono-ai-fab');
  if (aiFab) {
    aiFab.addEventListener('click', () => {
        window.location.hash = 'ai-assistant';
    });
  }

  // Start Real-time Notification Engine
  initSimulation();

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => { console.log('✅ PWA ServiceWorker registration successful'); },
        (err) => { console.log('❌ PWA ServiceWorker registration failed: ', err); }
      );
    });
  }
});
