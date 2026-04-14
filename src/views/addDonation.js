// src/views/addDonation.js
import { addAlert } from '../utils/notificationManager.js';
import { navigate } from '../router.js';

export const addDonationView = () => {
    let userName = "User";
    let userLocation = "Pune";
    try {
        const user = JSON.parse(localStorage.getItem('sharecare_user'));
        if (user && user.name) userName = user.name;
        if (user && user.location) userLocation = user.location;
    } catch (e) { }

    return `
      <div class="screen active" style="padding: 0; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <!-- Matching Overlay (Hidden initially) -->
        <div id="matching-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.97); z-index: 1000; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; backdrop-filter: blur(12px);">
            <div class="radar-container">
                <div class="radar-pulse"></div>
                <div class="radar-pulse" style="animation-delay: 0.7s;"></div>
                <div class="radar-pulse" style="animation-delay: 1.4s;"></div>
                <div style="width: 80px; height: 80px; background: var(--bg-gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; box-shadow: var(--shadow-glow);">
                    <span class="material-icons-round" style="font-size: 2.5rem; color: white;">search</span>
                </div>
            </div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-main); margin-top: 32px; margin-bottom: 10px;">Finding Perfect Matches...</h3>
            <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6; max-width: 280px;">
                Our AI is scanning nearby NGOs and shelters that need your donation.
            </p>
            <div style="display: flex; gap: 6px; margin-top: 24px;">
                <div class="match-dot" style="animation-delay: 0s;"></div>
                <div class="match-dot" style="animation-delay: 0.2s;"></div>
                <div class="match-dot" style="animation-delay: 0.4s;"></div>
            </div>
        </div>

        <!-- Success Overlay (Hidden initially) -->
        <div id="success-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.97); z-index: 1001; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; backdrop-filter: blur(12px);">
            <div class="success-checkmark">
                <div class="check-icon">
                    <span class="icon-line line-tip"></span>
                    <span class="icon-line line-long"></span>
                    <div class="icon-circle"></div>
                    <div class="icon-fix"></div>
                </div>
            </div>
            <h3 style="font-size: 1.6rem; font-weight: 800; color: var(--color-text-main); margin-top: 24px; margin-bottom: 10px;">Match Found! 🎉</h3>
            <p id="success-msg" style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.6; max-width: 300px;"></p>
            <div style="background: var(--color-bg-app); border-radius: var(--radius-md); padding: 16px 24px; margin-top: 20px; display: flex; align-items: center; gap: 12px;">
                <span class="material-icons-round" style="color: var(--color-accent); font-size: 1.5rem;">verified</span>
                <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-text-main);">Pickup will be coordinated shortly</span>
            </div>
        </div>

        <!-- Sticky Header -->
        <div style="display: flex; align-items: center; padding: 16px 20px; background: white; border-bottom: 1px solid var(--color-border); position: sticky; top: 0; z-index: 10;">
            <a href="#home" style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; background: var(--color-bg-app); border-radius: 50%; margin-right: 14px; transition: all 0.2s;">
                <span class="material-icons-round" style="font-size: 1.3rem; color: var(--color-text-main);">arrow_back</span>
            </a>
            <div>
                <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-main); line-height: 1.2;">Add Donation</h2>
                <p style="font-size: 0.75rem; color: var(--color-text-muted);">Share what you can, help those in need</p>
            </div>
        </div>

        <div style="padding: 20px; padding-bottom: 120px; overflow-y: auto;">



            <!-- How It Works Section -->
            <div style="margin-bottom: 24px;">
                <h4 style="font-size: 0.8rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; font-weight: 700;">How It Works</h4>
                <div style="display: flex; gap: 10px;">
                    <div class="how-step-card">
                        <div class="how-step-icon" style="background: rgba(0, 210, 255, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-primary); font-size: 1.3rem;">add_circle</span>
                        </div>
                        <p class="how-step-label">Post Item</p>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span class="material-icons-round" style="color: var(--color-border); font-size: 1rem;">chevron_right</span>
                    </div>
                    <div class="how-step-card">
                        <div class="how-step-icon" style="background: rgba(58, 123, 213, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-secondary); font-size: 1.3rem;">smart_toy</span>
                        </div>
                        <p class="how-step-label">AI Matches</p>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span class="material-icons-round" style="color: var(--color-border); font-size: 1rem;">chevron_right</span>
                    </div>
                    <div class="how-step-card">
                        <div class="how-step-icon" style="background: rgba(0, 230, 118, 0.1);">
                            <span class="material-icons-round" style="color: var(--color-accent); font-size: 1.3rem;">handshake</span>
                        </div>
                        <p class="how-step-label">Delivered</p>
                    </div>
                </div>
            </div>

            <!-- Photo Preview (shown after upload) -->
            <div id="photo-preview-section" style="display: none; width: 100%; height: 200px; border-radius: var(--radius-md); background: #eee; margin-bottom: 20px; position: relative; overflow: hidden; box-shadow: var(--shadow-md);">
                <img id="photo-preview-img" src="" style="width: 100%; height: 100%; object-fit: cover;">
                <button id="remove-photo-btn" style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: white; border-radius: 50%; width: 34px; height: 34px; border: none; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); transition: all 0.2s;">
                    <span class="material-icons-round" style="font-size: 1.2rem;">close</span>
                </button>
                <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.5)); padding: 12px 16px;">
                    <p style="color: white; font-size: 0.8rem; font-weight: 500;">📸 Photo uploaded successfully</p>
                </div>
            </div>

            <!-- Donation Form -->
            <form id="donation-form" style="display: flex; flex-direction: column; gap: 0; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); border: 1px solid var(--color-border); overflow: hidden;">
                
                <!-- Photo Upload Area -->
                <div id="upload-clickable" class="upload-zone" style="width: 100%; padding: 28px 20px; background: linear-gradient(135deg, #f8fafc, #eef2ff); border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.3s;">
                    <div style="width: 56px; height: 56px; background: white; border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); flex-shrink: 0;">
                        <span class="material-icons-round" style="font-size: 1.8rem; color: var(--color-primary);">add_photo_alternate</span>
                    </div>
                    <div>
                        <p style="font-weight: 600; color: var(--color-text-main); font-size: 0.95rem; margin-bottom: 2px;">Add Photo</p>
                        <p style="color: var(--color-text-muted); font-size: 0.8rem;">Tap to upload a photo of your donation item</p>
                    </div>
                    <span class="material-icons-round" style="color: var(--color-text-muted); margin-left: auto;">chevron_right</span>
                    <input type="file" id="real-file-input" style="display: none;" accept="image/*">
                </div>

                <!-- Form Fields -->
                <div style="padding: 24px; display: flex; flex-direction: column; gap: 22px;">

                    <!-- Item Title -->
                    <div class="form-group">
                        <label class="form-label">
                            <span class="material-icons-round" style="font-size: 1rem; margin-right: 6px; vertical-align: middle;">inventory_2</span>
                            Item Title
                        </label>
                        <input type="text" id="don-title" required placeholder="E.g., 5 Fresh Packed Meals" class="form-input">
                        <p class="form-hint">Give a clear title describing what you're donating</p>
                    </div>

                    <!-- Description Field -->
                    <div class="form-group">
                        <label class="form-label">
                            <span class="material-icons-round" style="font-size: 1rem; margin-right: 6px; vertical-align: middle;">description</span>
                            Description
                        </label>
                        <textarea id="don-description" placeholder="Describe the items, their condition, quantity details, expiry (if food), sizes (if clothes)..." rows="4" class="form-input" style="resize: vertical; min-height: 100px; line-height: 1.5;"></textarea>
                        <p class="form-hint">Add details to help NGOs understand your donation better</p>
                    </div>

                    <!-- Category & Quantity Row -->
                    <div style="display: flex; gap: 14px;">
                        <div class="form-group" style="flex: 2;">
                            <label class="form-label">
                                <span class="material-icons-round" style="font-size: 1rem; margin-right: 6px; vertical-align: middle;">category</span>
                                Category
                            </label>
                            <div style="position: relative;">
                                <select id="don-category" required class="form-input" style="appearance: none; padding-right: 40px;">
                                    <option value="food">🍱 Food</option>
                                    <option value="clothes">👕 Clothes</option>
                                    <option value="books">📚 Books</option>
                                    <option value="essentials">🧴 Daily Essentials</option>
                                </select>
                                <span class="material-icons-round" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); pointer-events: none; font-size: 1.2rem;">expand_more</span>
                            </div>
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label class="form-label">Qty</label>
                            <input type="number" id="don-qty" min="1" value="1" required class="form-input" style="text-align: center;">
                        </div>
                    </div>

                    <!-- Condition -->
                    <div class="form-group">
                        <label class="form-label">
                            <span class="material-icons-round" style="font-size: 1rem; margin-right: 6px; vertical-align: middle;">grade</span>
                            Condition
                        </label>
                        <div id="condition-selector" style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <button type="button" class="condition-chip active-chip" data-value="new">✨ New</button>
                            <button type="button" class="condition-chip" data-value="like-new">Like New</button>
                            <button type="button" class="condition-chip" data-value="good">Good</button>
                            <button type="button" class="condition-chip" data-value="fair">Fair</button>
                        </div>
                    </div>

                    <!-- Pickup Location -->
                    <div class="form-group">
                        <label class="form-label">
                            <span class="material-icons-round" style="font-size: 1rem; margin-right: 6px; vertical-align: middle;">place</span>
                            Pickup Location
                        </label>
                        <div style="position: relative;">
                            <span class="material-icons-round" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--color-primary); font-size: 1.2rem;">my_location</span>
                            <input type="text" id="don-location" required placeholder="Enter your neighborhood..." value="${userLocation}" class="form-input" style="padding-left: 44px;">
                        </div>
                    </div>

                    <!-- Urgency / Availability -->
                    <div class="form-group">
                        <label class="form-label">
                            <span class="material-icons-round" style="font-size: 1rem; margin-right: 6px; vertical-align: middle;">schedule</span>
                            Availability
                        </label>
                        <div id="availability-selector" style="display: flex; gap: 8px;">
                            <button type="button" class="availability-chip active-chip" data-value="now">
                                <span class="material-icons-round" style="font-size: 0.9rem;">bolt</span>
                                Now
                            </button>
                            <button type="button" class="availability-chip" data-value="today">Today</button>
                            <button type="button" class="availability-chip" data-value="this-week">This Week</button>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div id="donation-error" style="display: none; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-sm); padding: 12px 16px; display: none; align-items: center; gap: 10px;">
                        <span class="material-icons-round" style="color: var(--color-error); font-size: 1.2rem;">error</span>
                        <p id="donation-error-text" style="font-size: 0.85rem; color: var(--color-error); font-weight: 500;"></p>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" id="submit-donation-btn" class="btn-primary" style="margin-top: 6px; height: 56px; font-size: 1.05rem; box-shadow: var(--shadow-glow); display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: var(--radius-md);">
                        <span class="material-icons-round" style="font-size: 1.3rem;">volunteer_activism</span>
                        Post Donation
                    </button>
                </div>
            </form>

            <!-- Tips Section -->
            <div style="margin-top: 24px; background: white; border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm); border: 1px solid var(--color-border);">
                <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
                    <span class="material-icons-round" style="color: var(--color-warning); font-size: 1.1rem;">tips_and_updates</span>
                    Donation Tips
                </h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div class="tip-item">
                        <span class="material-icons-round" style="color: var(--color-accent); font-size: 1rem; flex-shrink: 0;">check_circle</span>
                        <p style="font-size: 0.83rem; color: var(--color-text-muted); line-height: 1.4;">Ensure food items haven't expired and are properly packaged</p>
                    </div>
                    <div class="tip-item">
                        <span class="material-icons-round" style="color: var(--color-accent); font-size: 1rem; flex-shrink: 0;">check_circle</span>
                        <p style="font-size: 0.83rem; color: var(--color-text-muted); line-height: 1.4;">Wash and fold clothes before donating for hygiene</p>
                    </div>
                    <div class="tip-item">
                        <span class="material-icons-round" style="color: var(--color-accent); font-size: 1rem; flex-shrink: 0;">check_circle</span>
                        <p style="font-size: 0.83rem; color: var(--color-text-muted); line-height: 1.4;">Adding a photo increases your match rate by 3x</p>
                    </div>
                    <div class="tip-item">
                        <span class="material-icons-round" style="color: var(--color-accent); font-size: 1rem; flex-shrink: 0;">check_circle</span>
                        <p style="font-size: 0.83rem; color: var(--color-text-muted); line-height: 1.4;">Detailed descriptions help NGOs pick up faster</p>
                    </div>
                </div>
            </div>
        </div>

        <style>
            /* Radar animation */
            .radar-container {
                position: relative;
                width: 160px;
                height: 160px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .radar-pulse {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 3px solid var(--color-primary);
                animation: scanPulse 2.1s linear infinite;
                opacity: 0;
            }
            @keyframes scanPulse {
                0% { transform: scale(0.5); opacity: 0.8; }
                100% { transform: scale(2.5); opacity: 0; }
            }

            /* Match dots bounce */
            .match-dot {
                width: 10px;
                height: 10px;
                background: var(--color-primary);
                border-radius: 50%;
                animation: matchBounce 1.2s infinite ease-in-out;
            }
            @keyframes matchBounce {
                0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                40% { transform: scale(1); opacity: 1; }
            }

            /* Success checkmark */
            .success-checkmark {
                width: 80px;
                height: 80px;
                margin: 0 auto;
            }
            .check-icon {
                width: 80px;
                height: 80px;
                position: relative;
                border-radius: 50%;
                box-sizing: content-box;
                border: 4px solid var(--color-accent);
                animation: successFill 0.4s ease-in-out 0.4s forwards, successScale 0.3s ease-in-out 0.9s both;
            }
            .check-icon::before {
                top: 3px;
                left: -2px;
                width: 30px;
                height: 100%;
                transform-origin: 100% 50%;
                border-radius: 100px 0 0 100px;
            }
            .check-icon::after {
                top: 0;
                left: 30px;
                width: 60px;
                height: 100%;
                transform-origin: 0 50%;
                border-radius: 0 100px 100px 0;
                animation: successRotate 4.25s ease-in;
            }
            .icon-line {
                height: 5px;
                background-color: var(--color-accent);
                display: block;
                border-radius: 2px;
                position: absolute;
                z-index: 10;
            }
            .icon-line.line-tip {
                top: 46px;
                left: 14px;
                width: 25px;
                transform: rotate(45deg);
                animation: successTip 0.75s;
            }
            .icon-line.line-long {
                top: 38px;
                right: 8px;
                width: 47px;
                transform: rotate(-45deg);
                animation: successLong 0.75s;
            }
            @keyframes successTip {
                0%, 54% { width: 0; left: 1px; top: 19px; }
                70% { width: 50px; left: -8px; top: 37px; }
                84% { width: 17px; left: 21px; top: 48px; }
                100% { width: 25px; left: 14px; top: 46px; }
            }
            @keyframes successLong {
                0%, 65% { width: 0; right: 46px; top: 54px; }
                84% { width: 55px; right: 0px; top: 35px; }
                100% { width: 47px; right: 8px; top: 38px; }
            }
            @keyframes successScale {
                0%, 100% { transform: none; }
                50% { transform: scale3d(1.1, 1.1, 1); }
            }
            @keyframes successFill {
                100% { box-shadow: inset 0px 0px 0px 30px rgba(0, 230, 118, 0.06); }
            }

            /* Form Styles */
            .form-group {
                display: flex;
                flex-direction: column;
            }
            .form-label {
                font-size: 0.78rem;
                color: var(--color-text-muted);
                margin-bottom: 8px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: flex;
                align-items: center;
            }
            .form-input {
                padding: 14px 16px;
                border-radius: var(--radius-sm);
                border: 1.5px solid var(--color-border);
                background: var(--color-bg-app);
                font-size: 0.95rem;
                font-family: inherit;
                color: var(--color-text-main);
                outline: none;
                transition: all 0.25s ease;
                width: 100%;
            }
            .form-input:focus {
                border-color: var(--color-primary);
                background: white;
                box-shadow: 0 0 0 3px rgba(0, 210, 255, 0.1);
            }
            .form-input::placeholder {
                color: #b0b8c4;
            }
            .form-hint {
                font-size: 0.72rem;
                color: #94a3b8;
                margin-top: 6px;
                padding-left: 2px;
            }

            /* Condition Chips */
            .condition-chip, .availability-chip {
                padding: 10px 16px;
                border-radius: var(--radius-pill);
                background: var(--color-bg-app);
                border: 1.5px solid var(--color-border);
                font-size: 0.83rem;
                font-weight: 600;
                color: var(--color-text-muted);
                cursor: pointer;
                transition: all 0.25s ease;
                font-family: inherit;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .condition-chip:hover, .availability-chip:hover {
                border-color: var(--color-primary);
                color: var(--color-primary);
            }
            .condition-chip.active-chip, .availability-chip.active-chip {
                background: rgba(0, 210, 255, 0.08);
                border-color: var(--color-primary);
                color: var(--color-primary);
                box-shadow: 0 2px 8px rgba(0, 210, 255, 0.15);
            }

            /* Upload zone hover */
            .upload-zone:hover {
                background: linear-gradient(135deg, #eef2ff, #e0f2fe) !important;
            }
            .upload-zone:active {
                transform: scale(0.99);
            }

            /* How it works */
            .how-step-card {
                flex: 1;
                background: white;
                border-radius: var(--radius-sm);
                padding: 14px 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                box-shadow: var(--shadow-sm);
                border: 1px solid var(--color-border);
                transition: all 0.3s ease;
            }
            .how-step-card:hover {
                transform: translateY(-3px);
                box-shadow: var(--shadow-md);
            }
            .how-step-icon {
                width: 40px;
                height: 40px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .how-step-label {
                font-size: 0.72rem;
                font-weight: 600;
                color: var(--color-text-muted);
                text-align: center;
            }

            /* Tip items */
            .tip-item {
                display: flex;
                align-items: flex-start;
                gap: 10px;
            }

            /* Hero Card float animation */
            .donation-hero-card {
                animation: heroFloat 6s ease-in-out infinite;
            }
            @keyframes heroFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
            }
        </style>

      </div>
    `;
};

document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'add-donation') {
        const form = document.getElementById('donation-form');
        const overlay = document.getElementById('matching-overlay');
        const successOverlay = document.getElementById('success-overlay');
        const uploadArea = document.getElementById('upload-clickable');
        const fileInput = document.getElementById('real-file-input');
        const previewSection = document.getElementById('photo-preview-section');
        const previewImg = document.getElementById('photo-preview-img');
        const removePhotoBtn = document.getElementById('remove-photo-btn');
        const errorDiv = document.getElementById('donation-error');
        const errorText = document.getElementById('donation-error-text');

        // Condition Chip Selection
        document.querySelectorAll('.condition-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.condition-chip').forEach(c => c.classList.remove('active-chip'));
                chip.classList.add('active-chip');
            });
        });

        // Availability Chip Selection
        document.querySelectorAll('.availability-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.availability-chip').forEach(c => c.classList.remove('active-chip'));
                chip.classList.add('active-chip');
            });
        });

        // Photo Upload Handling
        uploadArea.onclick = () => fileInput.click();
        
        fileInput.onchange = (ev) => {
            const file = ev.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (re) => {
                    previewImg.src = re.target.result;
                    previewSection.style.display = 'block';
                    uploadArea.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        };

        removePhotoBtn.onclick = () => {
            previewSection.style.display = 'none';
            uploadArea.style.display = 'flex';
            fileInput.value = '';
        };

        // Show error
        const showError = (msg) => {
            errorDiv.style.display = 'flex';
            errorText.textContent = msg;
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };

        // Submission Handling
        form.onsubmit = (ev) => {
            ev.preventDefault();
            errorDiv.style.display = 'none';
            
            const title = document.getElementById('don-title').value.trim();
            const description = document.getElementById('don-description').value.trim();
            const category = document.getElementById('don-category').value;
            const qty = document.getElementById('don-qty').value;
            const location = document.getElementById('don-location').value.trim();
            const condition = document.querySelector('.condition-chip.active-chip')?.dataset.value || 'good';
            const availability = document.querySelector('.availability-chip.active-chip')?.dataset.value || 'now';

            // Validations
            if (!title || title.length < 3) {
                showError('Please enter a proper item title (at least 3 characters)');
                return;
            }
            if (!location || location.length < 2) {
                showError('Please enter a valid pickup location');
                return;
            }

            const submitBtn = document.getElementById('submit-donation-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="match-dot" style="animation-delay: 0s;"></div><div class="match-dot" style="animation-delay: 0.2s;"></div><div class="match-dot" style="animation-delay: 0.4s;"></div>';

            // 1. Show Scanning Overlay
            setTimeout(() => {
                overlay.style.display = 'flex';

                // 2. Simulate Matching Logic
                setTimeout(() => {
                    overlay.style.display = 'none';

                    const newDonation = {
                        id: Date.now(),
                        title,
                        description,
                        category,
                        quantity: parseInt(qty),
                        condition,
                        availability,
                        location,
                        time: "Just now",
                        status: "Active",
                        donor: JSON.parse(localStorage.getItem('sharecare_user'))?.name || 'Anonymous',
                        img: previewImg.src || ""
                    };

                    // Save to localStorage
                    const donations = JSON.parse(localStorage.getItem('sharecare_donations')) || [];
                    donations.unshift(newDonation);
                    localStorage.setItem('sharecare_donations', JSON.stringify(donations));

                    // Show success overlay
                    const successMsg = document.getElementById('success-msg');
                    successMsg.textContent = `City Hope NGO has accepted your "${title}" donation. They will coordinate pickup from ${location}.`;
                    successOverlay.style.display = 'flex';

                    // 3. Trigger Real-time Notification
                    addAlert({
                        title: 'Match Found Nearby!',
                        desc: `City Hope NGO has accepted your ${title} donation. They will coordinate pickup from ${location}.`,
                        type: 'info',
                        sender: 'Match Engine',
                        icon: 'handshake'
                    });

                    // 4. Redirect after success
                    setTimeout(() => {
                        navigate('home');
                    }, 2500);
                }, 2800);
            }, 400);
        };
    }
});
