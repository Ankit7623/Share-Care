// router.js

const routes = {};

export function registerRoute(path, componentFunction) {
  routes[path] = componentFunction;
}

export function navigate(path) {
  window.location.hash = path;
}

export function initRouter(appElementId) {
  const appElement = document.getElementById(appElementId);
  
  const handleRouting = async () => {
    // Get the hash, default to 'splash' if none or just #
    const fullPath = window.location.hash.slice(1) || 'splash';
    const parts = fullPath.split('/');
    const path = parts[0];
    const params = parts.slice(1);
    
    // Auth guard and splash mechanics
    const isAuthenticated = localStorage.getItem('sharecare_token');
    
    // Redirect logic
    if (!isAuthenticated && !['splash', 'auth'].includes(path)) {
       window.location.hash = 'auth';
       return;
    }
    
    if (isAuthenticated && ['splash', 'auth'].includes(path)) {
       window.location.hash = 'home';
       return;
    }

    const componentFunction = routes[path] || routes['404'] || (() => `<h2>404 - Not Found</h2>`);
    
    // Animate out
    appElement.style.opacity = 0;
    
    setTimeout(async () => {
      // Render view - pass params if needed
      appElement.innerHTML = await componentFunction(params);
      
      // Update Bottom Nav state
      const bottomNav = document.getElementById('bottom-nav');
      const monoAiFab = document.getElementById('mono-ai-fab');
      
      if (['splash', 'auth', 'ai-assistant'].includes(path)) {
        bottomNav.classList.add('hidden');
        monoAiFab.classList.add('hidden');
      } else {
        bottomNav.classList.remove('hidden');
        monoAiFab.classList.remove('hidden');
        
        // Update active nav link
        document.querySelectorAll('#bottom-nav .nav-item').forEach(el => {
           el.classList.remove('active');
           if(el.getAttribute('data-target') === path) {
               el.classList.add('active');
           }
        });
      }
      
      // Dispatch viewloaded event so views can bind event listeners
      document.dispatchEvent(new CustomEvent('viewloaded', { detail: { path } }));
      
      // Animate in
      appElement.style.opacity = 1;
    }, 200); // match transition timing
  };

  window.addEventListener('hashchange', handleRouting);
  
  // Initial load
  appElement.style.transition = 'opacity 0.2s ease-in-out';
  handleRouting();
}
