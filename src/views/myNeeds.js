// src/views/myNeeds.js

export const myNeedsView = () => {
    const requests = JSON.parse(localStorage.getItem('sharecare_requests')) || [];
    
    return `
      <div class="screen active" style="padding: 20px; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <!-- Header -->
        <div style="margin-bottom: 24px; padding-top: 10px; display: flex; align-items: center; gap: 16px;">
            <a href="#profile" style="width: 40px; height: 40px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; color: var(--color-text-main); box-shadow: var(--shadow-sm);">
                <span class="material-icons-round">arrow_back</span>
            </a>
            <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--color-text-main);">My Needs</h2>
        </div>

        <div style="background: white; padding: 20px; border-radius: var(--radius-lg); margin-bottom: 24px; box-shadow: var(--shadow-sm); border: 1px solid var(--color-border); display: flex; align-items: center; gap: 16px;">
            <div class="searching-ring">
                <span class="material-icons-round" style="color: var(--color-warning); font-size: 2rem;">radar</span>
            </div>
            <div>
                <h4 style="font-size: 1rem; font-weight: 700; color: var(--color-text-main);">Active Search</h4>
                <p style="font-size: 0.8rem; color: var(--color-text-muted);">We're scanning Pune for matches to your requests.</p>
            </div>
        </div>

        <h3 style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Open Requests</h3>

        <div style="display: flex; flex-direction: column; gap: 16px; padding-bottom: 100px;">
            ${requests.length === 0 ? `
                <div style="padding: 40px 20px; text-align: center;">
                    <span class="material-icons-round" style="font-size: 4rem; color: var(--color-border); margin-bottom: 16px;">pan_tool</span>
                    <p style="color: var(--color-text-muted);">You haven't made any requests yet.</p>
                </div>
            ` : requests.map(req => `
                <div class="glass-card ${req.boosted ? 'shimmer-card' : ''}" style="padding: 16px; background: white; position: relative; overflow: hidden;">
                    ${req.boosted ? '<div class="boost-label">PRIORITY</div>' : ''}
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                        <span style="font-size: 0.7rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${req.category}</span>
                        <span style="font-size: 0.75rem; color: ${req.status === 'matched' ? '#10b981' : '#f59e0b'}; font-weight: 700; text-transform: uppercase;">
                            ${req.status}
                        </span>
                    </div>
                    <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 4px;">${req.title}</h4>
                    <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 14px;">
                        <span style="font-size: 0.75rem; color: var(--color-text-muted); display: flex; align-items: center; gap: 4px;">
                            <span class="material-icons-round" style="font-size: 0.9rem;">schedule</span> ${req.time}
                        </span>
                        <span style="font-size: 0.75rem; color: var(--color-text-muted); display: flex; align-items: center; gap: 4px;">
                            <span class="material-icons-round" style="font-size: 0.9rem;">visibility</span> ${req.views} views
                        </span>
                    </div>
                    
                    <div style="display: flex; gap: 10px; border-top: 1px solid var(--color-border); padding-top: 12px;">
                        <a href="#modify-request/${req.id}" style="flex: 1; padding: 10px; border-radius: var(--radius-pill); border: 1.5px solid var(--color-border); background: white; color: var(--color-text-main); font-weight: 600; font-size: 0.85rem; text-align: center; text-decoration: none;">Modify</a>
                        <a href="#boost-request/${req.id}" class="btn-primary" style="flex: 1; padding: 10px; font-size: 0.85rem; box-shadow: none; text-align: center; text-decoration: none;">Boost Request</a>
                    </div>
                </div>
            `).join('')}
        </div>

        <style>
            .searching-ring {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(245, 158, 11, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            .searching-ring::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 2px solid var(--color-warning);
                animation: radarPulse 2s infinite;
            }
            @keyframes radarPulse {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(1.6); opacity: 0; }
            }
        </style>
      </div>
    `;
};
