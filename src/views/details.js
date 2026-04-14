// src/views/details.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const detailsView = (params) => {
    const itemId = params[0];
    
    // Find item from localStorage or Mock data
    const findItem = () => {
        const local = JSON.parse(localStorage.getItem('sharecare_donations')) || [];
        
        // Comprehensive mock list across all categories
        const mocks = [
            { id: "mock-food-1", title: "Fresh Meals", category: "food", time: "2 mins ago", loc: "Pune City", lat: 18.5204, lng: 73.8567, desc: "A set of 5 freshly packed vegetarian meals. Contains rice, dal, and vegetable curry.", img: "https://www.tasteofhome.com/wp-content/uploads/2025/03/Spinach-Shrimp-Fettuccine_EXPS_FT25_25028_JR_0326_1.jpg?w=700" },
            { id: "mock-food-2", title: "Excess Bakery Items", category: "food", time: "25 mins ago", loc: "Kothrud, Pune", lat: 18.5074, lng: 73.8077, desc: "Assorted breads and pastries from today's batch. Perfectly safe for consumption.", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            { id: "mock-clo-1", title: "Winter Down Jacket", category: "clothes", time: "15 mins ago", loc: "Viman Nagar, Pune", lat: 18.5679, lng: 73.9143, desc: "Gently used winter jacket, size Large. Very warm and clean.", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            { id: "mock-ess-1", title: "Winter Blankets", category: "essentials", time: "1 hr ago", loc: "Hinjewadi, Pune", lat: 18.5913, lng: 73.7389, desc: "Two thick wool blankets. Rarely used, in excellent condition.", img: "https://m.media-amazon.com/images/I/71D9YEDQM+L._AC_UF350,350_QL80_.jpg" },
            { id: "mock-book-1", title: "Calculus - 12th Grade", category: "books", time: "30 mins ago", loc: "Aundh, Pune", lat: 18.5580, lng: 73.8075, desc: "Math textbook for 12th grade NCERT. No markings, clean pages.", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
        ];

        const item = local.find(d => d.id == itemId) || mocks.find(d => d.id == itemId);
        return item || mocks[0]; // fallback to first mock if not found
    };

    const item = findItem();
    
    // For local storage items that don't have lat/lng, use Pune center
    const lat = item.lat || 18.5204;
    const lng = item.lng || 73.8567;

    return `
      <div class="screen active" style="background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column; overflow-y: auto;">
        
        <!-- Hero Image & Back Button -->
        <div style="width: 100%; height: 300px; background: url('${item.img}') center/cover; position: relative;">
            <a href="javascript:history.back()" style="position: absolute; top: 20px; left: 20px; width: 40px; height: 40px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-md); z-index: 10;">
                <span class="material-icons-round">arrow_back</span>
            </a>
            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 100px; background: linear-gradient(to top, var(--color-bg-app), transparent);"></div>
        </div>

        <!-- Details Content -->
        <div style="padding: 0 20px 100px; margin-top: -40px; position: relative; z-index: 5;">
            
            <div style="background: white; border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-md); margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <span style="background: #e0f2fe; color: var(--color-secondary); font-size: 0.75rem; padding: 4px 12px; border-radius: var(--radius-pill); font-weight: 700; text-transform: capitalize;">${item.category}</span>
                    <span style="font-size: 0.85rem; color: var(--color-text-muted);">${item.time}</span>
                </div>
                <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 12px; line-height: 1.2;">${item.title}</h2>
                <div style="display: flex; align-items: center; color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 20px;">
                    <span class="material-icons-round" style="font-size: 1.2rem; margin-right: 6px; color: var(--color-primary);">location_on</span>
                    ${item.loc}
                </div>
                
                <h3 style="font-size: 1rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 8px;">Description</h3>
                <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
                    ${item.desc || "No detailed description provided. This item is ready for pickup and in good condition."}
                </p>
                
                <!-- Pickup Map -->
                <h3 style="font-size: 1rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 12px;">Pickup Location</h3>
                <div id="details-map" style="width: 100%; height: 180px; border-radius: var(--radius-md); background: #eee; margin-bottom: 24px; z-index: 1;"></div>
                
                <!-- Action Buttons -->
                <div style="display: flex; gap: 12px;">
                    <a href="#message/donor-ankit" class="btn-primary" style="flex: 2; height: 55px; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; text-decoration: none;">Message Donor</a>
                    <button style="flex: 1; height: 55px; border-radius: var(--radius-pill); border: 2px solid var(--color-border); background: white; color: var(--color-text-main); font-weight: 700; display: flex; align-items: center; justify-content: center;">
                        <span class="material-icons-round" style="font-size: 1.6rem;">share</span>
                    </button>
                </div>
            </div>

            <!-- Donor Profile Section -->
            <div style="background: white; border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 16px;">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--bg-gradient); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem;">
                    A
                </div>
                <div style="flex: 1;">
                    <h4 style="font-size: 1rem; font-weight: 700; color: var(--color-text-main);">Ankit Gajadhane</h4>
                    <p style="font-size: 0.8rem; color: var(--color-text-muted);">Verified Hero • 12 Donations</p>
                </div>
                <span class="material-icons-round" style="color: var(--color-primary);">verified</span>
            </div>

        </div>

        <script>
            // This will be executed via event listener
        </script>
      </div>
    `;
};

document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'details') {
        const mapContainer = document.getElementById('details-map');
        if (!mapContainer) return;

        // Use a simple timeout to ensure the DOM is painted
        setTimeout(() => {
            // Check if map already initialized
            if (mapContainer._leaflet_id) return;
            
            const lat = 18.5204; // Generic Pune center for now, or fetch from item
            const lng = 73.8567;

            const map = L.map(mapContainer, {
                zoomControl: false,
                attributionControl: false
            }).setView([lat, lng], 14);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            
            L.marker([lat, lng]).addTo(map);
        }, 300);
    }
});
