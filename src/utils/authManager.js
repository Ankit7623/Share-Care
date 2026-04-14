// src/utils/authManager.js
// API-based authentication manager for ShareCare

const TOKEN_KEY = 'sharecare_token';
const USER_KEY = 'sharecare_user';
const API_URL = 'http://localhost:5000/api/auth';

/**
 * Validate email format
 */
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password) {
    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters long' };
    }
    return { valid: true, message: '' };
}

/**
 * Register a new user
 * @returns {Promise<{ success: boolean, message: string, user?: object }>}
 */
export async function registerUser({ name, email, password, location }) {
    // Validations
    if (!name || name.trim().length < 2) {
        return { success: false, message: 'Please enter a valid name (at least 2 characters)' };
    }

    if (!isValidEmail(email)) {
        return { success: false, message: 'Please enter a valid email address' };
    }

    const passCheck = validatePassword(password);
    if (!passCheck.valid) {
        return { success: false, message: passCheck.message };
    }

    if (!location || location.trim().length < 2) {
        return { success: false, message: 'Please enter your location' };
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, location })
        });
        
        const data = await response.json();
        
        if (data.success && data.token) {
            localStorage.setItem(TOKEN_KEY, data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        }
        
        return data;
    } catch (error) {
        console.error('Registration Error:', error);
        // Fallback for demo if server is offline
        console.warn('Backend unavailable. Falling back to local offline auth mock.');
        return localAuthMock('register', { name, email, password, location });
    }
}

/**
 * Login a user
 * @returns {Promise<{ success: boolean, message: string, user?: object }>}
 */
export async function loginUser(email, password) {
    if (!email || !password) {
        return { success: false, message: 'Please enter both email and password' };
    }

    if (!isValidEmail(email)) {
        return { success: false, message: 'Please enter a valid email address' };
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success && data.token) {
            localStorage.setItem(TOKEN_KEY, data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        }
        
        return data;
    } catch (error) {
        console.error('Login Error:', error);
        // Fallback for demo if server is offline
        console.warn('Backend unavailable. Falling back to local offline auth mock.');
        return localAuthMock('login', { email, password });
    }
}

/**
 * Logout current user
 */
export function logoutUser() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

/**
 * Get current logged-in user
 */
export function getCurrentUser() {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;
        return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
        return null;
    }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
}

// ---------------------------------------------------------------------------
// FALLBACK OFFLINE MOCK SYSTEM (Ensures app works even if MongoDB isn't running)
// ---------------------------------------------------------------------------
function localAuthMock(action, payload) {
    const USERS_KEY = 'sharecare_users';
    let users = [];
    try { users = JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch(e){}

    if (action === 'register') {
        if (users.find(u => u.email.toLowerCase() === payload.email.toLowerCase())) {
            return { success: false, message: 'An account with this email already exists.' };
        }
        const newUser = {
            id: 'mock_' + Date.now(),
            name: payload.name.trim(),
            email: payload.email.trim().toLowerCase(),
            password: 'mock_hash_' + payload.password, // simple mock
            location: payload.location.trim(),
            avatar: payload.name.trim().charAt(0).toUpperCase(),
            createdAt: new Date().toISOString(),
            donations: 0,
            requests: 0
        };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        
        const sessionUser = { ...newUser };
        delete sessionUser.password;
        localStorage.setItem(TOKEN_KEY, 'mock_token_' + Date.now());
        localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
        
        return { success: true, message: 'Account created offline mode!', user: sessionUser };
    }
    
    if (action === 'login') {
        const user = users.find(u => u.email.toLowerCase() === payload.email.toLowerCase() && u.password === 'mock_hash_' + payload.password);
        if (!user) return { success: false, message: 'Invalid credentials or account not found in offline mode.' };
        
        const sessionUser = { ...user };
        delete sessionUser.password;
        localStorage.setItem(TOKEN_KEY, 'mock_token_' + Date.now());
        localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
        
        return { success: true, message: 'Welcome back (offline mode)!', user: sessionUser };
    }
}
