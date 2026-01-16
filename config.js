// API Configuration
const API_CONFIG = {
    // Use Node.js backend by default, change to Spring Boot if needed
    BASE_URL: 'http://localhost:3000/api',
    // For Spring Boot: BASE_URL: 'http://localhost:8080/api',
    
    // Endpoints
    ENDPOINTS: {
        AUTH: {
            REGISTER: '/auth/register',
            LOGIN: '/auth/login',
            SHOPKEEPER_REGISTER: '/auth/shopkeeper/register',
            SHOPKEEPER_LOGIN: '/auth/shopkeeper/login'
        },
        PRODUCTS: {
            LIST: '/products',
            GET: '/products',
            CREATE: '/products',
            UPDATE: '/products',
            DELETE: '/products'
        },
        ORDERS: {
            CREATE: '/orders',
            USER_ORDERS: '/orders/user',
            SHOPKEEPER_ORDERS: '/orders/shopkeeper'
        },
        SHOPKEEPER: {
            PROFILE: '/shopkeeper/profile',
            BANK_ACCOUNT: '/shopkeeper/bank-account',
            PRODUCTS: '/shopkeeper/products',
            EARNINGS: '/shopkeeper/earnings'
        }
    }
};

// Helper function to get auth token
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Helper function to set auth token
function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

// Helper function to remove auth token
function removeAuthToken() {
    localStorage.removeItem('authToken');
}

// API request helper
async function apiRequest(endpoint, options = {}) {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            ...options,
            headers
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Request failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
