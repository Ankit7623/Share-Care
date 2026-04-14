// src/views/home.js
export const homeView = () => {
    let userName = "User";
    let location = "Your Area";
    try {
        const user = JSON.parse(localStorage.getItem('sharecare_user'));
        if (user && user.name) userName = user.name;
        if (user && user.location) location = user.location;
    } catch (e) { }

    return `
      <div class="screen active" style="padding: 20px; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <!-- Header Section -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <div>
                <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 4px;">Welcome back,</p>
                <h2 style="color: var(--color-text-main); font-size: 1.5rem; font-weight: 700;">${userName} 👋</h2>
            </div>
            <div style="width: 45px; height: 45px; border-radius: 50%; background: var(--bg-gradient); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem; box-shadow: var(--shadow-sm);">
                ${userName.charAt(0).toUpperCase()}
            </div>
        </div>

        <!-- Location Filter -->
        <div id="location-container" style="display: flex; align-items: center; background: white; padding: 12px 16px; border-radius: var(--radius-pill); box-shadow: var(--shadow-sm); margin-bottom: 24px; transition: all 0.3s ease;">
            <span class="material-icons-round" style="color: var(--color-primary); margin-right: 8px;">location_on</span>
            
            <!-- Display State -->
            <div id="location-display" style="flex: 1; display: flex; flex-direction: column;">
                <p style="font-size: 0.75rem; color: var(--color-text-muted); line-height: 1;">Current Filter Area</p>
                <p id="current-location-text" style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-main);">${location}</p>
            </div>

            <!-- Edit State (Hidden initially) -->
            <div id="location-form" style="flex: 1; display: none; align-items: center;">
                <input type="text" id="location-input" placeholder="Enter neighborhood..." value="${location}" 
                       style="width: 100%; border: none; font-size: 0.95rem; font-weight: 600; color: var(--color-text-main); outline: none; background: transparent;">
            </div>

            <!-- Action Buttons -->
            <button id="edit-location-btn" style="background: var(--color-bg-app); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); transition: all 0.2s;">
                <span class="material-icons-round" style="font-size: 1.2rem;">edit</span>
            </button>
            <button id="save-location-btn" style="display: none; background: var(--bg-gradient); border-radius: 50%; width: 32px; height: 32px; align-items: center; justify-content: center; color: white; box-shadow: var(--shadow-sm);">
                <span class="material-icons-round" style="font-size: 1.2rem;">check</span>
            </button>
        </div>

        <!-- Category Selector -->
        <h3 style="font-size: 1.1rem; margin-bottom: 12px; color: var(--color-text-main);">Categories</h3>
        <div style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 12px; scrollbar-width: none;">
            <a href="#food" class="category-card" style="min-width: 80px; flex-shrink: 0; background: white; padding: 16px 8px; border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; box-shadow: var(--shadow-sm); border: 2px solid var(--color-primary);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-bg-app); display: flex; justify-content: center; align-items: center; margin-bottom: 8px;">
                    <span class="material-icons-round" style="color: var(--color-primary);">restaurant</span>
                </div>
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--color-primary);">Food</span>
            </a>
            <a href="#clothes" class="category-card" style="min-width: 80px; flex-shrink: 0; background: white; padding: 16px 8px; border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; box-shadow: var(--shadow-sm); border: 2px solid transparent;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-bg-app); display: flex; justify-content: center; align-items: center; margin-bottom: 8px;">
                    <span class="material-icons-round" style="color: var(--color-secondary);">checkroom</span>
                </div>
                <span style="font-size: 0.8rem; font-weight: 500; color: var(--color-text-muted);">Clothes</span>
            </a>
            <a href="#books" class="category-card" style="min-width: 80px; flex-shrink: 0; background: white; padding: 16px 8px; border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; box-shadow: var(--shadow-sm); border: 2px solid transparent;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-bg-app); display: flex; justify-content: center; align-items: center; margin-bottom: 8px;">
                    <span class="material-icons-round" style="color: var(--color-accent);">menu_book</span>
                </div>
                <span style="font-size: 0.8rem; font-weight: 500; color: var(--color-text-muted);">Books</span>
            </a>
            <a href="#essentials" class="category-card" style="min-width: 80px; flex-shrink: 0; background: white; padding: 16px 8px; border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; box-shadow: var(--shadow-sm); border: 2px solid transparent;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-bg-app); display: flex; justify-content: center; align-items: center; margin-bottom: 8px;">
                    <span class="material-icons-round" style="color: var(--color-warning);">local_pharmacy</span>
                </div>
                <span style="font-size: 0.8rem; font-weight: 500; color: var(--color-text-muted);">Essentials</span>
            </a>
        </div>

        <style>
          .category-card { 
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            cursor: pointer;
          }
          .category-card:hover { 
            transform: translateY(-10px);
            box-shadow: 0 12px 20px rgba(0,0,0,0.1);
            border-color: var(--color-primary) !important;
          }
          .category-card:hover .material-icons-round {
            transform: scale(1.2) rotate(5deg);
            color: var(--color-primary) !important;
          }
          .category-card:active { 
            transform: scale(0.92); 
            transition: all 0.1s;
          }
          
          .category-card .material-icons-round {
            transition: all 0.3s ease;
          }

          .location-editing {
            border: 2px solid var(--color-primary) !important;
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.2) !important;
          }
        </style>

      </div>
    `;
};

// Handle Location Form Logic
document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'home') {
        const editBtn = document.getElementById('edit-location-btn');
        const saveBtn = document.getElementById('save-location-btn');
        const display = document.getElementById('location-display');
        const form = document.getElementById('location-form');
        const input = document.getElementById('location-input');
        const container = document.getElementById('location-container');
        const displayText = document.getElementById('current-location-text');

        const toggleEdit = () => {
            const isEditing = display.style.display === 'none';
            if (isEditing) {
                // Save logic
                const newLoc = input.value.trim();
                if (newLoc) {
                    const user = JSON.parse(localStorage.getItem('sharecare_user')) || {};
                    user.location = newLoc;
                    localStorage.setItem('sharecare_user', JSON.stringify(user));
                    displayText.textContent = newLoc;
                }
                display.style.display = 'flex';
                form.style.display = 'none';
                editBtn.style.display = 'flex';
                saveBtn.style.display = 'none';
                container.classList.remove('location-editing');
            } else {
                // Edit mode
                display.style.display = 'none';
                form.style.display = 'flex';
                editBtn.style.display = 'none';
                saveBtn.style.display = 'flex';
                container.classList.add('location-editing');
                input.focus();
            }
        };

        editBtn.addEventListener('click', toggleEdit);
        saveBtn.addEventListener('click', toggleEdit);
        input.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') toggleEdit();
        });
    }
});
