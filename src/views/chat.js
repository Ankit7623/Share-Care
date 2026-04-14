// src/views/chat.js
export const chatView = () => {
    return `
      <div class="screen active" style="padding: 20px; background: var(--color-bg-app); min-height: 100%; display: flex; flex-direction: column;">
        
        <div style="margin-bottom: 20px; padding-top: 10px;">
            <h2 style="font-size: 1.8rem; font-weight: 700; color: var(--color-text-main);">Messages</h2>
        </div>

        <!-- Search Bar -->
         <div style="position: relative; margin-bottom: 24px;">
            <span class="material-icons-round" style="position: absolute; left: 14px; top: 12px; color: var(--color-text-muted);">search</span>
            <input type="text" placeholder="Search conversations..." style="width: 100%; padding: 12px 12px 12px 44px; border-radius: var(--radius-pill); border: 1px solid var(--color-border); background: white; font-size: 0.9rem; box-shadow: var(--shadow-sm);">
        </div>

        <!-- Chat List -->
        <div style="display: flex; flex-direction: column; gap: 4px; padding-bottom: 100px;">
            
            <!-- Chat Item -->
            <a href="#message/city-hope" style="display: flex; align-items: center; padding: 16px; background: white; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); cursor: pointer; transition: 0.2s; text-decoration: none; color: inherit;">
                <div style="position: relative;">
                    <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--bg-gradient); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem; margin-right: 16px;">
                        C
                    </div>
                    <div style="position: absolute; bottom: 0; right: 16px; width: 14px; height: 14px; background: var(--color-success); border: 2px solid white; border-radius: 50%;"></div>
                </div>
                
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                        <h4 style="font-size: 1rem; color: var(--color-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">City Hope NGO</h4>
                        <span style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; flex-shrink: 0;">10:30 AM</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--color-text-main); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">Thank you! When can we pick it up?</p>
                </div>
                <div style="width: 8px; height: 8px; background: var(--color-primary); border-radius: 50%; margin-left: 12px;"></div>
            </a>

            <!-- Chat Item 2 -->
            <a href="#message/volunteer-mark" style="display: flex; align-items: center; padding: 16px; background: transparent; border-bottom: 1px solid var(--color-border); cursor: pointer; text-decoration: none; color: inherit;">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: #94a3b8; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem; margin-right: 16px;">
                    M
                </div>
                
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                        <h4 style="font-size: 1rem; color: var(--color-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">Mark (Volunteer)</h4>
                        <span style="font-size: 0.75rem; color: var(--color-text-muted); flex-shrink: 0;">Yesterday</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">I have dropped the books at the center.</p>
                </div>
            </a>

        </div>

      </div>
    `;
};
