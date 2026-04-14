// src/views/auth.js
import { registerUser, loginUser } from '../utils/authManager.js';

export const authView = () => {
    return `
      <div class="screen active" style="padding: 0; background: white; min-height: 100%; display: flex; flex-direction: column; position: relative;">
        
        <!-- Loading Overlay -->
        <div id="auth-loading" style="display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.92); z-index: 100; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(6px);">
             <div class="auth-spinner"></div>
             <p id="auth-loading-text" style="margin-top: 20px; font-weight: 600; color: var(--color-text-main); font-size: 0.95rem;">Verifying account...</p>
        </div>

        <!-- Top Gradient Banner -->
        <div style="background: var(--bg-gradient); padding: 40px 24px 50px; text-align: center; position: relative; overflow: hidden;">
            <!-- Decorative Circles -->
            <div style="position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.08);"></div>
            <div style="position: absolute; bottom: -40px; left: -20px; width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.06);"></div>
            <div style="position: absolute; top: 20px; left: 30px; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.05);"></div>

            <div style="width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; backdrop-filter: blur(4px); box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
                <span class="material-icons-round" style="font-size: 32px; color: white;">handshake</span>
            </div>
            <h1 style="font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 6px; letter-spacing: 0.5px;">ShareCare</h1>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.9rem; font-weight: 400;">Helping Hands, Saving Lives</p>
        </div>

        <!-- Content Area (overlaps banner slightly) -->
        <div style="flex: 1; background: white; border-radius: 28px 28px 0 0; margin-top: -24px; position: relative; z-index: 2; padding: 28px 24px;">

            <!-- Title & Subtitle -->
            <div style="text-align: center; margin-bottom: 24px;">
                <h2 id="auth-title" style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 6px;">Welcome Back</h2>
                <p id="auth-subtitle" style="color: var(--color-text-muted); font-size: 0.88rem;">Sign in to ShareCare to continue</p>
            </div>

            <!-- Toggle Tabs -->
            <div class="auth-tabs" style="display: flex; background: var(--color-bg-app); border-radius: var(--radius-pill); padding: 4px; margin-bottom: 28px; border: 1px solid var(--color-border);">
                <button id="tab-login" class="auth-tab auth-tab-active">Login</button>
                <button id="tab-signup" class="auth-tab">Sign Up</button>
            </div>

            <!-- Error / Success Message -->
            <div id="auth-message" style="display: none; border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 20px; align-items: center; gap: 10px;">
                <span id="auth-message-icon" class="material-icons-round" style="font-size: 1.2rem;"></span>
                <p id="auth-message-text" style="font-size: 0.85rem; font-weight: 500; flex: 1;"></p>
            </div>
            
            <!-- Forms Container -->
            <div id="forms-container" style="flex: 1;">
                
                <!-- Login Form -->
                <form id="login-form" style="display: flex; flex-direction: column; gap: 18px;">
                    <div class="auth-field">
                        <label class="auth-label">Email Address</label>
                        <div class="auth-input-wrap">
                            <span class="material-icons-round auth-input-icon">email</span>
                            <input type="email" id="login-email" required placeholder="name@example.com" class="auth-input">
                        </div>
                    </div>
                    <div class="auth-field">
                        <label class="auth-label">Password</label>
                        <div class="auth-input-wrap">
                            <span class="material-icons-round auth-input-icon">lock</span>
                            <input type="password" id="login-pass" required placeholder="••••••••" class="auth-input">
                            <button type="button" id="login-toggle-pass" class="auth-pass-toggle">
                                <span class="material-icons-round" style="font-size: 1.2rem;">visibility_off</span>
                            </button>
                        </div>
                    </div>
                    <div style="text-align: right; margin-top: -8px;">
                        <a href="#" style="font-size: 0.83rem; color: var(--color-primary); font-weight: 600; text-decoration: none;">Forgot Password?</a>
                    </div>
                    <button type="submit" class="btn-primary" style="margin-top: 6px; height: 54px; font-size: 1.05rem; box-shadow: var(--shadow-glow); display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span class="material-icons-round" style="font-size: 1.2rem;">login</span>
                        Sign In
                    </button>
                </form>
                
                <!-- Sign Up Form (Hidden by Default) -->
                <form id="signup-form" style="display: none; flex-direction: column; gap: 16px;">
                    <div class="auth-field">
                        <label class="auth-label">Full Name</label>
                        <div class="auth-input-wrap">
                            <span class="material-icons-round auth-input-icon">person</span>
                            <input type="text" id="signup-name" required placeholder="John Doe" class="auth-input">
                        </div>
                    </div>
                    <div class="auth-field">
                        <label class="auth-label">Email</label>
                        <div class="auth-input-wrap">
                            <span class="material-icons-round auth-input-icon">email</span>
                            <input type="email" id="signup-email" required placeholder="name@example.com" class="auth-input">
                        </div>
                    </div>
                    <div class="auth-field">
                        <label class="auth-label">Location</label>
                        <div class="auth-input-wrap">
                            <span class="material-icons-round auth-input-icon">location_on</span>
                            <input type="text" id="signup-location" required placeholder="Your neighborhood in Pune" class="auth-input">
                        </div>
                    </div>
                    <div class="auth-field">
                        <label class="auth-label">Password</label>
                        <div class="auth-input-wrap">
                            <span class="material-icons-round auth-input-icon">lock</span>
                            <input type="password" id="signup-pass" required placeholder="Min 6 characters" class="auth-input">
                            <button type="button" id="signup-toggle-pass" class="auth-pass-toggle">
                                <span class="material-icons-round" style="font-size: 1.2rem;">visibility_off</span>
                            </button>
                        </div>
                        <div id="pass-strength" style="display: none; margin-top: 8px;">
                            <div style="display: flex; gap: 4px; margin-bottom: 4px;">
                                <div class="strength-bar" id="str-bar-1"></div>
                                <div class="strength-bar" id="str-bar-2"></div>
                                <div class="strength-bar" id="str-bar-3"></div>
                                <div class="strength-bar" id="str-bar-4"></div>
                            </div>
                            <p id="pass-strength-text" style="font-size: 0.72rem; color: var(--color-text-muted); font-weight: 500;"></p>
                        </div>
                    </div>
                    <button type="submit" class="btn-primary" style="margin-top: 6px; height: 54px; font-size: 1.05rem; box-shadow: var(--shadow-glow); display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span class="material-icons-round" style="font-size: 1.2rem;">person_add</span>
                        Create Account
                    </button>
                </form>
            </div>

            <!-- Social / Divider -->
            <div style="display: flex; align-items: center; gap: 12px; margin: 24px 0 20px;">
                <div style="flex: 1; height: 1px; background: var(--color-border);"></div>
                <span style="font-size: 0.78rem; color: var(--color-text-muted); font-weight: 500;">or continue with</span>
                <div style="flex: 1; height: 1px; background: var(--color-border);"></div>
            </div>

            <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                <button class="social-btn" id="google-login-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                </button>
                <button class="social-btn" id="guest-login-btn">
                    <span class="material-icons-round" style="font-size: 1.2rem; color: var(--color-text-muted);">person_outline</span>
                    Guest
                </button>
            </div>

            <!-- Footer -->
            <p style="text-align: center; font-size: 0.75rem; color: #94a3b8; line-height: 1.5;">
                By continuing, you agree to ShareCare's<br>
                <a href="#" style="color: var(--color-primary); text-decoration: none; font-weight: 600;">Terms of Service</a> & 
                <a href="#" style="color: var(--color-primary); text-decoration: none; font-weight: 600;">Privacy Policy</a>
            </p>
        </div>

        <style>
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            
            .auth-spinner {
                width: 44px;
                height: 44px;
                border: 4px solid var(--color-bg-app);
                border-top: 4px solid var(--color-primary);
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }

            /* Auth Tabs */
            .auth-tab {
                flex: 1;
                padding: 12px;
                border-radius: var(--radius-pill);
                background: transparent;
                font-weight: 600;
                font-size: 0.9rem;
                color: var(--color-text-muted);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border: none;
                cursor: pointer;
                font-family: inherit;
            }
            .auth-tab-active {
                background: white;
                color: var(--color-primary);
                font-weight: 700;
                box-shadow: var(--shadow-sm);
            }

            /* Auth Fields */
            .auth-field {
                display: flex;
                flex-direction: column;
            }
            .auth-label {
                font-size: 0.78rem;
                color: var(--color-text-muted);
                margin-bottom: 8px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .auth-input-wrap {
                display: flex;
                align-items: center;
                background: var(--color-bg-app);
                border: 1.5px solid var(--color-border);
                border-radius: var(--radius-md);
                padding: 0 16px;
                transition: all 0.25s ease;
            }
            .auth-input-wrap:focus-within {
                border-color: var(--color-primary);
                background: white;
                box-shadow: 0 0 0 3px rgba(0, 210, 255, 0.1);
            }
            .auth-input-icon {
                color: #94a3b8;
                font-size: 1.2rem;
                margin-right: 12px;
                transition: color 0.25s;
            }
            .auth-input-wrap:focus-within .auth-input-icon {
                color: var(--color-primary);
            }
            .auth-input {
                flex: 1;
                border: none;
                background: transparent;
                padding: 15px 0;
                font-size: 0.95rem;
                color: var(--color-text-main);
                outline: none;
                font-family: inherit;
            }
            .auth-input::placeholder {
                color: #b0b8c4;
            }
            .auth-pass-toggle {
                background: none;
                border: none;
                color: #94a3b8;
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                transition: color 0.2s;
            }
            .auth-pass-toggle:hover {
                color: var(--color-primary);
            }

            /* Password Strength */
            .strength-bar {
                flex: 1;
                height: 4px;
                border-radius: 2px;
                background: var(--color-border);
                transition: all 0.3s;
            }

            /* Social Buttons */
            .social-btn {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 13px;
                border-radius: var(--radius-md);
                border: 1.5px solid var(--color-border);
                background: white;
                font-size: 0.9rem;
                font-weight: 600;
                color: var(--color-text-main);
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
            }
            .social-btn:hover {
                border-color: var(--color-primary);
                box-shadow: var(--shadow-sm);
            }
            .social-btn:active {
                transform: scale(0.97);
            }

            /* Auth Message */
            .auth-msg-error {
                background: rgba(239, 68, 68, 0.08);
                border: 1px solid rgba(239, 68, 68, 0.2);
            }
            .auth-msg-error .auth-msg-icon { color: var(--color-error); }
            .auth-msg-error p { color: var(--color-error); }
            
            .auth-msg-success {
                background: rgba(16, 185, 129, 0.08);
                border: 1px solid rgba(16, 185, 129, 0.2);
            }
            .auth-msg-success .auth-msg-icon { color: var(--color-success); }
            .auth-msg-success p { color: var(--color-success); }
        </style>
      </div>
    `;
};

// Event handlers attached once the view is loaded into DOM
document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'auth') {
        const btnLogin = document.getElementById('tab-login');
        const btnSignup = document.getElementById('tab-signup');
        const formLogin = document.getElementById('login-form');
        const formSignup = document.getElementById('signup-form');
        const authTitle = document.getElementById('auth-title');
        const authSubtitle = document.getElementById('auth-subtitle');
        const loading = document.getElementById('auth-loading');
        const loadingText = document.getElementById('auth-loading-text');
        const msgDiv = document.getElementById('auth-message');
        const msgIcon = document.getElementById('auth-message-icon');
        const msgText = document.getElementById('auth-message-text');

        // Show message utility
        const showMessage = (text, type = 'error') => {
            msgDiv.style.display = 'flex';
            msgDiv.className = type === 'error' ? 'auth-msg-error' : 'auth-msg-success';
            msgIcon.textContent = type === 'error' ? 'error' : 'check_circle';
            msgIcon.style.color = type === 'error' ? 'var(--color-error)' : 'var(--color-success)';
            msgText.textContent = text;
            msgText.style.color = type === 'error' ? 'var(--color-error)' : 'var(--color-success)';
        };

        const hideMessage = () => {
            msgDiv.style.display = 'none';
        };

        // Tab switching
        btnLogin.onclick = () => {
            btnLogin.classList.add('auth-tab-active');
            btnSignup.classList.remove('auth-tab-active');
            formLogin.style.display = 'flex';
            formSignup.style.display = 'none';
            authTitle.textContent = "Welcome Back";
            authSubtitle.textContent = "Sign in to ShareCare to continue";
            hideMessage();
        };

        btnSignup.onclick = () => {
            btnSignup.classList.add('auth-tab-active');
            btnLogin.classList.remove('auth-tab-active');
            formSignup.style.display = 'flex';
            formLogin.style.display = 'none';
            authTitle.textContent = "Join ShareCare";
            authSubtitle.textContent = "Start your journey of giving today";
            hideMessage();
        };

        // Password visibility toggles
        const setupPassToggle = (toggleId, inputId) => {
            const toggle = document.getElementById(toggleId);
            const input = document.getElementById(inputId);
            if (toggle && input) {
                toggle.addEventListener('click', () => {
                    const isPassword = input.type === 'password';
                    input.type = isPassword ? 'text' : 'password';
                    toggle.querySelector('.material-icons-round').textContent = isPassword ? 'visibility' : 'visibility_off';
                });
            }
        };
        setupPassToggle('login-toggle-pass', 'login-pass');
        setupPassToggle('signup-toggle-pass', 'signup-pass');

        // Password strength indicator
        const signupPass = document.getElementById('signup-pass');
        const passStrength = document.getElementById('pass-strength');
        const passStrengthText = document.getElementById('pass-strength-text');
        const bars = [
            document.getElementById('str-bar-1'),
            document.getElementById('str-bar-2'),
            document.getElementById('str-bar-3'),
            document.getElementById('str-bar-4')
        ];

        signupPass.addEventListener('input', () => {
            const val = signupPass.value;
            passStrength.style.display = val.length > 0 ? 'block' : 'none';

            let strength = 0;
            if (val.length >= 6) strength++;
            if (val.length >= 8) strength++;
            if (/[A-Z]/.test(val) && /[a-z]/.test(val)) strength++;
            if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) strength++;

            const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];
            const labels = ['Weak', 'Fair', 'Good', 'Strong'];

            bars.forEach((bar, i) => {
                if (i < strength) {
                    bar.style.background = colors[Math.min(strength - 1, 3)];
                } else {
                    bar.style.background = 'var(--color-border)';
                }
            });

            if (strength > 0) {
                passStrengthText.textContent = labels[strength - 1];
                passStrengthText.style.color = colors[strength - 1];
            } else {
                passStrengthText.textContent = 'Too short';
                passStrengthText.style.color = 'var(--color-text-muted)';
            }
        });

        // Perform authentication with loading overlay
        const performAuth = (loadText, callback) => {
            hideMessage();
            loadingText.textContent = loadText;
            loading.style.display = 'flex';

            setTimeout(() => {
                const result = callback();
                loading.style.display = 'none';

                if (result.success) {
                    showMessage(result.message, 'success');
                    setTimeout(() => {
                        window.location.hash = 'home';
                    }, 600);
                } else {
                    showMessage(result.message, 'error');
                }
            }, 1200);
        };

        // Login form
        formLogin.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-pass').value;

            performAuth('Signing you in...', () => loginUser(email, password));
        };

        // Signup form
        formSignup.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const location = document.getElementById('signup-location').value;
            const password = document.getElementById('signup-pass').value;

            performAuth('Creating your account...', () => registerUser({ name, email, password, location }));
        };

        // Guest login
        const guestBtn = document.getElementById('guest-login-btn');
        if (guestBtn) {
            guestBtn.addEventListener('click', () => {
                performAuth('Setting up guest access...', () => {
                    const guestUser = {
                        id: 'guest_' + Date.now(),
                        name: 'Guest User',
                        email: 'guest@sharecare.app',
                        location: 'Pune City',
                        avatar: 'G',
                        createdAt: new Date().toISOString(),
                        donations: 0,
                        requests: 0
                    };
                    localStorage.setItem('sharecare_token', 'guest_session_' + Date.now());
                    localStorage.setItem('sharecare_user', JSON.stringify(guestUser));
                    return { success: true, message: 'Welcome, Guest!' };
                });
            });
        }

        // Google login (mock)
        const googleBtn = document.getElementById('google-login-btn');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                performAuth('Connecting to Google...', () => {
                    const googleUser = {
                        id: 'google_' + Date.now(),
                        name: 'Google User',
                        email: 'user@gmail.com',
                        location: 'Pune',
                        avatar: 'G',
                        createdAt: new Date().toISOString(),
                        donations: 0,
                        requests: 0
                    };
                    localStorage.setItem('sharecare_token', 'google_session_' + Date.now());
                    localStorage.setItem('sharecare_user', JSON.stringify(googleUser));
                    return { success: true, message: 'Google sign-in successful!' };
                });
            });
        }
    }
});
