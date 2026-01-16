// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        description: "Premium wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        description: "Feature-rich smartwatch with health tracking, GPS, and water resistance."
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        category: "clothing",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        description: "Comfortable 100% cotton t-shirt available in multiple colors."
    },
    {
        id: 4,
        name: "Denim Jacket",
        category: "clothing",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        description: "Classic denim jacket with modern fit and premium quality."
    },
    {
        id: 5,
        name: "The Great Gatsby",
        category: "books",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        description: "Classic American novel by F. Scott Fitzgerald."
    },
    {
        id: 6,
        name: "JavaScript Guide",
        category: "books",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
        description: "Comprehensive guide to modern JavaScript programming."
    },
    {
        id: 7,
        name: "Coffee Maker",
        category: "home",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1517668808823-bac7dd90e5d0?w=500",
        description: "Programmable coffee maker with thermal carafe."
    },
    {
        id: 8,
        name: "Throw Pillow Set",
        category: "home",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1584100936595-3c8b8c2a5c3e?w=500",
        description: "Set of 4 decorative throw pillows for your living room."
    },
    {
        id: 9,
        name: "Laptop Stand",
        category: "electronics",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        description: "Ergonomic aluminum laptop stand for better posture."
    },
    {
        id: 10,
        name: "Running Shoes",
        category: "clothing",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        description: "Lightweight running shoes with superior cushioning."
    },
    {
        id: 11,
        name: "Desk Lamp",
        category: "home",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        description: "Modern LED desk lamp with adjustable brightness."
    },
    {
        id: 12,
        name: "Mystery Novel",
        category: "books",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
        description: "Bestselling mystery thriller with unexpected twists."
    }
];

// State Management
let cart = [];
try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        // Validate cart items
        cart = cart.filter(item => item && item.id && item.name && item.price !== undefined);
    }
} catch (error) {
    console.error('Error loading cart from localStorage:', error);
    cart = [];
}
let currentFilter = 'all';
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentShopkeeper = JSON.parse(localStorage.getItem('currentShopkeeper')) || null;
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let addresses = JSON.parse(localStorage.getItem('addresses')) || [];
let shopkeeperProducts = JSON.parse(localStorage.getItem('shopkeeperProducts')) || [];
let useBackend = false; // Set to true to use backend APIs

// OTP state
let currentOTP = null;
let otpTimerInterval = null;
let otpTimerSeconds = 60;
let pendingRegistration = null; // Stores registration data until OTP is verified

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const featuredProductsGrid = document.getElementById('featuredProductsGrid');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const filterBtns = document.querySelectorAll('.filter-btn');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const checkoutPage = document.getElementById('checkoutPage');
const checkoutBtn = document.getElementById('checkoutBtn');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutItems = document.getElementById('checkoutItems');
const checkoutTotal = document.getElementById('checkoutTotal');
const successMessage = document.getElementById('successMessage');
const continueShopping = document.getElementById('continueShopping');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const userBtn = document.getElementById('userBtn');
const authModal = document.getElementById('authModal');
const closeAuth = document.getElementById('closeAuth');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const userPanel = document.getElementById('userPanel');
const userPanelOverlay = document.getElementById('userPanelOverlay');
const closeUserPanel = document.getElementById('closeUserPanel');
const userMenuItems = document.querySelectorAll('.user-menu-item');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const profileForm = document.getElementById('profileForm');
const addAddressBtn = document.getElementById('addAddressBtn');
const shopkeeperBtn = document.getElementById('shopkeeperBtn');
const shopkeeperPanel = document.getElementById('shopkeeperPanel');
const shopkeeperPanelOverlay = document.getElementById('shopkeeperPanelOverlay');
const closeShopkeeperPanel = document.getElementById('closeShopkeeperPanel');
const shopkeeperMenuItems = document.querySelectorAll('.shopkeeper-menu-item');
const productForm = document.getElementById('productForm');
const shopkeeperProductsGrid = document.getElementById('shopkeeperProductsGrid');
const productImageInput = document.getElementById('productImage');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const shopkeeperAuthModal = document.getElementById('shopkeeperAuthModal');
const closeShopkeeperAuth = document.getElementById('closeShopkeeperAuth');
const shopkeeperLoginForm = document.getElementById('shopkeeperLoginForm');
const shopkeeperRegisterForm = document.getElementById('shopkeeperRegisterForm');
const shopkeeperAuthTabs = document.querySelectorAll('#shopkeeperAuthModal .auth-tab');
const bankAccountForm = document.getElementById('bankAccountForm');
const otpModal = document.getElementById('otpModal');
const otpOverlay = document.getElementById('otpOverlay');
const closeOtpBtn = document.getElementById('closeOtpBtn');
const otpForm = document.getElementById('otpForm');
const otpPhoneNumber = document.getElementById('otpPhoneNumber');
const otpTimer = document.getElementById('otpTimer');
const resendOtpBtn = document.getElementById('resendOtpBtn');
const otpDisplay = document.getElementById('otpDisplay');
const displayOTP = document.getElementById('displayOTP');
// OTP inputs will be initialized when needed
let otpInputs = [];
const openCameraBtn = document.getElementById('openCameraBtn');
const uploadImageBtn = document.getElementById('uploadImageBtn');
const imageFileInput = document.getElementById('imageFileInput');
const removeImageBtn = document.getElementById('removeImageBtn');
const cameraModal = document.getElementById('cameraModal');
const cameraOverlay = document.getElementById('cameraOverlay');
const closeCameraBtn = document.getElementById('closeCameraBtn');
const startCameraBtn = document.getElementById('startCameraBtn');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const usePhotoBtn = document.getElementById('usePhotoBtn');
const stopCameraBtn = document.getElementById('stopCameraBtn');
const cameraVideo = document.getElementById('cameraVideo');
const cameraCanvas = document.getElementById('cameraCanvas');
const cameraPreview = document.getElementById('cameraPreview');
const capturedImage = document.getElementById('capturedImage');
const cameraPlaceholder = document.getElementById('cameraPlaceholder');

let cameraStream = null;
let capturedImageData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize in safe order - setup listeners first
        setupEventListeners();
        updateCartUI();
        updateUserUI();
        
        // Render products (these might fail if elements don't exist, but that's okay)
        try {
            renderProducts('');
        } catch (e) {
            console.warn('Could not render products:', e);
        }
        
        try {
            renderFeaturedProducts();
        } catch (e) {
            console.warn('Could not render featured products:', e);
        }
        
        // Load data
        try {
            loadUserData();
        } catch (e) {
            console.warn('Could not load user data:', e);
        }
        
        try {
            loadShopkeeperProducts();
        } catch (e) {
            console.warn('Could not load shopkeeper products:', e);
        }
        
        try {
            mergeShopkeeperProducts();
        } catch (e) {
            console.warn('Could not merge shopkeeper products:', e);
        }
    } catch (error) {
        console.error('Critical initialization error:', error);
        console.error('Error details:', error.stack);
        // Don't show notification during initialization as it might cause issues
    }
});

// Event Listeners
function setupEventListeners() {
    // Cart
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);
    
    // Filters
    if (filterBtns && filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.category;
                // Clear search when filtering
                if (searchInput) searchInput.value = '';
                if (searchClear) searchClear.style.display = 'none';
                renderProducts('');
            });
        });
    }
    
    // Modal
    if (closeModal && productModal) {
        closeModal.addEventListener('click', () => {
            productModal.classList.remove('show');
        });
        
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.classList.remove('show');
            }
        });
    }
    
    // Checkout
    if (closeCheckout && checkoutPage) {
        closeCheckout.addEventListener('click', () => {
            checkoutPage.classList.remove('show');
        });
    }
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    
    if (continueShopping && successMessage) {
        continueShopping.addEventListener('click', () => {
            successMessage.classList.remove('show');
            cart = [];
            updateCartUI();
            renderProducts();
        });
    }
    
    // Mobile Menu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // User Account
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            if (currentUser) {
                openUserPanel();
            } else {
                openAuthModal();
            }
        });
    }
    
    if (closeAuth && authModal) {
        closeAuth.addEventListener('click', () => {
            authModal.classList.remove('show');
        });
        
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.remove('show');
            }
        });
    }
    
    if (authTabs && authTabs.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                authTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                document.querySelectorAll('.auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                
                if (tabName === 'login' && loginForm) {
                    loginForm.classList.add('active');
                } else if (registerForm) {
                    registerForm.classList.add('active');
                }
            });
        });
    }
    
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
    
    // User Panel
    if (closeUserPanel && userPanelOverlay) {
        closeUserPanel.addEventListener('click', closeUserPanelFunc);
        userPanelOverlay.addEventListener('click', closeUserPanelFunc);
    }
    
    if (userMenuItems && userMenuItems.length > 0) {
        userMenuItems.forEach(item => {
            if (item && item.id !== 'logoutBtn') {
                item.addEventListener('click', () => {
                    const section = item.dataset.section;
                    if (section) {
                        switchUserSection(section);
                        userMenuItems.forEach(i => {
                            if (i) i.classList.remove('active');
                        });
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => addNewAddress());
    }
    
    // Contact & Newsletter
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }
    
    if (searchClear) {
        searchClear.addEventListener('click', clearSearch);
    }
    
    // Shopkeeper Panel
    if (shopkeeperBtn) {
        shopkeeperBtn.addEventListener('click', () => {
            if (currentShopkeeper) {
                openShopkeeperPanel();
            } else {
                openShopkeeperAuthModal();
            }
        });
    }
    
    if (closeShopkeeperPanel) closeShopkeeperPanel.addEventListener('click', closeShopkeeperPanelFunc);
    if (shopkeeperPanelOverlay) shopkeeperPanelOverlay.addEventListener('click', closeShopkeeperPanelFunc);
    
    // Shopkeeper Auth
    if (closeShopkeeperAuth && shopkeeperAuthModal) {
        closeShopkeeperAuth.addEventListener('click', () => {
            shopkeeperAuthModal.classList.remove('show');
        });
        
        shopkeeperAuthModal.addEventListener('click', (e) => {
            if (e.target === shopkeeperAuthModal) {
                shopkeeperAuthModal.classList.remove('show');
            }
        });
    }
    
    if (shopkeeperAuthTabs && shopkeeperAuthTabs.length > 0) {
        shopkeeperAuthTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                shopkeeperAuthTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                document.querySelectorAll('#shopkeeperAuthModal .auth-form').forEach(form => {
                    form.classList.remove('active');
                });
                
                if (tabName === 'shopkeeper-login' && shopkeeperLoginForm) {
                    shopkeeperLoginForm.classList.add('active');
                } else if (shopkeeperRegisterForm) {
                    shopkeeperRegisterForm.classList.add('active');
                }
            });
        });
    }
    
    if (shopkeeperLoginForm) shopkeeperLoginForm.addEventListener('submit', handleShopkeeperLogin);
    if (shopkeeperRegisterForm) shopkeeperRegisterForm.addEventListener('submit', handleShopkeeperRegister);
    if (bankAccountForm) bankAccountForm.addEventListener('submit', handleBankAccountSubmit);
    
    // OTP Modal
    if (closeOtpBtn) closeOtpBtn.addEventListener('click', closeOTPModal);
    if (otpOverlay) otpOverlay.addEventListener('click', closeOTPModal);
    if (otpForm) otpForm.addEventListener('submit', handleOTPVerification);
    if (resendOtpBtn) resendOtpBtn.addEventListener('click', handleResendOTP);
    
    // OTP input auto-focus will be set up when modal opens
    
    if (shopkeeperMenuItems && shopkeeperMenuItems.length > 0) {
        shopkeeperMenuItems.forEach(item => {
            if (item) {
                item.addEventListener('click', () => {
                    const section = item.dataset.section;
                    if (section) {
                        switchShopkeeperSection(section);
                        shopkeeperMenuItems.forEach(i => {
                            if (i) i.classList.remove('active');
                        });
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
    
    if (productImageInput) {
        productImageInput.addEventListener('input', handleImagePreview);
    }
    
    // Camera functionality
    if (openCameraBtn) openCameraBtn.addEventListener('click', openCameraModal);
    if (closeCameraBtn) closeCameraBtn.addEventListener('click', closeCameraModal);
    if (cameraOverlay) cameraOverlay.addEventListener('click', closeCameraModal);
    if (startCameraBtn) startCameraBtn.addEventListener('click', startCamera);
    if (captureBtn) captureBtn.addEventListener('click', capturePhoto);
    if (retakeBtn) retakeBtn.addEventListener('click', retakePhoto);
    if (usePhotoBtn) usePhotoBtn.addEventListener('click', useCapturedPhoto);
    if (stopCameraBtn) stopCameraBtn.addEventListener('click', stopCamera);
    
    // File upload
    if (uploadImageBtn && imageFileInput) {
        uploadImageBtn.addEventListener('click', () => imageFileInput.click());
    }
    if (imageFileInput) {
        imageFileInput.addEventListener('change', handleFileUpload);
    }
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', removeImage);
    }
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });
}

// Render Featured Products (for homepage)
function renderFeaturedProducts() {
    if (!featuredProductsGrid) {
        return; // Featured products section might not exist on all pages
    }
    
    try {
        // Combine main products with shopkeeper products
        const allProducts = [...products, ...shopkeeperProducts];
        // Show first 8 products as featured
        const featuredProducts = allProducts.slice(0, 8);
        
        if (featuredProducts.length === 0) {
            featuredProductsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem;">No products available yet.</p>';
            return;
        }
        
        featuredProductsGrid.innerHTML = featuredProducts.map(product => `
            <div class="product-card" onclick="openProductModal(${product.id})">
                <img src="${product.image || 'https://via.placeholder.com/500'}" alt="${product.name || 'Product'}" class="product-image" onerror="this.src='https://via.placeholder.com/500'">
                <div class="product-info">
                    <div class="product-category">${product.category || 'uncategorized'}</div>
                    <div class="product-name">${product.name || 'Unnamed Product'}</div>
                    <div class="product-description">${product.description || 'No description available'}</div>
                    <div class="product-footer">
                        <div class="product-price">$${(product.price || 0).toFixed(2)}</div>
                        <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering featured products:', error);
        if (featuredProductsGrid) {
            featuredProductsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem; color: red;">Error loading featured products.</p>';
        }
    }
}

// Render Products
function renderProducts(searchQuery = '') {
    if (!productsGrid) {
        console.warn('Products grid not found - this is normal if not on products page');
        return;
    }
    
    try {
        // Combine main products with shopkeeper products
        let allProducts = [...products, ...shopkeeperProducts];
        
        // Apply search filter if provided
        if (searchQuery && searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            allProducts = allProducts.filter(p => {
                if (!p) return false;
                const name = (p.name || '').toLowerCase();
                const description = (p.description || '').toLowerCase();
                const category = (p.category || '').toLowerCase();
                return name.includes(query) || description.includes(query) || category.includes(query);
            });
        } else {
            // Apply category filter if no search
            allProducts = currentFilter === 'all' 
                ? allProducts 
                : allProducts.filter(p => p && p.category === currentFilter);
        }
        
        if (allProducts.length === 0) {
            productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem;">No products found. Try a different search or category.</p>';
            return;
        }
        
        productsGrid.innerHTML = allProducts.map(product => {
            if (!product || !product.id) return '';
            return `
            <div class="product-card" onclick="openProductModal(${product.id})">
                <img src="${product.image || 'https://via.placeholder.com/500'}" alt="${product.name || 'Product'}" class="product-image" onerror="this.src='https://via.placeholder.com/500'">
                <div class="product-info">
                    <div class="product-category">${product.category || 'uncategorized'}</div>
                    <div class="product-name">${product.name || 'Unnamed Product'}</div>
                    <div class="product-description">${product.description || 'No description available'}</div>
                    <div class="product-footer">
                        <div class="product-price">$${(product.price || 0).toFixed(2)}</div>
                        <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        }).filter(html => html !== '').join('');
    } catch (error) {
        console.error('Error rendering products:', error);
        if (productsGrid) {
            productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem; color: red;">Error loading products. Please refresh the page.</p>';
        }
    }
}

// Search helpers
function getAllSearchableProducts() {
    try {
        return [...products, ...shopkeeperProducts].filter(p => p && p.name);
    } catch (error) {
        console.error('Error getting searchable products:', error);
        return [];
    }
}

function handleSearch() {
    try {
        if (!searchInput) return;
        const query = searchInput.value || '';
        
        // Update clear button visibility
        if (searchClear) {
            searchClear.style.display = query.trim() ? 'block' : 'none';
        }
        
        // Render filtered products
        renderProducts(query);
        
        // Update suggestions list
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (!suggestionsContainer) return;
        
        const trimmedQuery = query.trim().toLowerCase();
        if (!trimmedQuery) {
            suggestionsContainer.classList.remove('visible');
            suggestionsContainer.innerHTML = '';
            return;
        }
        
        const allProducts = getAllSearchableProducts();
        const matches = allProducts.filter(p => {
            const name = (p.name || '').toLowerCase();
            const category = (p.category || '').toLowerCase();
            return name.includes(trimmedQuery) || category.includes(trimmedQuery);
        }).slice(0, 6);
        
        if (matches.length === 0) {
            suggestionsContainer.classList.remove('visible');
            suggestionsContainer.innerHTML = '';
            return;
        }
        
        suggestionsContainer.innerHTML = matches.map(p => `
            <div class="search-suggestion-item" data-id="${p.id}">
                <span>${p.name}</span>
                <small>${p.category || 'Product'}</small>
            </div>
        `).join('');
        
        suggestionsContainer.classList.add('visible');
        
        // Attach click handlers
        Array.from(suggestionsContainer.querySelectorAll('.search-suggestion-item')).forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.getAttribute('data-id'), 10);
                if (!isNaN(id)) {
                    // Scroll to products section and open modal for selected product
                    const productsSection = document.getElementById('products');
                    if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    openProductModal(id);
                }
                
                // Close suggestions
                suggestionsContainer.classList.remove('visible');
                suggestionsContainer.innerHTML = '';
            });
        });
    } catch (error) {
        console.error('Error handling search:', error);
    }
}

function clearSearch() {
    try {
        if (searchInput) {
            searchInput.value = '';
            searchInput.blur();
        }
        if (searchClear) {
            searchClear.style.display = 'none';
        }
        
        // Hide suggestions
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.classList.remove('visible');
            suggestionsContainer.innerHTML = '';
        }
        
        // Reset filter and show all products
        currentFilter = 'all';
        renderProducts('');
        
        // Scroll back to products section
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error clearing search:', error);
    }
}

// Open Product Modal
function openProductModal(productId) {
    try {
        if (!productModal || !modalBody) {
            console.error('Product modal elements not found');
            return;
        }
        
        // Check in main products first
        let product = products.find(p => p.id === productId);
        
        // If not found, check shopkeeper products
        if (!product) {
            product = shopkeeperProducts.find(p => p.id === productId);
        }
        
        if (!product) {
            showNotification('Product not found!', 'error');
            return;
        }
        
        modalBody.innerHTML = `
            <img src="${product.image || 'https://via.placeholder.com/500'}" alt="${product.name || 'Product'}" class="modal-image" onerror="this.src='https://via.placeholder.com/500'">
            <div class="modal-info">
                <div class="product-category">${product.category || 'uncategorized'}</div>
                <h2>${product.name || 'Unnamed Product'}</h2>
                <div class="product-price">$${(product.price || 0).toFixed(2)}</div>
                <p class="modal-description">${product.description || 'No description available'}</p>
                <button class="btn btn-primary add-to-cart" onclick="addToCart(${product.id}); productModal.classList.remove('show');">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productModal.classList.add('show');
    } catch (error) {
        console.error('Error opening product modal:', error);
        showNotification('Error loading product details!', 'error');
    }
}

// Cart Functions
function addToCart(productId) {
    try {
        if (!productId) {
            showNotification('Invalid product ID!', 'error');
            return;
        }
        
        // Check in main products first
        let product = products.find(p => p && p.id === productId);
        
        // If not found, check shopkeeper products
        if (!product) {
            product = shopkeeperProducts.find(p => p && p.id === productId);
        }
        
        if (!product) {
            console.error('Product not found with ID:', productId);
            console.log('Available products:', [...products, ...shopkeeperProducts].map(p => ({ id: p?.id, name: p?.name })));
            showNotification('Product not found!', 'error');
            return;
        }
        
        // Ensure product has required fields
        if (!product.id || !product.name || product.price === undefined) {
            console.error('Invalid product data:', product);
            showNotification('Product data is invalid!', 'error');
            return;
        }
        
        const existingItem = cart.find(item => item && item.id === productId);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 0) + 1;
        } else {
            cart.push({ 
                id: product.id,
                name: product.name,
                price: product.price || 0,
                image: product.image,
                category: product.category,
                description: product.description,
                shopkeeperId: product.shopkeeperId,
                quantity: 1 
            });
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartUI();
        showNotification('Product added to cart!', 'success');
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Error adding product to cart!', 'error');
    }
}

function removeFromCart(productId) {
    try {
        cart = cart.filter(item => item && item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        showNotification('Item removed from cart', 'success');
    } catch (error) {
        console.error('Error removing from cart:', error);
        showNotification('Error removing item from cart!', 'error');
    }
}

function updateQuantity(productId, change) {
    try {
        const item = cart.find(item => item && item.id === productId);
        if (!item) {
            console.error('Item not found in cart:', productId);
            return;
        }
        
        item.quantity = (item.quantity || 0) + change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        showNotification('Error updating quantity!', 'error');
    }
}

function updateCartUI() {
    try {
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    
        // Update cart items
        if (cartItems) {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image || 'https://via.placeholder.com/100'}" alt="${item.name || 'Item'}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/100'">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name || 'Unnamed Item'}</div>
                            <div class="cart-item-price">$${(item.price || 0).toFixed(2)}</div>
                            <div class="cart-item-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="quantity">${item.quantity || 0}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                                <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        // Update total
        if (cartTotal) {
            const total = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
            cartTotal.textContent = total.toFixed(2);
        }
    } catch (error) {
        console.error('Error updating cart UI:', error);
    }
}

function openCart() {
    if (!cartSidebar || !cartOverlay) {
        console.error('Cart elements not found');
        showNotification('Shopping cart not available', 'error');
        return;
    }
    
    try {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error opening cart:', error);
        showNotification('Error opening shopping cart', 'error');
    }
}

function closeCartSidebar() {
    if (!cartSidebar || !cartOverlay) return;
    
    try {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('show');
        document.body.style.overflow = '';
    } catch (error) {
        console.error('Error closing cart:', error);
    }
}

// Checkout
function openCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    closeCartSidebar();
    
    // Render checkout items
    checkoutItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = total.toFixed(2);
    
    checkoutPage.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function handleCheckout(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        cardNumber: document.getElementById('cardNumber').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value
    };
    
    // Calculate totals with commission
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const commission = total * 0.15;
    
    // Create order with commission calculation
    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cart.map(item => {
            const itemTotal = item.price * item.quantity;
            const itemCommission = itemTotal * 0.15;
            const shopkeeperEarning = itemTotal - itemCommission;
            
            return {
                ...item,
                shopkeeperEarning: shopkeeperEarning,
                commission: itemCommission
            };
        }),
        total: total,
        commission: commission,
        status: 'pending',
        shipping: {
            name: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            zip: formData.zip
        }
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Simulate order processing
    setTimeout(() => {
        checkoutPage.classList.remove('show');
        successMessage.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Clear cart
        cart = [];
        updateCartUI();
        
        // Reset form
        checkoutForm.reset();
        
        // Update user dashboard if logged in
        if (currentUser) {
            loadUserData();
        }
        
        console.log('Order placed:', order);
    }, 1000);
}

// Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? '#ef4444' : 'var(--success-color)';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 6000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation (in real app, this would check against a database)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { name: user.name, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserUI();
        authModal.classList.remove('show');
        loginForm.reset();
        showNotification('Login successful!');
        openUserPanel();
    } else {
        showNotification('Invalid email or password!', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    try {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;
        
        if (!name || !email || !phone || !password || !confirm) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirm) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Validate phone number
        if (!phone.match(/^\+?[1-9]\d{1,14}$/)) {
            showNotification('Please enter a valid phone number (e.g., +1234567890)', 'error');
            return;
        }
        
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.find(u => u.email === email)) {
            showNotification('Email already registered!', 'error');
            return;
        }
        
        // Store registration data for after OTP verification
        pendingRegistration = {
            type: 'user',
            name,
            email,
            phone: normalizedPhone,
            password
        };
        
        // Send OTP
        sendOTP(normalizedPhone, () => {
            // After OTP is sent, show OTP modal
            openOTPModal(normalizedPhone, 'user');
        });
    } catch (error) {
        console.error('Error in registration:', error);
        showNotification('An error occurred during registration', 'error');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserUI();
    closeUserPanelFunc();
    showNotification('Logged out successfully!');
}

function openAuthModal() {
    if (!authModal) {
        console.error('Auth modal not found');
        showNotification('Login form not available', 'error');
        return;
    }
    
    try {
        authModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error opening auth modal:', error);
        showNotification('Error opening login form', 'error');
    }
}

// User Panel Functions
function openUserPanel() {
    if (!userPanel || !userPanelOverlay) {
        console.error('User panel elements not found');
        showNotification('User panel not available', 'error');
        return;
    }
    
    try {
        userPanel.classList.add('open');
        userPanelOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        loadUserData();
    } catch (error) {
        console.error('Error opening user panel:', error);
        showNotification('Error opening user panel', 'error');
    }
}

function closeUserPanelFunc() {
    if (!userPanel || !userPanelOverlay) return;
    
    try {
        userPanel.classList.remove('open');
        userPanelOverlay.classList.remove('show');
        document.body.style.overflow = '';
    } catch (error) {
        console.error('Error closing user panel:', error);
    }
}

function switchUserSection(section) {
    try {
        const sections = document.querySelectorAll('.user-section');
        sections.forEach(s => {
            if (s) s.classList.remove('active');
        });
        
        const targetSection = document.getElementById(section + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            console.error('User section not found:', section + 'Section');
        }
    } catch (error) {
        console.error('Error switching user section:', error);
    }
}

function updateUserUI() {
    try {
        if (userName && userEmail) {
            if (currentUser) {
                userName.textContent = currentUser.name || 'Guest User';
                userEmail.textContent = currentUser.email || 'Not logged in';
            } else {
                userName.textContent = 'Guest User';
                userEmail.textContent = 'Not logged in';
            }
        }
    } catch (error) {
        console.error('Error updating user UI:', error);
    }
}

function loadUserData() {
    if (!currentUser) return;
    
    // Load profile data
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    if (userData[currentUser.email]) {
        document.getElementById('profileName').value = userData[currentUser.email].name || currentUser.name;
        document.getElementById('profileEmail').value = userData[currentUser.email].email || currentUser.email;
        document.getElementById('profilePhone').value = userData[currentUser.email].phone || '';
        document.getElementById('profileBirthday').value = userData[currentUser.email].birthday || '';
    } else {
        document.getElementById('profileName').value = currentUser.name;
        document.getElementById('profileEmail').value = currentUser.email;
    }
    
    // Load addresses
    const userAddresses = addresses.filter(a => a.email === currentUser.email);
    renderAddresses(userAddresses);
    
    // Load orders
    const userOrders = orders.filter(o => o.shipping.email === currentUser.email);
    renderOrders(userOrders);
    renderDashboard(userOrders);
}

function renderDashboard(userOrders) {
    const totalOrders = userOrders.length;
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = userOrders.filter(o => o.status === 'pending').length;
    
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalSpent').textContent = totalSpent.toFixed(2);
    document.getElementById('pendingOrders').textContent = pendingOrders;
    
    // Recent orders
    const recentOrders = userOrders.slice(-5).reverse();
    const recentOrdersList = document.getElementById('recentOrdersList');
    
    if (recentOrders.length === 0) {
        recentOrdersList.innerHTML = '<p class="no-orders">No orders yet. Start shopping!</p>';
    } else {
        recentOrdersList.innerHTML = recentOrders.map(order => `
            <div class="order-item">
                <div class="order-info">
                    <h4>Order #${order.id}</h4>
                    <p>${new Date(order.date).toLocaleDateString()} - $${order.total.toFixed(2)}</p>
                </div>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
        `).join('');
    }
}

function renderOrders(userOrders) {
    const ordersList = document.getElementById('ordersList');
    
    if (userOrders.length === 0) {
        ordersList.innerHTML = '<p class="no-orders">You haven\'t placed any orders yet.</p>';
    } else {
        ordersList.innerHTML = userOrders.reverse().map(order => `
            <div class="order-item">
                <div class="order-info">
                    <h4>Order #${order.id}</h4>
                    <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                    <p><strong>Items:</strong> ${order.items.length} item(s)</p>
                    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                    <p><strong>Shipping to:</strong> ${order.shipping.address}, ${order.shipping.city}</p>
                </div>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
        `).join('');
    }
}

function handleProfileUpdate(e) {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    
    userData[currentUser.email] = {
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        birthday: document.getElementById('profileBirthday').value
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    currentUser.name = userData[currentUser.email].name;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserUI();
    showNotification('Profile updated successfully!');
}

function renderAddresses(userAddresses) {
    const addressesList = document.getElementById('addressesList');
    
    if (userAddresses.length === 0) {
        addressesList.innerHTML = '<p class="no-addresses">No saved addresses yet.</p>';
    } else {
        addressesList.innerHTML = userAddresses.map((address, index) => `
            <div class="address-item">
                <h4>${address.label || 'Address ' + (index + 1)}</h4>
                <p>${address.name}<br>${address.address}<br>${address.city}, ${address.zip}<br>${address.country}</p>
                <div class="address-actions">
                    <button onclick="editAddress(${index})">Edit</button>
                    <button onclick="deleteAddress(${index})">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

function addNewAddress() {
    const label = prompt('Enter address label (e.g., Home, Office):');
    if (!label) return;
    
    const name = prompt('Enter full name:');
    if (!name) return;
    
    const address = prompt('Enter street address:');
    if (!address) return;
    
    const city = prompt('Enter city:');
    if (!city) return;
    
    const zip = prompt('Enter ZIP code:');
    if (!zip) return;
    
    const country = prompt('Enter country:', 'United States');
    
    const newAddress = {
        email: currentUser.email,
        label,
        name,
        address,
        city,
        zip,
        country: country || 'United States'
    };
    
    addresses.push(newAddress);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    renderAddresses(addresses.filter(a => a.email === currentUser.email));
    showNotification('Address added successfully!');
}

window.editAddress = function(index) {
    const userAddresses = addresses.filter(a => a.email === currentUser.email);
    const address = userAddresses[index];
    
    const label = prompt('Enter address label:', address.label);
    if (!label) return;
    
    address.label = label;
    address.name = prompt('Enter full name:', address.name) || address.name;
    address.address = prompt('Enter street address:', address.address) || address.address;
    address.city = prompt('Enter city:', address.city) || address.city;
    address.zip = prompt('Enter ZIP code:', address.zip) || address.zip;
    address.country = prompt('Enter country:', address.country) || address.country;
    
    localStorage.setItem('addresses', JSON.stringify(addresses));
    renderAddresses(userAddresses);
    showNotification('Address updated successfully!');
};

window.deleteAddress = function(index) {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    const userAddresses = addresses.filter(a => a.email === currentUser.email);
    const address = userAddresses[index];
    addresses = addresses.filter(a => a !== address);
    
    localStorage.setItem('addresses', JSON.stringify(addresses));
    renderAddresses(addresses.filter(a => a.email === currentUser.email));
    showNotification('Address deleted successfully!');
};

function handleContactSubmit(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    // In a real app, this would send to a server
    console.log('Contact form submitted:', formData);
    contactForm.reset();
    showNotification('Thank you for your message! We\'ll get back to you soon.');
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // In a real app, this would send to a server
    console.log('Newsletter subscription:', email);
    e.target.reset();
    showNotification('Successfully subscribed to newsletter!');
}

// Shopkeeper Panel Functions
function openShopkeeperPanel() {
    if (!currentShopkeeper) {
        openShopkeeperAuthModal();
        return;
    }
    if (!shopkeeperPanel || !shopkeeperPanelOverlay) {
        console.error('Shopkeeper panel elements not found');
        showNotification('Shopkeeper panel not available', 'error');
        return;
    }
    try {
        shopkeeperPanel.classList.add('open');
        shopkeeperPanelOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        loadShopkeeperProducts();
        updateSalesReport();
        loadBankAccount();
        loadEarnings();
    } catch (error) {
        console.error('Error opening shopkeeper panel:', error);
        showNotification('Error opening shopkeeper panel', 'error');
    }
}

function closeShopkeeperPanelFunc() {
    if (!shopkeeperPanel || !shopkeeperPanelOverlay) return;
    try {
        shopkeeperPanel.classList.remove('open');
        shopkeeperPanelOverlay.classList.remove('show');
        document.body.style.overflow = '';
    } catch (error) {
        console.error('Error closing shopkeeper panel:', error);
    }
}

function openShopkeeperAuthModal() {
    if (!shopkeeperAuthModal) {
        showNotification('Shopkeeper authentication not available', 'error');
        return;
    }
    try {
        shopkeeperAuthModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error opening shopkeeper auth modal:', error);
        showNotification('Error opening login form', 'error');
    }
}

function switchShopkeeperSection(section) {
    try {
        document.querySelectorAll('.shopkeeper-section').forEach(s => s.classList.remove('active'));
        const targetSection = document.getElementById(section + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        if (section === 'add-product') {
            const addProductTitle = document.getElementById('addProductTitle');
            const editingProductId = document.getElementById('editingProductId');
            if (addProductTitle) addProductTitle.textContent = 'Add New Product';
            if (editingProductId) editingProductId.value = '';
            if (productForm) productForm.reset();
            if (imagePreview) imagePreview.style.display = 'none';
        }
    } catch (error) {
        console.error('Error switching shopkeeper section:', error);
    }
}

window.switchShopkeeperSection = switchShopkeeperSection;

function handleImagePreview() {
    const imageUrl = productImageInput.value;
    if (imageUrl) {
        // Check if it's a data URL (from camera/upload) or regular URL
        if (imageUrl.startsWith('data:image/') || isValidUrl(imageUrl)) {
            previewImg.src = imageUrl;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.style.display = 'none';
        }
    } else {
        imagePreview.style.display = 'none';
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function handleProductSubmit(e) {
    e.preventDefault();
    
    const productId = document.getElementById('editingProductId').value;
    const imageValue = document.getElementById('productImage').value;
    
    if (!imageValue) {
        showNotification('Please add a product image using camera, upload, or URL.', 'error');
        return;
    }
    
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        image: imageValue,
        description: document.getElementById('productDescription').value,
        stock: parseInt(document.getElementById('productStock').value) || 0
    };
    
    if (productId) {
        // Edit existing product
        const index = shopkeeperProducts.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            shopkeeperProducts[index] = { ...shopkeeperProducts[index], ...productData };
            showNotification('Product updated successfully!');
        }
    } else {
        // Add new product
        const newProduct = {
            id: Date.now(),
            ...productData,
            shopkeeper: 'shopkeeper@shophub.com' // In real app, use current shopkeeper email
        };
        shopkeeperProducts.push(newProduct);
        showNotification('Product added successfully!');
    }
    
    localStorage.setItem('shopkeeperProducts', JSON.stringify(shopkeeperProducts));
    loadShopkeeperProducts();
    mergeShopkeeperProducts();
    renderProducts();
    resetProductForm();
    switchShopkeeperSection('products');
}

function resetProductForm() {
    productForm.reset();
    document.getElementById('editingProductId').value = '';
    imagePreview.style.display = 'none';
    capturedImageData = null;
    document.getElementById('addProductTitle').textContent = 'Add New Product';
    shopkeeperMenuItems.forEach(i => i.classList.remove('active'));
    document.querySelector('.shopkeeper-menu-item[data-section="products"]').classList.add('active');
    switchShopkeeperSection('products');
}

window.resetProductForm = resetProductForm;

function loadShopkeeperProducts() {
    try {
        if (!shopkeeperProductsGrid) {
            console.error('Shopkeeper products grid not found');
            return;
        }
        
        // Filter products for current shopkeeper if logged in
        let displayProducts = shopkeeperProducts;
        if (currentShopkeeper && currentShopkeeper.shopkeeperId) {
            displayProducts = shopkeeperProducts.filter(p => p.shopkeeperId === currentShopkeeper.shopkeeperId);
        }
        
        if (displayProducts.length === 0) {
            shopkeeperProductsGrid.innerHTML = '<p class="no-orders">No products yet. Add your first product!</p>';
        } else {
            shopkeeperProductsGrid.innerHTML = displayProducts.map(product => `
                <div class="shopkeeper-product-card">
                    <img src="${product.image || 'https://via.placeholder.com/300'}" alt="${product.name || 'Product'}" class="shopkeeper-product-image" onerror="this.src='https://via.placeholder.com/300'">
                    <div class="shopkeeper-product-info">
                        <div class="shopkeeper-product-name">${product.name || 'Unnamed Product'}</div>
                        <div class="shopkeeper-product-price">$${(product.price || 0).toFixed(2)}</div>
                        <div class="shopkeeper-product-category">${product.category || 'uncategorized'}</div>
                        <div class="shopkeeper-product-actions">
                            <button class="edit-btn" onclick="editProduct(${product.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn" onclick="deleteProduct(${product.id})">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading shopkeeper products:', error);
        if (shopkeeperProductsGrid) {
            shopkeeperProductsGrid.innerHTML = '<p class="no-orders">Error loading products. Please refresh.</p>';
        }
    }
}

window.editProduct = function(productId) {
    const product = shopkeeperProducts.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productStock').value = product.stock || 0;
    document.getElementById('editingProductId').value = product.id;
    document.getElementById('addProductTitle').textContent = 'Edit Product';
    
    if (product.image) {
        previewImg.src = product.image;
        imagePreview.style.display = 'block';
        capturedImageData = product.image.startsWith('data:image/') ? product.image : null;
    }
    
    switchShopkeeperSection('add-product');
    shopkeeperMenuItems.forEach(i => i.classList.remove('active'));
    document.querySelector('.shopkeeper-menu-item[data-section="add-product"]').classList.add('active');
};

window.deleteProduct = function(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    shopkeeperProducts = shopkeeperProducts.filter(p => p.id !== productId);
    localStorage.setItem('shopkeeperProducts', JSON.stringify(shopkeeperProducts));
    loadShopkeeperProducts();
    mergeShopkeeperProducts();
    renderProducts();
    showNotification('Product deleted successfully!');
};

function mergeShopkeeperProducts() {
    // This function ensures shopkeeper products are available
    // Products are merged in renderProducts() function
    // In a real app, this would sync with a backend
}

function updateSalesReport() {
    try {
        // Calculate sales statistics
        const totalProducts = shopkeeperProducts.length;
        
        // Calculate total sales from orders that include shopkeeper products
        let totalSales = 0;
        let itemsSold = 0;
        const salesList = [];
        
        if (currentShopkeeper && currentShopkeeper.shopkeeperId) {
            orders.forEach(order => {
                if (order.items) {
                    order.items.forEach(item => {
                        const shopkeeperProduct = shopkeeperProducts.find(sp => sp.id === item.id);
                        if (shopkeeperProduct) {
                            totalSales += (item.price || 0) * (item.quantity || 0);
                            itemsSold += (item.quantity || 0);
                            salesList.push({
                                product: item.name || 'Unknown Product',
                                quantity: item.quantity || 0,
                                amount: (item.price || 0) * (item.quantity || 0),
                                date: order.date || new Date().toISOString()
                            });
                        }
                    });
                }
            });
        }
        
        const totalProductsEl = document.getElementById('totalProducts');
        const totalSalesEl = document.getElementById('totalSales');
        const itemsSoldEl = document.getElementById('itemsSold');
        
        if (totalProductsEl) totalProductsEl.textContent = totalProducts;
        if (totalSalesEl) totalSalesEl.textContent = totalSales.toFixed(2);
        if (itemsSoldEl) itemsSoldEl.textContent = itemsSold;
        
        // Display sales list
        const salesListElement = document.getElementById('salesList');
        if (salesListElement) {
            if (salesList.length === 0) {
                salesListElement.innerHTML = '<p class="no-sales">No sales yet.</p>';
            } else {
                salesListElement.innerHTML = salesList.slice(-10).reverse().map(sale => `
                    <div class="sale-item">
                        <div class="sale-info">
                            <h4>${sale.product}</h4>
                            <p>${new Date(sale.date).toLocaleDateString()} - Qty: ${sale.quantity}</p>
                        </div>
                        <div class="sale-amount">$${sale.amount.toFixed(2)}</div>
                    </div>
                `).join('');
            }
        }
    } catch (error) {
        console.error('Error updating sales report:', error);
    }
}

// Camera Functions
function openCameraModal() {
    cameraModal.classList.add('show');
    cameraOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    resetCameraUI();
}

function closeCameraModal() {
    stopCamera();
    cameraModal.classList.remove('show');
    cameraOverlay.classList.remove('show');
    document.body.style.overflow = '';
    resetCameraUI();
}

function resetCameraUI() {
    cameraVideo.style.display = 'none';
    cameraPreview.style.display = 'none';
    cameraPlaceholder.style.display = 'block';
    startCameraBtn.style.display = 'inline-block';
    captureBtn.style.display = 'none';
    retakeBtn.style.display = 'none';
    usePhotoBtn.style.display = 'none';
    stopCameraBtn.style.display = 'none';
    capturedImageData = null;
}

async function startCamera() {
    try {
        // Request camera access
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment' // Use back camera on mobile
            }
        });
        
        cameraVideo.srcObject = cameraStream;
        cameraVideo.style.display = 'block';
        cameraPlaceholder.style.display = 'none';
        startCameraBtn.style.display = 'none';
        captureBtn.style.display = 'inline-block';
        stopCameraBtn.style.display = 'inline-block';
    } catch (error) {
        console.error('Error accessing camera:', error);
        showNotification('Unable to access camera. Please check permissions.', 'error');
        // Fallback: try with any available camera
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraVideo.srcObject = cameraStream;
            cameraVideo.style.display = 'block';
            cameraPlaceholder.style.display = 'none';
            startCameraBtn.style.display = 'none';
            captureBtn.style.display = 'inline-block';
            stopCameraBtn.style.display = 'inline-block';
        } catch (fallbackError) {
            showNotification('Camera access denied. Please allow camera permissions.', 'error');
        }
    }
}

function capturePhoto() {
    if (!cameraVideo || !cameraStream) return;
    
    // Set canvas dimensions to match video
    cameraCanvas.width = cameraVideo.videoWidth;
    cameraCanvas.height = cameraVideo.videoHeight;
    
    // Draw video frame to canvas
    const ctx = cameraCanvas.getContext('2d');
    ctx.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
    
    // Convert to data URL
    capturedImageData = cameraCanvas.toDataURL('image/jpeg', 0.8);
    capturedImage.src = capturedImageData;
    
    // Show preview
    cameraVideo.style.display = 'none';
    cameraPreview.style.display = 'block';
    captureBtn.style.display = 'none';
    retakeBtn.style.display = 'inline-block';
    usePhotoBtn.style.display = 'inline-block';
    stopCameraBtn.style.display = 'none';
    
    // Stop camera stream
    stopCamera();
}

function retakePhoto() {
    resetCameraUI();
    startCamera();
}

function useCapturedPhoto() {
    if (capturedImageData) {
        // Set the data URL as the image source
        productImageInput.value = capturedImageData;
        previewImg.src = capturedImageData;
        imagePreview.style.display = 'block';
        closeCameraModal();
        showNotification('Photo added successfully!');
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    cameraVideo.srcObject = null;
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showNotification('Please select an image file.', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;
        productImageInput.value = imageData;
        previewImg.src = imageData;
        imagePreview.style.display = 'block';
        showNotification('Image uploaded successfully!');
    };
    reader.onerror = function() {
        showNotification('Error reading image file.', 'error');
    };
    reader.readAsDataURL(file);
    
    // Reset file input
    e.target.value = '';
}

function removeImage() {
    productImageInput.value = '';
    previewImg.src = '';
    imagePreview.style.display = 'none';
    capturedImageData = null;
}

// Shopkeeper Authentication
async function handleShopkeeperLogin(e) {
    e.preventDefault();
    try {
        const emailInput = document.getElementById('shopkeeperLoginEmail');
        const passwordInput = document.getElementById('shopkeeperLoginPassword');
        
        if (!emailInput || !passwordInput) {
            showNotification('Login form not found', 'error');
            return;
        }
        
        const email = emailInput.value;
        const password = passwordInput.value;
        
        if (!email || !password) {
            showNotification('Please enter email and password', 'error');
            return;
        }
        
        if (useBackend) {
            try {
                const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.SHOPKEEPER_LOGIN, {
                    method: 'POST',
                    body: { email, password }
                });
                
                setAuthToken(response.token);
                currentShopkeeper = { ...response.user, shopkeeperId: response.shopkeeperId };
                localStorage.setItem('currentShopkeeper', JSON.stringify(currentShopkeeper));
                if (shopkeeperAuthModal) shopkeeperAuthModal.classList.remove('show');
                if (shopkeeperLoginForm) shopkeeperLoginForm.reset();
                showNotification('Login successful!');
                openShopkeeperPanel();
            } catch (error) {
                showNotification(error.message || 'Login failed!', 'error');
            }
        } else {
            // Local storage fallback
            const shopkeepers = JSON.parse(localStorage.getItem('shopkeepers')) || [];
            const shopkeeper = shopkeepers.find(s => s.email === email && s.password === password);
            
            if (shopkeeper) {
                currentShopkeeper = { ...shopkeeper, shopkeeperId: shopkeeper.id };
                localStorage.setItem('currentShopkeeper', JSON.stringify(currentShopkeeper));
                if (shopkeeperAuthModal) shopkeeperAuthModal.classList.remove('show');
                if (shopkeeperLoginForm) shopkeeperLoginForm.reset();
                showNotification('Login successful!');
                openShopkeeperPanel();
            } else {
                showNotification('Invalid email or password!', 'error');
            }
        }
    } catch (error) {
        console.error('Error in shopkeeper login:', error);
        showNotification('An error occurred during login', 'error');
    }
}

async function handleShopkeeperRegister(e) {
    e.preventDefault();
    try {
        const shopNameInput = document.getElementById('shopkeeperRegisterName');
        const emailInput = document.getElementById('shopkeeperRegisterEmail');
        const passwordInput = document.getElementById('shopkeeperRegisterPassword');
        const phoneInput = document.getElementById('shopkeeperRegisterPhone');
        
        if (!shopNameInput || !emailInput || !passwordInput || !phoneInput) {
            showNotification('Registration form not found', 'error');
            return;
        }
        
        const shopName = shopNameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const phone = phoneInput.value;
        
        if (!shopName || !email || !password || !phone) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Validate phone number (more lenient for testing)
        const phoneRegex = /^\+?[1-9]\d{9,14}$/;
        if (!phoneRegex.test(phone)) {
            showNotification('Please enter a valid phone number. Format: +1234567890 (10-15 digits after +)', 'error');
            return;
        }
        
        // Normalize phone number (add + if missing)
        const normalizedPhone = phone.startsWith('+') ? phone : '+' + phone;
        
        // Check if email already exists
        let shopkeepers = JSON.parse(localStorage.getItem('shopkeepers')) || [];
        if (shopkeepers.find(s => s.email === email)) {
            showNotification('Email already registered!', 'error');
            return;
        }
        
        // Store registration data for after OTP verification
        pendingRegistration = {
            type: 'shopkeeper',
            shopName,
            email,
            phone: normalizedPhone,
            password,
            useBackend: useBackend
        };
        
        // Send OTP
        sendOTP(normalizedPhone, () => {
            // After OTP is sent, show OTP modal
            openOTPModal(normalizedPhone, 'shopkeeper');
        });
    } catch (error) {
        console.error('Error in shopkeeper registration:', error);
        showNotification('An error occurred during registration', 'error');
    }
}

// Bank Account Functions
async function handleBankAccountSubmit(e) {
    e.preventDefault();
    const bankData = {
        accountHolderName: document.getElementById('accountHolderName').value,
        bankName: document.getElementById('bankName').value,
        accountNumber: document.getElementById('accountNumber').value,
        ifscCode: document.getElementById('ifscCode').value,
        accountType: document.getElementById('accountType').value,
        branchName: document.getElementById('branchName').value
    };
    
    if (useBackend) {
        try {
            await apiRequest(API_CONFIG.ENDPOINTS.SHOPKEEPER.BANK_ACCOUNT, {
                method: 'PUT',
                body: JSON.stringify(bankData)
            });
            
            localStorage.setItem('shopkeeperBankAccount', JSON.stringify(bankData));
            showNotification('Bank account details saved successfully!');
            loadBankAccount();
        } catch (error) {
            showNotification(error.message || 'Failed to save bank details!', 'error');
        }
    } else {
        localStorage.setItem('shopkeeperBankAccount', JSON.stringify(bankData));
        showNotification('Bank account details saved successfully!');
        loadBankAccount();
    }
}

function loadBankAccount() {
    try {
        const bankAccount = JSON.parse(localStorage.getItem('shopkeeperBankAccount')) || null;
        const bankAccountDisplay = document.getElementById('bankAccountDisplay');
        const bankAccountForm = document.getElementById('bankAccountForm');
        
        if (!bankAccountDisplay || !bankAccountForm) {
            return; // Elements not found, skip
        }
        
        if (bankAccount && bankAccount.accountNumber) {
            // Show saved bank account
            const displayAccountHolder = document.getElementById('displayAccountHolder');
            const displayBankName = document.getElementById('displayBankName');
            const displayAccountNumber = document.getElementById('displayAccountNumber');
            const displayIfscCode = document.getElementById('displayIfscCode');
            const displayAccountType = document.getElementById('displayAccountType');
            
            if (displayAccountHolder) displayAccountHolder.textContent = bankAccount.accountHolderName;
            if (displayBankName) displayBankName.textContent = bankAccount.bankName;
            if (displayAccountNumber) displayAccountNumber.textContent = '****' + bankAccount.accountNumber.slice(-4);
            if (displayIfscCode) displayIfscCode.textContent = bankAccount.ifscCode;
            if (displayAccountType) displayAccountType.textContent = bankAccount.accountType;
            
            bankAccountDisplay.style.display = 'block';
            bankAccountForm.style.display = 'none';
        } else {
            bankAccountDisplay.style.display = 'none';
            bankAccountForm.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading bank account:', error);
    }
}

function editBankAccount() {
    const bankAccount = JSON.parse(localStorage.getItem('shopkeeperBankAccount')) || {};
    document.getElementById('accountHolderName').value = bankAccount.accountHolderName || '';
    document.getElementById('bankName').value = bankAccount.bankName || '';
    document.getElementById('accountNumber').value = bankAccount.accountNumber || '';
    document.getElementById('ifscCode').value = bankAccount.ifscCode || '';
    document.getElementById('accountType').value = bankAccount.accountType || '';
    document.getElementById('branchName').value = bankAccount.branchName || '';
    
    document.getElementById('bankAccountDisplay').style.display = 'none';
    document.getElementById('bankAccountForm').style.display = 'block';
}

window.editBankAccount = editBankAccount;

// OTP Functions
function generateOTP() {
    // Generate a 6-digit random OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOTP(phone, callback) {
    try {
        // Generate OTP
        currentOTP = generateOTP();
        
        // In production, this would send OTP via SMS API (Twilio, etc.)
        // For demo purposes, we'll store it and show it in console
        console.log(`OTP sent to ${phone}: ${currentOTP}`);
        console.log('In production, this would be sent via SMS');
        
        // Store OTP with timestamp for verification
        const otpData = {
            otp: currentOTP,
            phone: phone,
            timestamp: Date.now(),
            expiresIn: 300000 // 5 minutes (increased for testing)
        };
        
        localStorage.setItem('pendingOTP', JSON.stringify(otpData));
        
        // Show notification with OTP (for demo)
        showNotification(`OTP sent to ${phone}. Your OTP: ${currentOTP}`, 'success');
        
        // Call callback after a short delay to ensure notification is shown
        setTimeout(() => {
            if (callback) callback();
        }, 500);
    } catch (error) {
        console.error('Error sending OTP:', error);
        showNotification('Error sending OTP. Please try again.', 'error');
    }
}

function openOTPModal(phone, type) {
    if (!otpModal || !otpOverlay || !otpPhoneNumber) {
        console.error('OTP modal elements not found:', { otpModal, otpOverlay, otpPhoneNumber });
        showNotification('OTP verification not available', 'error');
        return;
    }
    
    try {
        // Initialize OTP inputs
        otpInputs = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'].map(id => document.getElementById(id));
        
        // Check if all inputs exist
        if (!otpInputs.every(input => input !== null)) {
            console.error('Some OTP inputs not found');
            showNotification('OTP form not properly initialized', 'error');
            return;
        }
        
        // Display phone number (masked)
        const maskedPhone = phone.replace(/(\d{3})\d+(\d{4})/, '$1****$2');
        if (otpPhoneNumber) otpPhoneNumber.textContent = maskedPhone;
        
        // Display OTP for demo (in production, remove this)
        const storedOTP = JSON.parse(localStorage.getItem('pendingOTP') || '{}');
        if (otpDisplay && displayOTP && storedOTP.otp) {
            displayOTP.textContent = storedOTP.otp;
            otpDisplay.style.display = 'block';
        }
        
        // Reset OTP inputs
        otpInputs.forEach(input => {
            if (input) {
                input.value = '';
            }
        });
        
        // Set up auto-focus
        otpInputs.forEach((input, index) => {
            if (input) {
                input.addEventListener('input', (e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only numbers
                    e.target.value = value;
                    if (value && index < 5) {
                        setTimeout(() => otpInputs[index + 1]?.focus(), 10);
                    }
                });
                
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && !e.target.value && index > 0) {
                        setTimeout(() => otpInputs[index - 1]?.focus(), 10);
                    }
                });
                
                input.addEventListener('paste', (e) => {
                    e.preventDefault();
                    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                    pastedData.split('').forEach((char, i) => {
                        if (otpInputs[i]) {
                            otpInputs[i].value = char;
                        }
                    });
                    if (otpInputs[5]) otpInputs[5].focus();
                });
            }
        });
        
        // Show modal
        otpModal.classList.add('show');
        otpOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => {
            if (otpInputs[0]) otpInputs[0].focus();
        }, 100);
        
        // Start timer
        startOTPTimer();
        
        // Close auth modal
        if (type === 'user' && authModal) {
            authModal.classList.remove('show');
        } else if (type === 'shopkeeper' && shopkeeperAuthModal) {
            shopkeeperAuthModal.classList.remove('show');
        }
    } catch (error) {
        console.error('Error opening OTP modal:', error);
        showNotification('Error opening OTP verification', 'error');
    }
}

function closeOTPModal() {
    if (!otpModal || !otpOverlay) return;
    
    try {
        otpModal.classList.remove('show');
        otpOverlay.classList.remove('show');
        document.body.style.overflow = '';
        
        // Clear OTP inputs
        otpInputs.forEach(input => {
            if (input) input.value = '';
        });
        
        // Stop timer
        stopOTPTimer();
        
        // Clear pending registration
        pendingRegistration = null;
        currentOTP = null;
        localStorage.removeItem('pendingOTP');
    } catch (error) {
        console.error('Error closing OTP modal:', error);
    }
}

function startOTPTimer() {
    stopOTPTimer(); // Clear any existing timer
    
    otpTimerSeconds = 60;
    if (otpTimer) otpTimer.textContent = otpTimerSeconds;
    if (resendOtpBtn) resendOtpBtn.disabled = true;
    
    otpTimerInterval = setInterval(() => {
        otpTimerSeconds--;
        if (otpTimer) otpTimer.textContent = otpTimerSeconds;
        
        if (otpTimerSeconds <= 0) {
            stopOTPTimer();
            if (resendOtpBtn) resendOtpBtn.disabled = false;
        }
    }, 1000);
}

function stopOTPTimer() {
    if (otpTimerInterval) {
        clearInterval(otpTimerInterval);
        otpTimerInterval = null;
    }
}

function handleResendOTP() {
    if (!pendingRegistration) {
        showNotification('No pending registration found', 'error');
        return;
    }
    
    sendOTP(pendingRegistration.phone, () => {
        showNotification('OTP resent successfully!', 'success');
        startOTPTimer();
    });
}

function handleOTPVerification(e) {
    e.preventDefault();
    
    try {
        // Get OTP inputs fresh
        const currentOtpInputs = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'].map(id => document.getElementById(id));
        
        // Get OTP from inputs
        const enteredOTP = currentOtpInputs.map(input => {
            if (input) {
                return input.value.replace(/\D/g, ''); // Only numbers
            }
            return '';
        }).join('');
        
        console.log('Entered OTP:', enteredOTP);
        
        if (enteredOTP.length !== 6) {
            showNotification('Please enter all 6 digits of the OTP', 'error');
            return;
        }
        
        // Get stored OTP
        const storedOTPDataStr = localStorage.getItem('pendingOTP');
        if (!storedOTPDataStr) {
            showNotification('OTP not found. Please request a new one.', 'error');
            closeOTPModal();
            return;
        }
        
        const storedOTPData = JSON.parse(storedOTPDataStr);
        console.log('Stored OTP:', storedOTPData.otp);
        
        // Check if OTP exists
        if (!storedOTPData.otp) {
            showNotification('OTP expired. Please request a new one.', 'error');
            closeOTPModal();
            return;
        }
        
        // Check expiration
        const now = Date.now();
        const elapsed = now - storedOTPData.timestamp;
        
        if (elapsed > storedOTPData.expiresIn) {
            showNotification('OTP expired. Please request a new one.', 'error');
            closeOTPModal();
            return;
        }
        
        // Verify OTP
        if (enteredOTP === storedOTPData.otp) {
            // OTP verified, complete registration
            showNotification('OTP verified successfully!', 'success');
            setTimeout(() => {
                completeRegistration();
            }, 500);
        } else {
            showNotification(`Invalid OTP. Please check and try again.`, 'error');
            console.log('OTP Mismatch - Expected:', storedOTPData.otp, 'Got:', enteredOTP);
            // Clear inputs
            currentOtpInputs.forEach(input => {
                if (input) input.value = '';
            });
            setTimeout(() => {
                if (currentOtpInputs[0]) currentOtpInputs[0].focus();
            }, 100);
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        showNotification('Error verifying OTP. Please try again.', 'error');
    }
}

async function completeRegistration() {
    if (!pendingRegistration) {
        showNotification('No pending registration found', 'error');
        return;
    }
    
    try {
        if (pendingRegistration.type === 'user') {
            // Complete user registration
            const { name, email, phone, password } = pendingRegistration;
            
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            users.push({ name, email, phone, password, verified: true });
            localStorage.setItem('users', JSON.stringify(users));
            
            currentUser = { name, email, phone };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserUI();
            
            closeOTPModal();
            if (authModal) authModal.classList.remove('show');
            if (registerForm) registerForm.reset();
            showNotification('Registration successful! Phone verified.');
            openUserPanel();
            
        } else if (pendingRegistration.type === 'shopkeeper') {
            // Complete shopkeeper registration
            const { shopName, email, phone, password, useBackend } = pendingRegistration;
            
            if (useBackend) {
                try {
                    const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.SHOPKEEPER_REGISTER, {
                        method: 'POST',
                        body: { shopName, email, password, phone, verified: true }
                    });
                    
                    setAuthToken(response.token);
                    currentShopkeeper = { ...response.user, shopkeeperId: response.shopkeeperId, phone };
                    localStorage.setItem('currentShopkeeper', JSON.stringify(currentShopkeeper));
                    
                    closeOTPModal();
                    if (shopkeeperAuthModal) shopkeeperAuthModal.classList.remove('show');
                    if (shopkeeperRegisterForm) shopkeeperRegisterForm.reset();
                    showNotification('Registration successful! Phone verified.');
                    openShopkeeperPanel();
                } catch (error) {
                    showNotification(error.message || 'Registration failed!', 'error');
                }
            } else {
                // Local storage fallback
                let shopkeepers = JSON.parse(localStorage.getItem('shopkeepers')) || [];
                
                const newShopkeeper = {
                    id: Date.now(),
                    shopName,
                    email,
                    password,
                    phone,
                    role: 'shopkeeper',
                    verified: true
                };
                
                shopkeepers.push(newShopkeeper);
                localStorage.setItem('shopkeepers', JSON.stringify(shopkeepers));
                
                currentShopkeeper = { ...newShopkeeper, shopkeeperId: newShopkeeper.id };
                localStorage.setItem('currentShopkeeper', JSON.stringify(currentShopkeeper));
                
                closeOTPModal();
                if (shopkeeperAuthModal) shopkeeperAuthModal.classList.remove('show');
                if (shopkeeperRegisterForm) shopkeeperRegisterForm.reset();
                showNotification('Registration successful! Phone verified.');
                openShopkeeperPanel();
            }
        }
        
        // Clear pending registration
        pendingRegistration = null;
        currentOTP = null;
        localStorage.removeItem('pendingOTP');
        
    } catch (error) {
        console.error('Error completing registration:', error);
        showNotification('Error completing registration. Please try again.', 'error');
    }
}

async function loadEarnings() {
    if (useBackend) {
        try {
            const earnings = await apiRequest(API_CONFIG.ENDPOINTS.SHOPKEEPER.EARNINGS);
            document.getElementById('totalEarnings').textContent = earnings.totalEarnings.toFixed(2);
            document.getElementById('availableBalance').textContent = earnings.availableBalance.toFixed(2);
            document.getElementById('pendingBalance').textContent = earnings.pendingBalance.toFixed(2);
            
            const paymentHistory = document.getElementById('paymentHistory');
            if (earnings.paymentHistory && earnings.paymentHistory.length > 0) {
                paymentHistory.innerHTML = earnings.paymentHistory.map(payment => `
                    <div class="sale-item">
                        <div class="sale-info">
                            <h4>Order #${payment.orderId}</h4>
                            <p>${new Date(payment.date).toLocaleDateString()} - ${payment.status}</p>
                        </div>
                        <div class="sale-amount">$${payment.amount.toFixed(2)}</div>
                    </div>
                `).join('');
            } else {
                paymentHistory.innerHTML = '<p class="no-sales">No payments yet.</p>';
            }
        } catch (error) {
            console.error('Error loading earnings:', error);
        }
    } else {
        // Calculate from local orders
        const shopkeeperOrders = orders.filter(o => 
            o.items.some(item => item.shopkeeperId === currentShopkeeper?.shopkeeperId)
        );
        
        let totalEarnings = 0;
        let availableBalance = 0;
        let pendingBalance = 0;
        
        shopkeeperOrders.forEach(order => {
            order.items.forEach(item => {
                if (item.shopkeeperId === currentShopkeeper?.shopkeeperId) {
                    const itemTotal = item.price * item.quantity;
                    const commission = itemTotal * 0.15;
                    const earning = itemTotal - commission;
                    totalEarnings += earning;
                    
                    if (order.status === 'delivered') {
                        availableBalance += earning;
                    } else {
                        pendingBalance += earning;
                    }
                }
            });
        });
        
        document.getElementById('totalEarnings').textContent = totalEarnings.toFixed(2);
        document.getElementById('availableBalance').textContent = availableBalance.toFixed(2);
        document.getElementById('pendingBalance').textContent = pendingBalance.toFixed(2);
    }
}