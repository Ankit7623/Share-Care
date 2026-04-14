// src/views/modifyRequest.js
import { navigate } from '../router.js';

export const modifyRequestView = (params) => {
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
            <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--color-text-main);">Modify Request</h2>
        </div>

        <div style="background: white; padding: 24px; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
            <div style="margin-bottom: 20px;">
                <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 8px;">Request Title</label>
                <input type="text" id="edit-req-title" value="${request.title}" style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: 1.5px solid var(--color-border); font-size: 1rem; color: var(--color-text-main);">
            </div>

            <div style="margin-bottom: 30px;">
                <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 8px;">Category</label>
                <select id="edit-req-category" style="width: 100%; padding: 14px; border-radius: var(--radius-md); border: 1.5px solid var(--color-border); font-size: 1rem; color: var(--color-text-main);">
                    <option value="food" ${request.category === 'food' ? 'selected' : ''}>Food</option>
                    <option value="essentials" ${request.category === 'essentials' ? 'selected' : ''}>Essentials</option>
                    <option value="clothes" ${request.category === 'clothes' ? 'selected' : ''}>Clothes</option>
                    <option value="books" ${request.category === 'books' ? 'selected' : ''}>Books</option>
                </select>
            </div>

            <button id="update-req-btn" class="btn-primary" style="width: 100%; padding: 16px; font-size: 1rem; margin-bottom: 12px;">Save Changes</button>
            <button id="delete-req-btn" style="width: 100%; padding: 16px; border-radius: var(--radius-pill); border: 1.5px solid var(--color-urgent); background: white; color: var(--color-urgent); font-weight: 700; font-size: 1rem;">Delete Request</button>
        </div>

      </div>
    `;
};

// Logic via global event listener
document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'modify-request') {
        const urlParams = window.location.hash.split('/').slice(1);
        const currentId = urlParams[0];

        const updateBtn = document.getElementById('update-req-btn');
        const deleteBtn = document.getElementById('delete-req-btn');

        if (updateBtn) {
            updateBtn.addEventListener('click', () => {
                const title = document.getElementById('edit-req-title').value;
                const category = document.getElementById('edit-req-category').value;

                let requests = JSON.parse(localStorage.getItem('sharecare_requests')) || [];
                const index = requests.findIndex(r => r.id === currentId);
                
                if (index !== -1) {
                    requests[index].title = title;
                    requests[index].category = category;
                    localStorage.setItem('sharecare_requests', JSON.stringify(requests));
                    alert('Request updated successfully!');
                    navigate('my-needs');
                }
            });
        }

        if (deleteBtn) {
            let confirmStep = false;
            deleteBtn.addEventListener('click', () => {
                if (!confirmStep) {
                    confirmStep = true;
                    deleteBtn.textContent = 'Confirm Delete?';
                    deleteBtn.style.background = 'var(--color-urgent)';
                    deleteBtn.style.color = 'white';
                    
                    // Reset after 3 seconds if not clicked again
                    setTimeout(() => {
                        confirmStep = false;
                        if (deleteBtn) {
                            deleteBtn.textContent = 'Delete Request';
                            deleteBtn.style.background = 'white';
                            deleteBtn.style.color = 'var(--color-urgent)';
                        }
                    }, 3000);
                } else {
                    let requests = JSON.parse(localStorage.getItem('sharecare_requests')) || [];
                    const filtered = requests.filter(r => r.id !== currentId);
                    localStorage.setItem('sharecare_requests', JSON.stringify(filtered));
                    navigate('my-needs');
                }
            });
        }
    }
});
