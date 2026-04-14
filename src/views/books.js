// src/views/books.js

export const booksView = () => {
    return `
      <div class="screen active" style="padding: 20px; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <!-- Header with Back Button -->
        <div style="display: flex; align-items: center; margin-bottom: 24px;">
            <a href="#home" style="margin-right: 16px; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: white; border-radius: 50%; box-shadow: var(--shadow-sm); transition: transform 0.2s;">
                <span class="material-icons-round">arrow_back</span>
            </a>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-main); letter-spacing: -0.5px;">Book Donations</h2>
        </div>

        <!-- Search Bar -->
        <div style="position: relative; margin-bottom: 20px;">
            <span class="material-icons-round" style="position: absolute; left: 16px; top: 14px; color: var(--color-text-muted);">search</span>
            <input type="text" placeholder="Search for textbooks, novels..." style="width: 100%; padding: 14px 14px 14px 48px; border-radius: var(--radius-md); border: none; background: white; box-shadow: var(--shadow-sm); font-size: 1rem; color: var(--color-text-main);">
        </div>

        <!-- Books Specific Filters -->
        <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 15px; margin-bottom: 5px; scrollbar-width: none;">
            <div class="filter-chip active" style="padding: 8px 20px; background: var(--color-success); color: white; border-radius: var(--radius-pill); font-weight: 600; font-size: 0.85rem; white-space: nowrap; cursor: pointer;">All Books</div>
            <div class="filter-chip" style="padding: 8px 20px; background: white; color: var(--color-text-muted); border-radius: var(--radius-pill); font-weight: 500; font-size: 0.85rem; white-space: nowrap; cursor: pointer; box-shadow: var(--shadow-sm);">Textbooks</div>
            <div class="filter-chip" style="padding: 8px 20px; background: white; color: var(--color-text-muted); border-radius: var(--radius-pill); font-weight: 500; font-size: 0.85rem; white-space: nowrap; cursor: pointer; box-shadow: var(--shadow-sm);">Novels</div>
            <div class="filter-chip" style="padding: 8px 20px; background: white; color: var(--color-text-muted); border-radius: var(--radius-pill); font-weight: 500; font-size: 0.85rem; white-space: nowrap; cursor: pointer; box-shadow: var(--shadow-sm);">Children</div>
            <div class="filter-chip" style="padding: 8px 20px; background: white; color: var(--color-text-muted); border-radius: var(--radius-pill); font-weight: 500; font-size: 0.85rem; white-space: nowrap; cursor: pointer; box-shadow: var(--shadow-sm);">Entrance Exams</div>
        </div>

        <!-- Content Feed -->
        <div id="books-feed" style="display: flex; flex-direction: column; gap: 16px; padding-bottom: 100px;">
            ${(() => {
                const arr = JSON.parse(localStorage.getItem('sharecare_donations')) || [];
                const mockBooks = [
                    { id: "mock-book-1", title: "Calculus - 12th Grade NCERT", type: "Education", time: "30 mins ago", loc: "0.4 km away", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", tag: "Academic" },
                    { id: "mock-book-2", title: "Harry Potter Collection", type: "Novel", time: "1 hr ago", loc: "3.2 km away", img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", tag: "Fantasy" },
                    { id: "mock-book-3", title: "Python Programming for Beginners", type: "Tech", time: "2 hrs ago", loc: "1.5 km away", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", tag: "Tech" },
                    { id: "mock-book-4", title: "Story Books (Pack of 10)", type: "Kids", time: "5 hrs ago", loc: "2.5 km away", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", tag: "Children" }
                ];
                
                const combined = [...arr.filter(d => d.category === 'books').map(d => ({
                    id: d.id,
                    title: d.title, 
                    type: "Donated", 
                    time: d.time || "Just now", 
                    loc: d.location || "Nearby", 
                    img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                    tag: "Books"
                })), ...mockBooks];

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
                                <span class="material-icons-round" style="font-size: 1.1rem; margin-right: 4px; color: var(--color-success);">menu_book</span>
                                ${item.loc}
                            </div>
                            <div style="display: flex; gap: 10px;">
                                <button class="btn-primary" style="flex: 2; padding: 10px; font-size: 0.9rem; background: linear-gradient(135deg, #10b981, #059669); box-shadow: none; pointer-events: none;">Reserve Now</button>
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
