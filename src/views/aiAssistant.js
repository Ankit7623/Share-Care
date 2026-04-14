// src/views/aiAssistant.js

export const aiAssistantView = () => {
    return `
      <div class="screen active" style="padding: 0; background: #0f172a; min-height: 100%; display: flex; flex-direction: column; overflow: hidden;">
        
        <!-- Premium AI Header -->
        <div style="background: linear-gradient(135deg, rgba(88, 28, 135, 0.9), rgba(190, 24, 93, 0.9)); padding: 24px 20px 40px; position: relative; border-bottom: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(20px);">
            <div style="display: flex; align-items: center; gap: 16px;">
                 <a href="#home" style="width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: white;">
                    <span class="material-icons-round">arrow_back</span>
                </a>
                <div style="width: 50px; height: 50px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(0,210,255,0.4);">
                    <span class="material-icons-round" style="font-size: 2rem; color: #7c3aed;">smart_toy</span>
                </div>
                <div>
                    <h2 style="color: white; font-size: 1.25rem; font-weight: 800; letter-spacing: -0.5px;">Antigravity AI</h2>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <span style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e;"></span>
                        <p style="color: rgba(255,255,255,0.7); font-size: 0.75rem; font-weight: 500;">Online & Ready</p>
                    </div>
                </div>
            </div>
            
            <!-- Abstract background shape -->
            <div style="position: absolute; top: -10px; right: -20px; width: 100px; height: 100px; background: rgba(147, 51, 234, 0.3); filter: blur(40px); border-radius: 50%;"></div>
        </div>

        <!-- Chat Area -->
        <div id="ai-chat-messages" style="flex: 1; overflow-y: auto; padding: 24px 20px; display: flex; flex-direction: column; gap: 16px; margin-top: -20px; border-radius: 24px 24px 0 0; background: #0f172a; border-top: 1px solid rgba(255,255,255,0.05);">
            
            <div class="ai-msg bubbles-ai">
                Hello! I am <strong>Antigravity</strong>, your ShareCare Assistant. How can I help you make a difference today? ✨
            </div>
            
            <div class="ai-msg bubbles-ai">
                You can ask me things like:
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">
                    <button class="ai-chip" onclick="document.dispatchEvent(new CustomEvent('ai-suggest', {detail:'How to donate?'}))">How to donate?</button>
                    <button class="ai-chip" onclick="document.dispatchEvent(new CustomEvent('ai-suggest', {detail:'Find food near me'}))">Find food near me</button>
                    <button class="ai-chip" onclick="document.dispatchEvent(new CustomEvent('ai-suggest', {detail:'Contact NGO'}))">Contact NGO</button>
                    <button class="ai-chip" onclick="document.dispatchEvent(new CustomEvent('ai-suggest', {detail:'Report urgency'}))">Report urgency</button>
                </div>
            </div>

        </div>

        <!-- Input Area -->
        <div style="padding: 20px; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px); border-top: 1px solid rgba(255,255,255,0.05);">
            <div style="display: flex; gap: 12px; align-items: center; background: rgba(255,255,255,0.05); padding: 8px 8px 8px 20px; border-radius: var(--radius-pill); border: 1px solid rgba(255,255,255,0.1);">
                <input id="ai-chat-input" type="text" placeholder="Ask Antigravity anything..." style="flex: 1; background: transparent; color: white; border: none; outline: none; font-size: 0.95rem;">
                <button id="ai-chat-send" style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #db2777); display: flex; align-items: center; justify-content: center; color: white; transition: transform 0.2s;">
                    <span class="material-icons-round">send</span>
                </button>
            </div>
        </div>

        <style>
            .ai-msg {
                max-width: 85%;
                padding: 14px 18px;
                border-radius: 18px;
                font-size: 0.95rem;
                line-height: 1.5;
                animation: slideUp 0.3s ease-out forwards;
            }
            .bubbles-ai {
                background: rgba(255, 255, 255, 0.08);
                color: rgba(255, 255, 255, 0.9);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
                border: 1px solid rgba(255,255,255,0.1);
            }
            .bubbles-user {
                background: linear-gradient(135deg, #7c3aed, #db2777);
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
                box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
            }
            .ai-chip {
                background: rgba(124, 58, 237, 0.15);
                border: 1px solid rgba(124, 58, 237, 0.3);
                color: #a78bfa;
                padding: 6px 14px;
                border-radius: var(--radius-pill);
                font-size: 0.8rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
            }
            .ai-chip:hover {
                background: rgba(124, 58, 237, 0.3);
                transform: translateY(-2px);
            }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            #ai-chat-send:active { transform: scale(0.9); }
        </style>
      </div>
    `;
};

// Handle logic via global events
document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'ai-assistant') {
        const input = document.getElementById('ai-chat-input');
        const sendBtn = document.getElementById('ai-chat-send');
        const msgsContainer = document.getElementById('ai-chat-messages');

        const addMsg = (text, isUser = false) => {
            const div = document.createElement('div');
            div.className = `ai-msg bubbles-${isUser ? 'user' : 'ai'}`;
            div.innerHTML = text;
            msgsContainer.appendChild(div);
            msgsContainer.scrollTop = msgsContainer.scrollHeight;
        };

        const handleSend = () => {
            const text = input.value.trim();
            if (!text) return;
            
            addMsg(text, true);
            input.value = '';

            // AI Logic simulation
            setTimeout(() => {
                let response = "That's a great question! I'm still learning as an AI assistant, but I can help you find donation points on the map or guide you through current food/essentials categories.";
                
                if (text.toLowerCase().includes('donate')) {
                    response = "Donating is easy! Just click the '+' button in the bottom bar to post a new donation. You can add photos, descriptions, and tag the category.";
                } else if (text.toLowerCase().includes('food')) {
                    response = "You can view all current food donations by going to our <a href='#food' style='color:#00d2ff'>Food Category</a> page. There are 4 fresh meals available near Pune City right now!";
                } else if (text.toLowerCase().includes('map')) {
                    response = "I can open the <a href='#map' style='color:#00d2ff'>Interactive Map</a> for you. It shows all donation clusters in real-time.";
                }

                addMsg(response);
            }, 800);
        };

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleSend(); });

        // Listen for internal chips
        document.addEventListener('ai-suggest', (e) => {
            input.value = e.detail;
            handleSend();
        }, { once: true }); 
    }
});
