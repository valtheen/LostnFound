// API Configuration - Use same host as current page
const getApiBaseUrl = () => {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    return `http://${hostname}:8080/api`;
};

const API_CONFIG = {
    BASE_URL: getApiBaseUrl(),
    ENDPOINTS: {
        // Authentication
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        
        // Items
        ITEMS: '/barang',
        ITEM_STATS: '/barang/stats',
        RECENT_ITEMS: '/barang/recent',
        
        // Reports
        REPORTS: '/pelaporan',
        
        // Users
        USER_PROFILE: '/users/profile',
        UPDATE_PROFILE: '/users/profile'
    },
    
    // Request timeout in milliseconds
    TIMEOUT: 10000,
    
    // Default headers
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json'
    }
};

// Utility functions for API calls
class ApiService {
    static async request(endpoint, options = {}) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const token = localStorage.getItem('token');
        
        const defaultOptions = {
            headers: {
                ...API_CONFIG.DEFAULT_HEADERS,
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            timeout: API_CONFIG.TIMEOUT
        };
        
        const mergedOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };
        
        try {
            const response = await fetch(url, mergedOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    static async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    static async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    static async postFormData(endpoint, formData) {
        const token = localStorage.getItem('token');
        return fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: formData
        });
    }
    
    static async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    static async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, ApiService };
}
