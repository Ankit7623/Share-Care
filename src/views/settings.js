// src/views/settings.js

export const settingsView = () => {
    // Parse current settings or use defaults
    const currentSettings = JSON.parse(localStorage.getItem('sharecare_settings')) || {
        pushNotifications: true,
        emailAlerts: true,
        locationServices: true,
        darkMode: false,
        dataSaver: false
    };

    return `
      <div class="screen active" style="padding: 0; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <!-- Header -->
        <div style="background: white; padding: 20px 20px 16px; position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 16px; box-shadow: var(--shadow-sm); border-bottom: 1px solid var(--color-border);">
            <a href="#profile" style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-bg-app); display: flex; align-items: center; justify-content: center; color: var(--color-text-main); text-decoration: none; border: 1px solid var(--color-border); transition: all 0.2s;">
                <span class="material-icons-round">arrow_back</span>
            </a>
            <h2 style="font-size: 1.4rem; font-weight: 700; color: var(--color-text-main);">Settings</h2>
        </div>

        <div style="padding: 20px; padding-bottom: 120px; overflow-y: auto;">
            
            <!-- App Preferences -->
            <h4 class="settings-section-title">App Preferences</h4>
            <div class="settings-card">
                <div class="settings-item">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="settings-icon-wrap" style="background: rgba(100, 116, 139, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-text-muted);">dark_mode</span>
                        </div>
                        <div>
                            <span class="settings-item-title">Dark Mode</span>
                            <p class="settings-item-desc">Switch to a darker theme</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="setting-dark-mode" ${currentSettings.darkMode ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
                
                <div class="settings-divider"></div>
                
                <div class="settings-item">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="settings-icon-wrap" style="background: rgba(16, 185, 129, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-success);">data_saver_on</span>
                        </div>
                        <div>
                            <span class="settings-item-title">Data Saver</span>
                            <p class="settings-item-desc">Load lower quality images</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="setting-data-saver" ${currentSettings.dataSaver ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <!-- Notifications -->
            <h4 class="settings-section-title">Notifications</h4>
            <div class="settings-card">
                <div class="settings-item">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="settings-icon-wrap" style="background: rgba(239, 68, 68, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-urgent);">notifications_active</span>
                        </div>
                        <div>
                            <span class="settings-item-title">Push Notifications</span>
                            <p class="settings-item-desc">Alerts for matches & messages</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="setting-push" ${currentSettings.pushNotifications ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
                
                <div class="settings-divider"></div>
                
                <div class="settings-item">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="settings-icon-wrap" style="background: rgba(58, 123, 213, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-secondary);">email</span>
                        </div>
                        <div>
                            <span class="settings-item-title">Email Alerts</span>
                            <p class="settings-item-desc">Weekly summary of activity</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="setting-email" ${currentSettings.emailAlerts ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <!-- Privacy & Security -->
            <h4 class="settings-section-title">Privacy & Security</h4>
            <div class="settings-card">
                <div class="settings-item">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="settings-icon-wrap" style="background: rgba(245, 158, 11, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-warning);">my_location</span>
                        </div>
                        <div>
                            <span class="settings-item-title">Location Services</span>
                            <p class="settings-item-desc">Use location for better matches</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="setting-location" ${currentSettings.locationServices ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="settings-divider"></div>

                <a href="#" class="settings-item" style="text-decoration: none;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="settings-icon-wrap" style="background: rgba(100, 116, 139, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-text-muted);">password</span>
                        </div>
                        <div>
                            <span class="settings-item-title">Change Password</span>
                            <p class="settings-item-desc">Update your login credentials</p>
                        </div>
                    </div>
                    <span class="material-icons-round" style="color: var(--color-border); font-size: 1.2rem;">chevron_right</span>
                </a>
            </div>

            <!-- About -->
            <h4 class="settings-section-title">About ShareCare</h4>
            <div class="settings-card" style="margin-bottom: 20px;">
                <a href="#" class="settings-item" style="text-decoration: none;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="settings-icon-wrap" style="background: rgba(0, 210, 255, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-primary);">info</span>
                        </div>
                        <span class="settings-item-title" style="flex: 1;">Terms of Service</span>
                    </div>
                    <span class="material-icons-round" style="color: var(--color-border); font-size: 1.2rem;">chevron_right</span>
                </a>
                
                <div class="settings-divider"></div>

                <a href="#" class="settings-item" style="text-decoration: none;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div class="settings-icon-wrap" style="background: rgba(16, 185, 129, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-success);">privacy_tip</span>
                        </div>
                        <span class="settings-item-title" style="flex: 1;">Privacy Policy</span>
                    </div>
                    <span class="material-icons-round" style="color: var(--color-border); font-size: 1.2rem;">chevron_right</span>
                </a>
            </div>
            
            <button id="save-settings-btn" class="btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 24px;">
                <span class="material-icons-round" style="font-size: 1.2rem;">save</span>
                Save Preferences
            </button>
            <div id="settings-msg" style="text-align: center; font-size: 0.85rem; font-weight: 600; color: #10b981; margin-top: 12px; height: 20px; opacity: 0; transition: opacity 0.3s;">
                Settings saved successfully!
            </div>

        </div>

        <style>
            .settings-section-title {
                font-size: 0.8rem;
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 12px;
                font-weight: 700;
                margin-top: 24px;
            }
            .settings-section-title:first-child {
                margin-top: 0;
            }
            .settings-card {
                background: white;
                border-radius: var(--radius-lg);
                border: 1px solid var(--color-border);
                box-shadow: var(--shadow-sm);
                overflow: hidden;
            }
            .settings-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px;
                transition: background 0.2s;
            }
            .settings-item:active {
                background: rgba(0,0,0,0.02);
            }
            .settings-icon-wrap {
                width: 40px;
                height: 40px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .settings-item-title {
                font-weight: 600;
                color: var(--color-text-main);
                font-size: 0.95rem;
                display: block;
                margin-bottom: 2px;
            }
            .settings-item-desc {
                font-size: 0.75rem;
                color: var(--color-text-muted);
            }
            .settings-divider {
                height: 1px;
                background: var(--color-border);
                margin: 0 16px;
            }

            /* Custom Toggle Switch */
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 28px;
            }
            .toggle-switch input { 
                opacity: 0;
                width: 0;
                height: 0;
            }
            .toggle-switch .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #cbd5e1;
                transition: .3s;
                border-radius: 34px;
            }
            .toggle-switch .slider:before {
                position: absolute;
                content: "";
                height: 20px;
                width: 20px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .3s;
                border-radius: 50%;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            .toggle-switch input:checked + .slider {
                background-color: #10b981; /* Green */
            }
            .toggle-switch input:focus + .slider {
                box-shadow: 0 0 1px #10b981;
            }
            .toggle-switch input:checked + .slider:before {
                transform: translateX(22px);
            }
        </style>
      </div>
    `;
};

document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'settings') {
        const saveBtn = document.getElementById('save-settings-btn');
        const msg = document.getElementById('settings-msg');

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                // Gather values
                const darkMode = document.getElementById('setting-dark-mode')?.checked || false;
                const dataSaver = document.getElementById('setting-data-saver')?.checked || false;
                const push = document.getElementById('setting-push')?.checked || false;
                const email = document.getElementById('setting-email')?.checked || false;
                const loc = document.getElementById('setting-location')?.checked || false;

                const newSettings = {
                    darkMode,
                    dataSaver,
                    pushNotifications: push,
                    emailAlerts: email,
                    locationServices: loc
                };

                localStorage.setItem('sharecare_settings', JSON.stringify(newSettings));

                // Visual feedback
                saveBtn.innerHTML = '<span class="material-icons-round" style="font-size: 1.2rem;">check_circle</span> Saved';
                saveBtn.style.background = '#10b981';
                msg.style.opacity = '1';

                setTimeout(() => {
                    saveBtn.innerHTML = '<span class="material-icons-round" style="font-size: 1.2rem;">save</span> Save Preferences';
                    saveBtn.style.background = '';
                    msg.style.opacity = '0';
                }, 2000);
            });
        }
    }
});
