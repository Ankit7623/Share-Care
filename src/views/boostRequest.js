// src/views/boostRequest.js
import { navigate } from '../router.js';

export const boostRequestView = (params) => {
    const id = params[0];
    const requests = JSON.parse(localStorage.getItem('sharecare_requests')) || [];
    const request = requests.find(r => r.id === id);

    if (!request) {
        return `<div class="screen active" style="padding: 20px;"><h2>Request not found</h2><a href="#my-needs">Back</a></div>`;
    }

    return `
      <div class="screen active" style="padding: 20px; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <!-- Header -->
        <div style="margin-bottom: 24px; padding-top: 10px; display: flex; align-items: center; gap: 16px;">
            <a href="#my-needs" style="width: 40px; height: 40px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; color: var(--color-text-main); box-shadow: var(--shadow-sm);">
                <span class="material-icons-round">arrow_back</span>
            </a>
            <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--color-text-main);">Boost Request</h2>
        </div>

        <div style="background: white; padding: 24px; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); text-align: center; display: flex; flex-direction: column; align-items: center;">
            <div class="priority-radar" style="margin-bottom: 30px;">
                <span class="material-icons-round" style="font-size: 4rem; color: var(--color-primary);">rocket_launch</span>
                <div class="ripple-ring"></div>
                <div class="ripple-ring" style="animation-delay: 0.5s;"></div>
            </div>

            <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 8px;">Increase Priority</h3>
            <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 32px;">
                Boosting your request will highlight it to 5x more donors in Pune and place it at the top of the volunteer feed.
            </p>

            <div style="width: 100%; background: rgba(59, 130, 246, 0.05); padding: 16px; border-radius: var(--radius-md); border-left: 4px solid var(--color-primary); text-align: left; margin-bottom: 32px;">
                <p style="font-size: 0.85rem; color: var(--color-text-main); font-weight: 600; margin-bottom: 4px;">Request for:</p>
                <p style="font-size: 1.1rem; color: var(--color-text-main); font-weight: 800;">"${request.title}"</p>
            </div>

            <button id="confirm-boost-btn" class="btn-primary" style="width: 100%; padding: 18px; font-size: 1.1rem; box-shadow: var(--shadow-glow);">
                Apply Priority Boost
            </button>
        </div>

        <style>
            .priority-radar {
                width: 120px;
                height: 120px;
                background: rgba(59, 130, 246, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            .ripple-ring {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 2px solid var(--color-primary);
                animation: rippleAnim 2s linear infinite;
                opacity: 0;
            }
            @keyframes rippleAnim {
                0% { transform: scale(1); opacity: 0.6; }
                100% { transform: scale(2.5); opacity: 0; }
            }
        </style>
      </div>
    `;
};

// Logic via global event listener
document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'boost-request') {
        const urlParams = window.location.hash.split('/').slice(1);
        const currentId = urlParams[0];

        const boostBtn = document.getElementById('confirm-boost-btn');

        if (boostBtn) {
            boostBtn.addEventListener('click', () => {
                let requests = JSON.parse(localStorage.getItem('sharecare_requests')) || [];
                const index = requests.findIndex(r => r.id === currentId);
                
                if (index !== -1) {
                    requests[index].boosted = true;
                    // Increase views to show "boost impact"
                    requests[index].views += Math.floor(Math.random() * 50) + 20;
                    
                    localStorage.setItem('sharecare_requests', JSON.stringify(requests));
                    navigate('my-needs');
                }
            });
        }
    }
});
