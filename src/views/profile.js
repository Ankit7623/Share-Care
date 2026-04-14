// src/views/profile.js
import { logoutUser, getCurrentUser } from '../utils/authManager.js';
import { getAlerts } from '../utils/notificationManager.js';

export const profileView = () => {
    let userName = "User";
    let userEmail = "";
    let userLocation = "Your Area";
    let userAvatar = "U";
    let joinDate = "";
    try {
        const user = JSON.parse(localStorage.getItem('sharecare_user'));
        if (user && user.name) userName = user.name;
        if (user && user.email) userEmail = user.email;
        if (user && user.location) userLocation = user.location;
        if (user && user.avatar) userAvatar = user.avatar;
        if (user && user.createdAt) {
            const d = new Date(user.createdAt);
            joinDate = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
    } catch(e) {}

    // Real-time counts from localStorage
    let donationCount = 0;
    let requestCount = 0;
    let alertCount = 0;
    let livesHelped = 0;
    let donations = [];
    let requests = [];

    try {
        donations = JSON.parse(localStorage.getItem('sharecare_donations')) || [];
        donationCount = donations.length;
    } catch(e){}
    try {
        requests = JSON.parse(localStorage.getItem('sharecare_requests')) || [];
        requestCount = requests.length;
    } catch(e){}
    try {
        const alerts = getAlerts();
        alertCount = alerts.filter(a => !a.read).length;
    } catch(e){}

    livesHelped = donationCount * 4 + requestCount * 2;

    // Build recent activity from donations & requests
    const recentActivities = [];
    donations.forEach(d => {
        recentActivities.push({
            icon: 'volunteer_activism',
            iconColor: 'var(--color-primary)',
            iconBg: 'rgba(0, 210, 255, 0.08)',
            title: `Donated: ${d.title}`,
            subtitle: d.location || 'Nearby',
            time: d.time || 'Recently',
            status: d.status || 'Active',
            statusColor: '#10b981'
        });
    });
    requests.forEach(r => {
        recentActivities.push({
            icon: 'pan_tool',
            iconColor: 'var(--color-warning)',
            iconBg: 'rgba(245, 158, 11, 0.08)',
            title: `Requested: ${r.title}`,
            subtitle: r.category || '',
            time: r.time || 'Recently',
            status: r.status || 'pending',
            statusColor: r.status === 'matched' ? '#10b981' : '#f59e0b'
        });
    });

    // Achievements
    const achievements = [];
    if (donationCount >= 1) achievements.push({ icon: '🎁', label: 'First Donation', unlocked: true });
    else achievements.push({ icon: '🎁', label: 'First Donation', unlocked: false });

    if (donationCount >= 5) achievements.push({ icon: '⭐', label: 'Generous Soul', unlocked: true });
    else achievements.push({ icon: '⭐', label: 'Generous Soul', unlocked: false });

    if (donationCount >= 10) achievements.push({ icon: '🏆', label: 'Super Donor', unlocked: true });
    else achievements.push({ icon: '🏆', label: 'Super Donor', unlocked: false });

    if (requestCount >= 1) achievements.push({ icon: '🤝', label: 'First Request', unlocked: true });
    else achievements.push({ icon: '🤝', label: 'First Request', unlocked: false });

    return `
      <div class="screen active" style="padding: 0; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <!-- Logout Confirmation Modal -->
        <div id="logout-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.45); z-index: 2000; align-items: center; justify-content: center; backdrop-filter: blur(6px);">
            <div class="prof-modal-card">
                <div style="width: 64px; height: 64px; background: rgba(239, 68, 68, 0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                    <span class="material-icons-round" style="font-size: 2rem; color: var(--color-urgent);">logout</span>
                </div>
                <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 8px;">Sign Out?</h3>
                <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 24px; line-height: 1.5;">You'll need to sign in again to access your account and donations.</p>
                <div style="display: flex; gap: 12px;">
                    <button id="cancel-logout-btn" class="prof-modal-btn-secondary">Cancel</button>
                    <button id="confirm-logout-btn" class="prof-modal-btn-danger">Sign Out</button>
                </div>
            </div>
        </div>

        <!-- Edit Profile Modal -->
        <div id="edit-profile-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.45); z-index: 2000; align-items: center; justify-content: center; backdrop-filter: blur(6px);">
            <div class="prof-modal-card" style="text-align: left;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text-main);">Edit Profile</h3>
                    <button id="close-edit-modal" style="background: var(--color-bg-app); border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        <span class="material-icons-round" style="font-size: 1.2rem; color: var(--color-text-muted);">close</span>
                    </button>
                </div>
                <form id="edit-profile-form" style="display: flex; flex-direction: column; gap: 16px;">
                    <div class="prof-form-group">
                        <label class="prof-form-label">Full Name</label>
                        <div class="prof-input-wrap">
                            <span class="material-icons-round prof-input-icon">person</span>
                            <input type="text" id="edit-name" value="${userName}" class="prof-input" required>
                        </div>
                    </div>
                    <div class="prof-form-group">
                        <label class="prof-form-label">Email</label>
                        <div class="prof-input-wrap">
                            <span class="material-icons-round prof-input-icon">email</span>
                            <input type="email" id="edit-email" value="${userEmail}" class="prof-input" required>
                        </div>
                    </div>
                    <div class="prof-form-group">
                        <label class="prof-form-label">Location</label>
                        <div class="prof-input-wrap">
                            <span class="material-icons-round prof-input-icon">location_on</span>
                            <input type="text" id="edit-location" value="${userLocation}" class="prof-input" required>
                        </div>
                    </div>
                    <div id="edit-profile-msg" style="display: none; padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 500;"></div>
                    <button type="submit" class="btn-primary" style="height: 48px; font-size: 0.95rem; margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                        <span class="material-icons-round" style="font-size: 1.1rem;">save</span>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>

        <!-- Profile Gradient Header -->
        <div style="background: var(--bg-gradient); padding: 24px 20px 60px; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.06);"></div>
            <div style="position: absolute; bottom: -20px; left: 20px; width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.04);"></div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1;">
                <h2 style="font-size: 1.4rem; font-weight: 700; color: white;">My Profile</h2>
                <button id="logout-btn" style="background: rgba(255,255,255,0.15); color: white; font-weight: 600; font-size: 0.8rem; display: flex; align-items: center; padding: 8px 14px; border-radius: var(--radius-pill); gap: 5px; border: 1px solid rgba(255,255,255,0.25); backdrop-filter: blur(4px); cursor: pointer; font-family: inherit; transition: all 0.2s;">
                    <span class="material-icons-round" style="font-size: 1rem;">logout</span> 
                    Logout
                </button>
            </div>
        </div>

        <!-- Profile Card (overlapping header) -->
        <div style="padding: 0 20px; margin-top: -40px; position: relative; z-index: 2;">
            <div style="background: white; border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-md); border: 1px solid var(--color-border);">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                    <div style="width: 68px; height: 68px; border-radius: 50%; background: var(--bg-gradient); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 1.6rem; box-shadow: var(--shadow-glow); flex-shrink: 0;">
                        ${userAvatar}
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <h3 id="profile-display-name" style="font-size: 1.2rem; color: var(--color-text-main); font-weight: 700; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${userName}</h3>
                        <p id="profile-display-email" style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${userEmail}</p>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span class="material-icons-round" style="font-size: 0.85rem; color: var(--color-primary);">location_on</span>
                            <span id="profile-display-location" style="font-size: 0.8rem; color: var(--color-text-muted);">${userLocation}</span>
                        </div>
                    </div>
                    <button id="edit-profile-btn" style="width: 38px; height: 38px; border-radius: 50%; background: var(--color-bg-app); border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0;">
                        <span class="material-icons-round" style="font-size: 1.1rem; color: var(--color-primary);">edit</span>
                    </button>
                </div>

                ${joinDate ? `
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 16px; padding: 8px 12px; background: rgba(0, 210, 255, 0.06); border-radius: var(--radius-pill); width: fit-content;">
                    <span class="material-icons-round" style="font-size: 0.9rem; color: var(--color-primary);">calendar_today</span>
                    <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 500;">Member since ${joinDate}</span>
                </div>` : ''}

                <!-- Stats Row -->
                <div style="display: flex; gap: 8px;">
                    <div class="prof-stat-card">
                        <h4 id="stat-donations" style="font-size: 1.4rem; color: var(--color-primary); font-weight: 800; margin-bottom: 2px;">${donationCount}</h4>
                        <p style="font-size: 0.68rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Donations</p>
                    </div>
                    <div class="prof-stat-card">
                        <h4 id="stat-requests" style="font-size: 1.4rem; color: var(--color-secondary); font-weight: 800; margin-bottom: 2px;">${requestCount}</h4>
                        <p style="font-size: 0.68rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Requests</p>
                    </div>
                    <div class="prof-stat-card">
                        <h4 id="stat-lives" style="font-size: 1.4rem; color: var(--color-accent); font-weight: 800; margin-bottom: 2px;">${livesHelped}</h4>
                        <p style="font-size: 0.68rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Lives Helped</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scrollable Content -->
        <div style="padding: 20px; padding-bottom: 120px; flex: 1;">

            <!-- Quick Actions -->
            <div style="display: flex; gap: 10px; margin-bottom: 24px;">
                <a href="#add-donation" class="prof-quick-action">
                    <div class="prof-quick-icon" style="background: rgba(0, 210, 255, 0.08);">
                        <span class="material-icons-round" style="color: var(--color-primary); font-size: 1.3rem;">add_circle</span>
                    </div>
                    <span>New Donation</span>
                </a>
                <a href="#map" class="prof-quick-action">
                    <div class="prof-quick-icon" style="background: rgba(58, 123, 213, 0.08);">
                        <span class="material-icons-round" style="color: var(--color-secondary); font-size: 1.3rem;">map</span>
                    </div>
                    <span>View Map</span>
                </a>
                <a href="#chat" class="prof-quick-action">
                    <div class="prof-quick-icon" style="background: rgba(0, 230, 118, 0.08);">
                        <span class="material-icons-round" style="color: var(--color-accent); font-size: 1.3rem;">chat</span>
                    </div>
                    <span>Messages</span>
                </a>
            </div>

            <!-- Achievements Section -->
            <div style="margin-bottom: 24px;">
                <h4 style="font-size: 0.8rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; font-weight: 700;">Achievements</h4>
                <div style="display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px;">
                    ${achievements.map(a => `
                        <div class="prof-achievement ${a.unlocked ? 'unlocked' : 'locked'}">
                            <span style="font-size: 1.5rem;">${a.icon}</span>
                            <span style="font-size: 0.68rem; font-weight: 600; color: ${a.unlocked ? 'var(--color-text-main)' : '#b0b8c4'}; text-align: center; line-height: 1.2;">${a.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Menu Section -->
            <h4 style="font-size: 0.8rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700;">History</h4>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                <a href="#my-donations" class="prof-menu-item">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="prof-menu-icon" style="background: rgba(0, 210, 255, 0.08);">
                            <span class="material-icons-round" style="color: var(--color-primary); font-size: 1.2rem;">volunteer_activism</span>
                        </div>
                        <div>
                            <span style="font-weight: 600; color: var(--color-text-main); font-size: 0.92rem;">My Donations</span>
                            <p style="font-size: 0.72rem; color: var(--color-text-muted);">${donationCount} items shared</p>
                        </div>
                    </div>
                    <span class="material-icons-round" style="color: var(--color-border); font-size: 1.2rem;">chevron_right</span>
                </a>

                <a href="#my-needs" class="prof-menu-item">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="prof-menu-icon" style="background: rgba(245, 158, 11, 0.08);">
                            <span class="material-icons-round" style="color: var(--color-warning); font-size: 1.2rem;">pan_tool</span>
                        </div>
                        <div>
                            <span style="font-weight: 600; color: var(--color-text-main); font-size: 0.92rem;">My Requests</span>
                            <p style="font-size: 0.72rem; color: var(--color-text-muted);">${requestCount} active requests</p>
                        </div>
                    </div>
                    <span class="material-icons-round" style="color: var(--color-border); font-size: 1.2rem;">chevron_right</span>
                </a>
            </div>

            <!-- Recent Activity -->
            <h4 style="font-size: 0.8rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700;">Recent Activity</h4>
            <div id="activity-feed" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                ${recentActivities.length === 0 ? `
                    <div style="padding: 30px 20px; text-align: center; background: white; border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
                        <span class="material-icons-round" style="font-size: 2.5rem; color: var(--color-border); margin-bottom: 10px; display: block;">history</span>
                        <p style="color: var(--color-text-muted); font-size: 0.88rem; font-weight: 500;">No activity yet</p>
                        <p style="color: #b0b8c4; font-size: 0.78rem; margin-top: 4px;">Start donating to build your impact!</p>
                    </div>
                ` : recentActivities.slice(0, 5).map((a, i) => `
                    <div class="prof-activity-item" style="animation-delay: ${i * 0.05}s;">
                        <div class="prof-activity-icon" style="background: ${a.iconBg};">
                            <span class="material-icons-round" style="color: ${a.iconColor}; font-size: 1rem;">${a.icon}</span>
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <p style="font-size: 0.85rem; font-weight: 600; color: var(--color-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${a.title}</p>
                            <p style="font-size: 0.72rem; color: var(--color-text-muted);">${a.time} ${a.subtitle ? '· ' + a.subtitle : ''}</p>
                        </div>
                        <span class="prof-activity-status" style="background: ${a.statusColor}15; color: ${a.statusColor};">${a.status}</span>
                    </div>
                `).join('')}
            </div>

            <!-- Account Section -->
            <h4 style="font-size: 0.8rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700;">Account</h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <a href="#settings" class="prof-menu-item">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="prof-menu-icon" style="background: rgba(100, 116, 139, 0.08);">
                            <span class="material-icons-round" style="color: var(--color-text-muted); font-size: 1.2rem;">settings</span>
                        </div>
                        <div>
                            <span style="font-weight: 600; color: var(--color-text-main); font-size: 0.92rem;">Settings</span>
                            <p style="font-size: 0.72rem; color: var(--color-text-muted);">Preferences & Privacy</p>
                        </div>
                    </div>
                    <span class="material-icons-round" style="color: var(--color-border); font-size: 1.2rem;">chevron_right</span>
                </a>
                <a href="#alerts" class="prof-menu-item">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="prof-menu-icon" style="background: rgba(239, 68, 68, 0.08);">
                            <span class="material-icons-round" style="color: var(--color-urgent); font-size: 1.2rem;">notifications</span>
                        </div>
                        <div>
                            <span style="font-weight: 600; color: var(--color-text-main); font-size: 0.92rem;">Notifications</span>
                            <p style="font-size: 0.72rem; color: var(--color-text-muted);">${alertCount > 0 ? alertCount + ' unread alerts' : 'All caught up!'}</p>
                        </div>
                    </div>
                    ${alertCount > 0 ? `<span style="background: var(--color-urgent); color: white; font-size: 0.65rem; font-weight: 700; padding: 3px 8px; border-radius: var(--radius-pill);">${alertCount}</span>` : `<span class="material-icons-round" style="color: var(--color-border); font-size: 1.2rem;">chevron_right</span>`}
                </a>
                <div class="prof-menu-item" id="install-app-btn" style="cursor: pointer; display: none;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="prof-menu-icon" style="background: rgba(16, 185, 129, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-success); font-size: 1.2rem;">download</span>
                        </div>
                        <div>
                            <span style="font-weight: 600; color: var(--color-text-main); font-size: 0.92rem;">Install App</span>
                            <p style="font-size: 0.72rem; color: var(--color-text-muted);">Download to Home Screen</p>
                        </div>
                    </div>
                    <span class="material-icons-round" style="color: var(--color-border); font-size: 1.2rem;">chevron_right</span>
                </div>
                <div class="prof-menu-item" id="clear-data-btn" style="cursor: pointer;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="prof-menu-icon" style="background: rgba(100, 116, 139, 0.08);">
                            <span class="material-icons-round" style="color: var(--color-text-muted); font-size: 1.2rem;">delete_sweep</span>
                        </div>
                        <div>
                            <span style="font-weight: 600; color: var(--color-text-main); font-size: 0.92rem;">Clear All Data</span>
                            <p style="font-size: 0.72rem; color: var(--color-text-muted);">Reset donations & requests</p>
                        </div>
                    </div>
                    <span class="material-icons-round" style="color: var(--color-border); font-size: 1.2rem;">chevron_right</span>
                </div>
            </div>

            <!-- App Version -->
            <div style="text-align: center; margin-top: 32px;">
                <p style="font-size: 0.72rem; color: #b0b8c4; font-weight: 500;">ShareCare v1.0.0</p>
                <p style="font-size: 0.68rem; color: #cbd5e1; margin-top: 2px;">Made with ❤️ in Pune</p>
            </div>
        </div>

        <style>
            /* Modal */
            .prof-modal-card {
                background: white;
                border-radius: var(--radius-lg);
                padding: 32px 24px;
                width: 88%;
                max-width: 360px;
                text-align: center;
                box-shadow: var(--shadow-lg);
                animation: profModalPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            @keyframes profModalPop {
                from { transform: scale(0.8) translateY(20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
            }
            .prof-modal-btn-secondary {
                flex: 1; padding: 13px; border-radius: var(--radius-pill);
                background: var(--color-bg-app); border: 1px solid var(--color-border);
                font-weight: 600; color: var(--color-text-main); font-size: 0.9rem;
                cursor: pointer; font-family: inherit; transition: all 0.2s;
            }
            .prof-modal-btn-secondary:hover { background: #e2e8f0; }
            .prof-modal-btn-danger {
                flex: 1; padding: 13px; border-radius: var(--radius-pill);
                background: var(--color-urgent); border: none; font-weight: 700;
                color: white; font-size: 0.9rem; cursor: pointer; font-family: inherit;
                transition: all 0.2s; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
            }
            .prof-modal-btn-danger:hover { transform: translateY(-1px); }
            .prof-modal-btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }

            /* Form */
            .prof-form-group { display: flex; flex-direction: column; }
            .prof-form-label {
                font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 6px;
                font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
            }
            .prof-input-wrap {
                display: flex; align-items: center; background: var(--color-bg-app);
                border: 1.5px solid var(--color-border); border-radius: var(--radius-sm);
                padding: 0 14px; transition: all 0.25s;
            }
            .prof-input-wrap:focus-within {
                border-color: var(--color-primary); background: white;
                box-shadow: 0 0 0 3px rgba(0, 210, 255, 0.1);
            }
            .prof-input-icon { color: #94a3b8; font-size: 1.1rem; margin-right: 10px; }
            .prof-input-wrap:focus-within .prof-input-icon { color: var(--color-primary); }
            .prof-input {
                flex: 1; border: none; background: transparent; padding: 13px 0;
                font-size: 0.9rem; color: var(--color-text-main); outline: none; font-family: inherit;
            }

            /* Stats */
            .prof-stat-card {
                flex: 1; text-align: center; padding: 14px 8px;
                background: var(--color-bg-app); border-radius: var(--radius-sm);
                border: 1px solid var(--color-border); transition: all 0.3s;
            }
            .prof-stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }

            /* Quick Actions */
            .prof-quick-action {
                flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;
                padding: 16px 8px; background: white; border-radius: var(--radius-md);
                box-shadow: var(--shadow-sm); border: 1px solid var(--color-border);
                text-decoration: none; transition: all 0.25s; cursor: pointer;
            }
            .prof-quick-action span { font-size: 0.72rem; font-weight: 600; color: var(--color-text-muted); }
            .prof-quick-action:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
            .prof-quick-action:active { transform: scale(0.96); }
            .prof-quick-icon {
                width: 44px; height: 44px; border-radius: 14px;
                display: flex; align-items: center; justify-content: center;
            }

            /* Achievements */
            .prof-achievement {
                min-width: 72px; padding: 14px 10px; display: flex; flex-direction: column;
                align-items: center; gap: 6px; border-radius: var(--radius-md);
                border: 1px solid var(--color-border); background: white;
                box-shadow: var(--shadow-sm); transition: all 0.3s; flex-shrink: 0;
            }
            .prof-achievement.unlocked {
                border-color: rgba(0, 210, 255, 0.3);
                background: linear-gradient(135deg, rgba(0, 210, 255, 0.04), rgba(58, 123, 213, 0.04));
            }
            .prof-achievement.locked { opacity: 0.5; filter: grayscale(0.8); }
            .prof-achievement:hover { transform: translateY(-2px); }

            /* Menu Items */
            .prof-menu-item {
                background: white; padding: 14px 16px; border-radius: var(--radius-sm);
                display: flex; align-items: center; justify-content: space-between;
                box-shadow: var(--shadow-sm); text-decoration: none;
                border: 1px solid var(--color-border); transition: all 0.2s;
            }
            .prof-menu-item:hover { transform: translateX(4px); box-shadow: var(--shadow-md); }
            .prof-menu-item:active { transform: scale(0.98); }
            .prof-menu-icon {
                width: 38px; height: 38px; border-radius: 12px;
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
            }

            /* Activity Items */
            .prof-activity-item {
                display: flex; align-items: center; gap: 12px;
                background: white; padding: 12px 14px; border-radius: var(--radius-sm);
                border: 1px solid var(--color-border); box-shadow: var(--shadow-sm);
                animation: profSlideIn 0.3s ease both;
            }
            @keyframes profSlideIn {
                from { transform: translateX(-10px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .prof-activity-icon {
                width: 34px; height: 34px; border-radius: 10px;
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
            }
            .prof-activity-status {
                font-size: 0.65rem; font-weight: 700; padding: 3px 8px;
                border-radius: var(--radius-pill); text-transform: uppercase;
                letter-spacing: 0.3px; flex-shrink: 0;
            }

            /* Logout Btn */
            #logout-btn:hover { background: rgba(255,255,255,0.25) !important; }
            #edit-profile-btn:hover { background: rgba(0, 210, 255, 0.08) !important; border-color: var(--color-primary) !important; }

            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>

      </div>
    `;
};

document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'profile') {

        // === LOGOUT MODAL ===
        const logoutBtn = document.getElementById('logout-btn');
        const logoutModal = document.getElementById('logout-modal');
        const cancelLogoutBtn = document.getElementById('cancel-logout-btn');
        const confirmLogoutBtn = document.getElementById('confirm-logout-btn');

        if (logoutBtn && logoutModal) {
            logoutBtn.addEventListener('click', () => { logoutModal.style.display = 'flex'; });
            cancelLogoutBtn.addEventListener('click', () => { logoutModal.style.display = 'none'; });
            logoutModal.addEventListener('click', (ev) => {
                if (ev.target === logoutModal) logoutModal.style.display = 'none';
            });
            confirmLogoutBtn.addEventListener('click', () => {
                confirmLogoutBtn.innerHTML = '<div style="width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 0.6s linear infinite;"></div>';
                confirmLogoutBtn.disabled = true;
                setTimeout(() => {
                    logoutUser();
                    window.location.hash = 'auth';
                }, 800);
            });
        }

        // === EDIT PROFILE MODAL ===
        const editBtn = document.getElementById('edit-profile-btn');
        const editModal = document.getElementById('edit-profile-modal');
        const closeEditBtn = document.getElementById('close-edit-modal');
        const editForm = document.getElementById('edit-profile-form');
        const editMsg = document.getElementById('edit-profile-msg');

        const openEditModal = () => { editModal.style.display = 'flex'; };
        const closeEditModal = () => { editModal.style.display = 'none'; editMsg.style.display = 'none'; };

        if (editBtn) editBtn.addEventListener('click', openEditModal);
        if (closeEditBtn) closeEditBtn.addEventListener('click', closeEditModal);
        if (editModal) editModal.addEventListener('click', (ev) => {
            if (ev.target === editModal) closeEditModal();
        });

        if (editForm) {
            editForm.addEventListener('submit', (ev) => {
                ev.preventDefault();
                const newName = document.getElementById('edit-name').value.trim();
                const newEmail = document.getElementById('edit-email').value.trim();
                const newLocation = document.getElementById('edit-location').value.trim();

                if (!newName || newName.length < 2) {
                    editMsg.style.display = 'block';
                    editMsg.style.background = 'rgba(239,68,68,0.08)';
                    editMsg.style.color = 'var(--color-error)';
                    editMsg.textContent = 'Name must be at least 2 characters';
                    return;
                }
                if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
                    editMsg.style.display = 'block';
                    editMsg.style.background = 'rgba(239,68,68,0.08)';
                    editMsg.style.color = 'var(--color-error)';
                    editMsg.textContent = 'Please enter a valid email';
                    return;
                }
                if (!newLocation || newLocation.length < 2) {
                    editMsg.style.display = 'block';
                    editMsg.style.background = 'rgba(239,68,68,0.08)';
                    editMsg.style.color = 'var(--color-error)';
                    editMsg.textContent = 'Please enter a valid location';
                    return;
                }

                // Update localStorage
                const user = JSON.parse(localStorage.getItem('sharecare_user')) || {};
                user.name = newName;
                user.email = newEmail;
                user.location = newLocation;
                user.avatar = newName.charAt(0).toUpperCase();
                localStorage.setItem('sharecare_user', JSON.stringify(user));

                // Also update in registered users list
                try {
                    const users = JSON.parse(localStorage.getItem('sharecare_users')) || [];
                    const idx = users.findIndex(u => u.id === user.id);
                    if (idx >= 0) {
                        users[idx].name = newName;
                        users[idx].email = newEmail;
                        users[idx].location = newLocation;
                        users[idx].avatar = newName.charAt(0).toUpperCase();
                        localStorage.setItem('sharecare_users', JSON.stringify(users));
                    }
                } catch(e){}

                // Update DOM in real-time
                const displayName = document.getElementById('profile-display-name');
                const displayEmail = document.getElementById('profile-display-email');
                const displayLocation = document.getElementById('profile-display-location');
                if (displayName) displayName.textContent = newName;
                if (displayEmail) displayEmail.textContent = newEmail;
                if (displayLocation) displayLocation.textContent = newLocation;

                // Show success
                editMsg.style.display = 'block';
                editMsg.style.background = 'rgba(16,185,129,0.08)';
                editMsg.style.color = 'var(--color-success)';
                editMsg.textContent = '✓ Profile updated successfully!';

                setTimeout(() => {
                    closeEditModal();
                }, 1200);
            });
        }

        // === CLEAR DATA ===
        const clearDataBtn = document.getElementById('clear-data-btn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                if (confirm('This will remove all your donations and requests. Continue?')) {
                    localStorage.removeItem('sharecare_donations');
                    localStorage.removeItem('sharecare_requests');
                    localStorage.removeItem('sharecare_alerts');

                    // Update stats in real-time
                    const statDonations = document.getElementById('stat-donations');
                    const statRequests = document.getElementById('stat-requests');
                    const statLives = document.getElementById('stat-lives');
                    const activityFeed = document.getElementById('activity-feed');
                    if (statDonations) statDonations.textContent = '0';
                    if (statRequests) statRequests.textContent = '0';
                    if (statLives) statLives.textContent = '0';
                    if (activityFeed) {
                        activityFeed.innerHTML = `
                            <div style="padding: 30px 20px; text-align: center; background: white; border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
                                <span class="material-icons-round" style="font-size: 2.5rem; color: var(--color-border); margin-bottom: 10px; display: block;">history</span>
                                <p style="color: var(--color-text-muted); font-size: 0.88rem; font-weight: 500;">No activity yet</p>
                                <p style="color: #b0b8c4; font-size: 0.78rem; margin-top: 4px;">Start donating to build your impact!</p>
                            </div>
                        `;
                    }
                }
            });
        }

        // === PWA INSTALLATION LOGIC ===
        const installBtn = document.getElementById('install-app-btn');
        if (installBtn && window.deferredInstallPrompt) {
            // Show the button if the prompt is ready
            installBtn.style.display = 'flex';
            
            installBtn.addEventListener('click', async () => {
                const promptEvent = window.deferredInstallPrompt;
                if (!promptEvent) {
                    return;
                }
                // Show prompt
                promptEvent.prompt();
                // Wait for the user to respond to the prompt
                const result = await promptEvent.userChoice;
                // Clear the saved prompt since it can't be used again
                window.deferredInstallPrompt = null;
                installBtn.style.display = 'none';
            });
        }
        
        // === REAL-TIME STAT REFRESH (polls every 2s) ===
        const refreshInterval = setInterval(() => {
            // Check if still on profile page
            if (window.location.hash.slice(1) !== 'profile') {
                clearInterval(refreshInterval);
                return;
            }

            try {
                const donations = JSON.parse(localStorage.getItem('sharecare_donations')) || [];
                const requests = JSON.parse(localStorage.getItem('sharecare_requests')) || [];
                const dCount = donations.length;
                const rCount = requests.length;

                const statD = document.getElementById('stat-donations');
                const statR = document.getElementById('stat-requests');
                const statL = document.getElementById('stat-lives');

                if (statD && statD.textContent !== String(dCount)) {
                    statD.textContent = dCount;
                    statD.style.transform = 'scale(1.2)';
                    setTimeout(() => { statD.style.transform = 'scale(1)'; }, 300);
                }
                if (statR && statR.textContent !== String(rCount)) {
                    statR.textContent = rCount;
                    statR.style.transform = 'scale(1.2)';
                    setTimeout(() => { statR.style.transform = 'scale(1)'; }, 300);
                }
                if (statL) {
                    const newLives = dCount * 4 + rCount * 2;
                    if (statL.textContent !== String(newLives)) {
                        statL.textContent = newLives;
                        statL.style.transform = 'scale(1.2)';
                        setTimeout(() => { statL.style.transform = 'scale(1)'; }, 300);
                    }
                }
            } catch(e){}
        }, 2000);
    }
});
