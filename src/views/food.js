// src/views/food.js

export const foodView = () => {
    return `
      <div class="screen active" style="padding: 20px; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <!-- Header with Back Button -->
        <div style="display: flex; align-items: center; margin-bottom: 24px;">
            <a href="#home" style="margin-right: 16px; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: white; border-radius: 50%; box-shadow: var(--shadow-sm); transition: transform 0.2s;">
                <span class="material-icons-round">arrow_back</span>
            </a>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-main); letter-spacing: -0.5px;">Food Donations</h2>
        </div>

        <!-- Search Bar -->
        <div style="position: relative; margin-bottom: 20px;">
            <span class="material-icons-round" style="position: absolute; left: 16px; top: 14px; color: var(--color-text-muted);">search</span>
            <input type="text" placeholder="Search for meals, groceries..." style="width: 100%; padding: 14px 14px 14px 48px; border-radius: var(--radius-md); border: none; background: white; box-shadow: var(--shadow-sm); font-size: 1rem; color: var(--color-text-main);">
        </div>

        <!-- Food Specific Filters -->
        <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 15px; margin-bottom: 5px; scrollbar-width: none;">
            <div class="filter-chip active" style="padding: 8px 20px; background: var(--color-primary); color: white; border-radius: var(--radius-pill); font-weight: 600; font-size: 0.85rem; white-space: nowrap; cursor: pointer;">All Food</div>
            <div class="filter-chip" style="padding: 8px 20px; background: white; color: var(--color-text-muted); border-radius: var(--radius-pill); font-weight: 500; font-size: 0.85rem; white-space: nowrap; cursor: pointer; box-shadow: var(--shadow-sm);">Veg</div>
            <div class="filter-chip" style="padding: 8px 20px; background: white; color: var(--color-text-muted); border-radius: var(--radius-pill); font-weight: 500; font-size: 0.85rem; white-space: nowrap; cursor: pointer; box-shadow: var(--shadow-sm);">Non-Veg</div>
            <div class="filter-chip" style="padding: 8px 20px; background: white; color: var(--color-text-muted); border-radius: var(--radius-pill); font-weight: 500; font-size: 0.85rem; white-space: nowrap; cursor: pointer; box-shadow: var(--shadow-sm);">Packaged</div>
            <div class="filter-chip" style="padding: 8px 20px; background: white; color: var(--color-text-muted); border-radius: var(--radius-pill); font-weight: 500; font-size: 0.85rem; white-space: nowrap; cursor: pointer; box-shadow: var(--shadow-sm);">Fruits</div>
        </div>

        <!-- Food Content -->
        <div id="food-feed" style="display: flex; flex-direction: column; gap: 16px; padding-bottom: 100px;">
            ${(() => {
            const arr = JSON.parse(localStorage.getItem('sharecare_donations')) || [];
                const mockFood = [
                    { id: "mock-food-1", title: "Home Cooked Protein Meal", type: "Prepared", time: "10 mins ago", loc: "0.5 km away", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", tag: "Veg" },
                    { id: "mock-food-2", title: "Excess Bakery Items", type: "Bakery", time: "25 mins ago", loc: "2.1 km away", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", tag: "Veg" },
                    { id: "mock-food-3", title: "Fruit Baskets (Organic)", type: "Grocery", time: "1 hr ago", loc: "1.2 km away", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", tag: "Veg" },
                    { id: "mock-food-4", title: "Chicken Biryani (5 boxes)", type: "Prepared", time: "2 hrs ago", loc: "3.5 km away", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", tag: "Non-Veg" }
                ];

            const combined = [...arr.filter(d => d.category === 'food').map(d => ({
                title: d.title,
                type: "Donated",
                time: d.time || "Just now",
                loc: d.location || "Nearby",
                img: "https://images.unsplash.com/photo-1593164842264-854604db2260?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                tag: "Food"
            })), ...mockFood];

                return combined.map(item => `
                    <a href="#details/${item.id}" class="glass-card" style="display: flex; flex-direction: column; overflow: hidden; background: white; border: none; box-shadow: var(--shadow-md); text-decoration: none; color: inherit; transition: transform 0.2s;">
                        <div style="width: 100%; height: 160px; background: url('${item.img}') center/cover; position: relative;">
                            <div style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: white; padding: 4px 10px; border-radius: var(--radius-pill); font-size: 0.75rem; font-weight: 600; backdrop-filter: blur(4px);">
                                ${item.tag}
                            </div>
                        </div>
                        <div style="padding: 16px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-main); line-height: 1.2;">${item.title}</h4>
                                <span style="font-size: 0.75rem; color: var(--color-text-muted); white-space: nowrap;">${item.time}</span>
                            </div>
                            <div style="display: flex; align-items: center; color: var(--color-text-muted); font-size: 0.85rem; margin-bottom: 16px;">
                                <span class="material-icons-round" style="font-size: 1.1rem; margin-right: 4px; color: var(--color-primary);">restaurant</span>
                                ${item.loc}
                            </div>
                            <div style="display: flex; gap: 10px;">
                                <button class="btn-primary" style="flex: 2; padding: 10px; font-size: 0.9rem; pointer-events: none;">Reserve Now</button>
                                <button style="flex: 1; padding: 10px; border-radius: var(--radius-pill); border: 1.5px solid var(--color-border); background: white; color: var(--color-text-main); font-weight: 600; display: flex; align-items: center; justify-content: center; pointer-events: none;">
                                    <span class="material-icons-round" style="font-size: 1.3rem;">share</span>
                                </button>
                            </div>
                        </div>
                    </a>
                `).join('');
        })()}
        </div>

        <style>
          .filter-chip { transition: all 0.2s; }
          .filter-chip:active { transform: scale(0.95); }
          .glass-card { transition: transform 0.3s; }
          .glass-card:active { transform: scale(0.98); }
        </style>
      </div>
    `;
};
