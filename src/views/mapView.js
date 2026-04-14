// src/views/mapView.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Vite & Leaflet marker paths
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export const mapView = () => {
    return `
      <div class="screen active" style="position: relative; height: 100%; width: 100%; display: flex; flex-direction: column;">
        
        <!-- Header Overlay -->
        <div style="position: absolute; top: 20px; left: 20px; right: 20px; z-index: 1000; display: flex; align-items: center; background: white; padding: 10px 16px; border-radius: var(--radius-pill); box-shadow: var(--shadow-md);">
            <a href="#home" style="margin-right: 12px; display: flex; align-items: center; color: var(--color-text-main);"><span class="material-icons-round">arrow_back</span></a>
            <input type="text" placeholder="Search area in Pune..." style="flex: 1; border: none; outline: none; font-size: 1rem; color: var(--color-text-main);">
            <span class="material-icons-round" style="color: var(--color-primary);">search</span>
        </div>

        <!-- Real Leaflet Map Container -->
        <div id="leaflet-map-container" style="flex: 1; width: 100%; z-index: 1;"></div>

        <!-- Bottom Sheet Info -->
        <div style="position: absolute; bottom: 86px; left: 16px; right: 16px; z-index: 1000; background: white; border-radius: var(--radius-md); padding: 16px; box-shadow: var(--shadow-lg);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h3 style="font-size: 1.1rem; color: var(--color-text-main);">Pune, Maharashtra</h3>
                <span id="map-item-count" style="background: var(--color-primary); color: white; font-size: 0.75rem; padding: 2px 8px; border-radius: var(--radius-pill); font-weight: bold;">0 Items</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--color-text-muted);">Showing active donations around the city.</p>
        </div>
      </div>
    `;
};

// Global map instance to prevent re-initialization errors
let mapInstance = null;

// Initialize map when view loads
document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'map') {
        const mapContainer = document.getElementById('leaflet-map-container');
        if (!mapContainer) return;

        // Clean up previous map instance if it exists and container is fresh
        if (mapInstance) {
            mapInstance.remove();
            mapInstance = null;
        }

        // Coordinates for Pune, India
        const PUNE_LAT = 18.5204;
        const PUNE_LNG = 73.8567;

        // Create the map instance
        mapInstance = L.map(mapContainer, {
            zoomControl: false // Disable default zoom to customize if needed
        }).setView([PUNE_LAT, PUNE_LNG], 13); // Zoom level 13 is good for city view

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(mapInstance);

        // Add some mock data markers for Pune
        const mockDonations = [
            { lat: 18.5250, lng: 73.8550, title: "Food Donation", type: "Food", color: "var(--color-primary)" },
            { lat: 18.5134, lng: 73.8610, title: "Winter Clothes", type: "Clothes", color: "var(--color-secondary)" },
            { lat: 18.5280, lng: 73.8450, title: "Urgent: Blankets", type: "Urgent Need", color: "var(--color-urgent)" },
            { lat: 18.5180, lng: 73.8750, title: "School Books", type: "Books", color: "var(--color-accent)" }
        ];

        // Custom HTML markers (better looking than default pins)
        mockDonations.forEach(donation => {
            const customIcon = L.divIcon({
                className: 'custom-leaflet-marker',
                html: `
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="background: ${donation.color}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-bottom: 2px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); white-space: nowrap;">${donation.title}</div>
                        <span class="material-icons-round" style="color: ${donation.color}; font-size: 2rem; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));">location_on</span>
                    </div>
                `,
                iconSize: [24, 40],
                iconAnchor: [12, 40]
            });

            L.marker([donation.lat, donation.lng], { icon: customIcon })
             .addTo(mapInstance)
             .bindPopup(`<b>${donation.title}</b><br>${donation.type}`);
        });

        // Update count
        const countBadge = document.getElementById('map-item-count');
        if(countBadge) {
            countBadge.innerText = `${mockDonations.length} Items`;
        }

        // Add zoom controls to the bottom right, above bottom sheet
        L.control.zoom({
             position: 'bottomright'
        }).addTo(mapInstance);
        
        // Force a resize event after a slight delay to ensure Leaflet renders tiles correctly
        // as the map container might take a moment to compute its exact height
        setTimeout(() => {
            mapInstance.invalidateSize();
        }, 300);
    }
});
