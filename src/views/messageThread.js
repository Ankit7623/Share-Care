// src/views/messageThread.js
import { navigate } from '../router.js';

export const messageThreadView = (params) => {
    const chatId = params[0] || 'city-hope';
    const chats = JSON.parse(localStorage.getItem('sharecare_chats')) || {};
    
    // Default chat if none exists
    if (!chats[chatId]) {
        chats[chatId] = [
            { id: 1, text: "Hi! We saw your food donation. Is it still available?", sender: 'them', time: '10:30 AM' },
            { id: 2, text: "Yes, it is! I have 10 meal packets ready.", sender: 'me', time: '10:32 AM' },
            { id: 3, text: "Great! When can we pick it up?", sender: 'them', time: '10:35 AM' }
        ];
        localStorage.setItem('sharecare_chats', JSON.stringify(chats));
    }

    const messages = chats[chatId];
    const name = chatId === 'city-hope' ? 'City Hope NGO' : 'Donor';

    return `
      <div class="screen active" style="background: white; height: 100vh; display: flex; flex-direction: column;">
        
        <!-- Chat Header -->
        <div style="padding: 16px; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: 12px; position: sticky; top: 0; background: white; z-index: 10;">
             <a href="#chat" style="color: var(--color-text-main);"><span class="material-icons-round">arrow_back</span></a>
             <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--bg-gradient); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                ${name.charAt(0)}
             </div>
             <div style="flex: 1;">
                <h3 style="font-size: 1rem; color: var(--color-text-main); margin: 0;">${name}</h3>
                <span style="font-size: 0.75rem; color: var(--color-success); font-weight: 600;">online</span>
             </div>
             <span class="material-icons-round" style="color: var(--color-text-muted);">more_vert</span>
        </div>

        <!-- Messages Area -->
        <div id="chat-messages-container" style="flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
            ${messages.map(msg => `
                <div style="display: flex; flex-direction: column; align-items: ${msg.sender === 'me' ? 'flex-end' : 'flex-start'};">
                    <div style="max-width: 80%; padding: 12px 16px; border-radius: ${msg.sender === 'me' ? '18px 18px 0 18px' : '18px 18px 18px 0'}; background: ${msg.sender === 'me' ? 'var(--bg-gradient)' : 'var(--color-bg-app)'}; color: ${msg.sender === 'me' ? 'white' : 'var(--color-text-main)'}; box-shadow: var(--shadow-sm); font-size: 0.95rem;">
                        ${msg.text}
                    </div>
                    <span style="font-size: 0.7rem; color: var(--color-text-muted); margin-top: 4px; padding: 0 4px;">${msg.time}</span>
                </div>
            `).join('')}
            <div id="typing-indicator" style="display: none; align-items: center; gap: 4px; padding: 8px 12px; background: var(--color-bg-app); border-radius: 18px; width: fit-content;">
                <div class="dot"></div><div class="dot"></div><div class="dot"></div>
            </div>
        </div>

        <!-- Input Area -->
        <div style="padding: 16px; border-top: 1px solid var(--color-border); background: white; padding-bottom: calc(16px + env(safe-area-inset-bottom));">
            <div style="display: flex; align-items: center; gap: 12px; background: var(--color-bg-app); padding: 8px 8px 8px 16px; border-radius: var(--radius-pill);">
                <input type="text" id="chat-input" placeholder="Type a message..." style="flex: 1; border: none; background: transparent; outline: none; font-size: 0.95rem; color: var(--color-text-main);">
                <button id="send-msg-btn" style="width: 40px; height: 40px; border-radius: 50%; background: var(--bg-gradient); border: none; color: white; display: flex; align-items: center; justify-content: center;">
                    <span class="material-icons-round">send</span>
                </button>
            </div>
        </div>

        <style>
            .dot { width: 6px; height: 6px; background: #94a3b8; border-radius: 50%; animation: pulse 1s infinite alternate; }
            .dot:nth-child(2) { animation-delay: 0.2s; }
            .dot:nth-child(3) { animation-delay: 0.4s; }
            @keyframes pulse { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.2); opacity: 1; } }
            #chat-messages-container::-webkit-scrollbar { width: 4px; }
            #chat-messages-container::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        </style>
      </div>
    `;
};

// Handle Chat Logic via global event listener
document.addEventListener('viewloaded', (e) => {
    if (e.detail.path === 'message') {
        const container = document.getElementById('chat-messages-container');
        const input = document.getElementById('chat-input');
        const btn = document.getElementById('send-msg-btn');
        const typing = document.getElementById('typing-indicator');
        
        // Auto scroll to bottom
        container.scrollTop = container.scrollHeight;

        const urlParams = window.location.hash.split('/').slice(1);
        const chatId = urlParams[0] || 'city-hope';

        const sendMessage = () => {
             const text = input.value.trim();
             if (!text) return;

             const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
             
             // 1. Add my message to UI
             const myMsg = document.createElement('div');
             myMsg.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end;';
             myMsg.innerHTML = `
                <div style="max-width: 80%; padding: 12px 16px; border-radius: 18px 18px 0 18px; background: var(--bg-gradient); color: white; box-shadow: var(--shadow-sm); font-size: 0.95rem;">
                    ${text}
                </div>
                <span style="font-size: 0.7rem; color: var(--color-text-muted); margin-top: 4px; padding: 0 4px;">${time}</span>
             `;
             container.appendChild(myMsg);
             input.value = '';
             container.scrollTop = container.scrollHeight;

             // 2. Save to localStorage
             const chats = JSON.parse(localStorage.getItem('sharecare_chats')) || {};
             chats[chatId].push({ id: Date.now(), text, sender: 'me', time });
             localStorage.setItem('sharecare_chats', JSON.stringify(chats));

             // 3. Simulate NGO Reply
             setTimeout(() => {
                 typing.style.display = 'flex';
                 container.scrollTop = container.scrollHeight;

                 setTimeout(() => {
                     typing.style.display = 'none';
                     const replyText = "Understood! Our volunteer will contact you shortly to coordinate.";
                     const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                     const replyMsg = document.createElement('div');
                     replyMsg.style.cssText = 'display: flex; flex-direction: column; align-items: flex-start;';
                     replyMsg.innerHTML = `
                        <div style="max-width: 80%; padding: 12px 16px; border-radius: 18px 18px 18px 0; background: var(--color-bg-app); color: var(--color-text-main); box-shadow: var(--shadow-sm); font-size: 0.95rem;">
                            ${replyText}
                        </div>
                        <span style="font-size: 0.7rem; color: var(--color-text-muted); margin-top: 4px; padding: 0 4px;">${replyTime}</span>
                     `;
                     container.appendChild(replyMsg);
                     container.scrollTop = container.scrollHeight;

                     // Save reply
                     chats[chatId].push({ id: Date.now()+1, text: replyText, sender: 'them', time: replyTime });
                     localStorage.setItem('sharecare_chats', JSON.stringify(chats));
                 }, 2000);
             }, 800);
        };

        btn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});
