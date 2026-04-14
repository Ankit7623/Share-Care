// src/views/myDonations.js

export const myDonationsView = () => {
    const donations = JSON.parse(localStorage.getItem('sharecare_donations')) || [];
    
    return `
      <div class="screen active" style="padding: 20px; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <!-- Header -->
        <div style="margin-bottom: 24px; padding-top: 10px; display: flex; align-items: center; gap: 16px;">
            <a href="#profile" style="width: 40px; height: 40px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; color: var(--color-text-main); box-shadow: var(--shadow-sm);">
                <span class="material-icons-round">arrow_back</span>
            </a>
            <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--color-text-main);">My Donations</h2>
        </div>

        <!-- Impact Summary -->
        <div style="background: var(--bg-gradient); padding: 20px; border-radius: var(--radius-lg); color: white; margin-bottom: 24px; box-shadow: var(--shadow-glow);">
            <p style="font-size: 0.8rem; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; margin-bottom: 8px; opacity: 0.9;">Personal Impact</p>
            <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 4px;">Helping ${donations.length * 4} lives</h3>
            <p style="font-size: 0.85rem; opacity: 0.8;">You've shared ${donations.length} items with the community since joining. Keep it up!</p>
        </div>

        <h3 style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Active & Recent</h3>

        <div style="display: flex; flex-direction: column; gap: 16px; padding-bottom: 100px;">
            ${donations.length === 0 ? `
                <div style="padding: 40px 20px; text-align: center;">
                    <span class="material-icons-round" style="font-size: 4rem; color: var(--color-border); margin-bottom: 16px;">volunteer_activism</span>
                    <p style="color: var(--color-text-muted);">You haven't posted any donations yet.</p>
                </div>
            ` : donations.map(item => `
                <div class="glass-card" style="padding: 16px; background: white; display: flex; gap: 14px;">
                    <div style="width: 70px; height: 70px; border-radius: var(--radius-sm); background: url('${item.img}') center/cover; flex-shrink: 0;"></div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                            <h4 style="font-size: 1rem; font-weight: 700; color: var(--color-text-main);">${item.title}</h4>
                            <span style="font-size: 0.7rem; color: #10b981; font-weight: 700; background: #ecfdf5; padding: 2px 8px; border-radius: var(--radius-pill); text-transform: uppercase;">Active</span>
                        </div>
                        <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 8px;">Posted ${item.time || 'recently'}</p>
                        
                        <div style="display: flex; gap: 8px;">
                            <button style="flex: 1; padding: 6px; border-radius: 6px; border: 1px solid var(--color-border); background: white; font-size: 0.75rem; font-weight: 600; color: var(--color-text-main);">Manage</button>
                            <button style="flex: 1; padding: 6px; border-radius: 6px; border: 1px solid #10b981; background: #10b981; font-size: 0.75rem; font-weight: 600; color: white;">Mark Completed</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

      </div>
    `;
};
