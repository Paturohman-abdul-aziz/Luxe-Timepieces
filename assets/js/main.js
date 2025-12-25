// Main JavaScript for Luxe Timepieces

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const searchBtn = document.getElementById('search-btn');
const cartBtn = document.getElementById('cart-btn');
const contactForm = document.getElementById('contact-form');

// Collections Slider
let currentSlide = 0;
let slidesPerView = 3;
let totalSlides = 0;

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Floating Cart Click
const floatingCart = document.getElementById('floating-cart');
if (floatingCart) {
    floatingCart.addEventListener('click', () => {
        if (cartCount === 0) {
            // Show notification
            showNotification('Keranjang kosong! Silakan tambahkan produk terlebih dahulu.', 'warning');
        } else {
            // Redirect to checkout
            window.location.href = './pages/checkout.html';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Collections Slider Functionality
function initCollectionsSlider() {
    const slider = document.getElementById('collections-slider');
    const dotsContainer = document.getElementById('slider-dots');
    
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.collection-card');
    totalSlides = slides.length;
    
    // Calculate slides per view based on screen size
    function calculateSlidesPerView() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1200) {
            slidesPerView = 3;
        } else if (screenWidth >= 768) {
            slidesPerView = 2;
        } else {
            slidesPerView = 1;
        }
    }
    
    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(totalSlides / slidesPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update slider position
    function updateSlider() {
        const slideWidth = 100 / slidesPerView;
        const translateX = -(currentSlide * slideWidth);
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentSlide / slidesPerView));
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex * slidesPerView;
        if (currentSlide >= totalSlides) {
            currentSlide = totalSlides - slidesPerView;
        }
        if (currentSlide < 0) {
            currentSlide = 0;
        }
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide -= slidesPerView;
            if (currentSlide < 0) currentSlide = 0;
            updateSlider();
        }
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide < totalSlides - slidesPerView) {
            currentSlide += slidesPerView;
            if (currentSlide >= totalSlides) {
                currentSlide = totalSlides - slidesPerView;
            }
            updateSlider();
        }
    }
    
    // Initialize controls
    calculateSlidesPerView();
    createDots();
    updateSlider();
    
    // Add event listeners for prev/next buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Update on window resize
    window.addEventListener('resize', () => {
        calculateSlidesPerView();
        createDots();
        updateSlider();
    });
}

// Product Card Interactions
function initProductCards() {
    // View Detail buttons
    document.querySelectorAll('.view-detail-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = e.target.getAttribute('data-product-id');
            window.location.href = `./pages/product-detail.html?id=${productId}`;
        });
    });
    
    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = e.target.getAttribute('data-product-id');
            const card = e.target.closest('.collection-card');
            
            const product = {
                id: productId,
                name: card.querySelector('.card-title').textContent,
                price: card.querySelector('.card-price').textContent,
                image: card.querySelector('img').src,
                quantity: 1,
                options: {
                    color: 'black',
                    size: '42mm'
                }
            };
            
            addItemToCart(product);
            showNotification('Produk berhasil ditambahkan ke keranjang!', 'success');
        });
    });
}

// Add item to cart
function addItemToCart(product) {
    const existingItem = cartItems.find(item => 
        item.id === product.id && 
        item.options.color === product.options.color && 
        item.options.size === product.options.size
    );
    
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cartItems.push(product);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    updateCartCount();
}

// Remove item from cart
function removeItemFromCart(productId, options = {}) {
    cartItems = cartItems.filter(item => 
        !(item.id === productId && 
          item.options.color === options.color && 
          item.options.size === options.size)
    );
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
        
        if (cartCount > 0) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .stat-number').forEach(el => {
    observer.observe(el);
});

// Hero Title Animation
function animateHeroTitle() {
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, (index + 1) * 300);
    });
}

// Initialize hero animation when page loads
setTimeout(animateHeroTitle, 2500);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Search Functionality
searchBtn.addEventListener('click', () => {
    // Create search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-container">
            <div class="search-header">
                <input type="text" placeholder="Cari jam tangan..." class="search-input" autofocus>
                <button class="search-close">&times;</button>
            </div>
            <div class="search-results">
                <div class="search-suggestions">
                    <h4>Saran Pencarian</h4>
                    <ul>
                        <li><a href="#collections">Classic Heritage</a></li>
                        <li><a href="#collections">Sport Elite Pro</a></li>
                        <li><a href="#collections">Luxury Royal</a></li>
                        <li><a href="#collections">Diamond Prestige</a></li>
                        <li><a href="#collections">Vintage Master</a></li>
                        <li><a href="#collections">Modern Tech</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Add search overlay styles
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 100px;
        }
        .search-container {
            background: white;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        .search-header {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #eee;
        }
        .search-input {
            flex: 1;
            border: none;
            font-size: 1.2rem;
            padding: 0.5rem;
            outline: none;
        }
        .search-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
            padding: 0 0.5rem;
        }
        .search-results {
            padding: 2rem;
        }
        .search-suggestions h4 {
            margin-bottom: 1rem;
            color: var(--text-primary);
        }
        .search-suggestions ul {
            list-style: none;
            padding: 0;
        }
        .search-suggestions li {
            margin-bottom: 0.5rem;
        }
        .search-suggestions a {
            color: var(--text-secondary);
            text-decoration: none;
            padding: 0.5rem;
            display: block;
            border-radius: 4px;
            transition: background 0.3s;
        }
        .search-suggestions a:hover {
            background: var(--accent-color);
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(searchStyles);
    
    document.body.appendChild(searchOverlay);
    
    // Close search overlay
    const closeBtn = searchOverlay.querySelector('.search-close');
    closeBtn.addEventListener('click', () => {
        searchOverlay.remove();
        searchStyles.remove();
    });
    
    // Close on overlay click
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.remove();
            searchStyles.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchOverlay.remove();
            searchStyles.remove();
        }
    });
});

// Shopping Cart Functionality
cartBtn.addEventListener('click', () => {
    // Create cart sidebar
    const cartSidebar = document.createElement('div');
    cartSidebar.className = 'cart-sidebar';
    cartSidebar.innerHTML = `
        <div class="cart-header">
            <h3>Keranjang Belanja</h3>
            <button class="cart-close">&times;</button>
        </div>
        <div class="cart-content">
            ${cartItems.length === 0 ? 
                '<p class="empty-cart">Keranjang Anda kosong</p>' :
                cartItems.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>${item.price}</p>
                            <div class="item-options">
                                ${item.options ? `${item.options.color}, ${item.options.size}` : ''}
                            </div>
                            <div class="quantity-controls">
                                <button class="qty-btn minus" data-id="${item.id}" data-color="${item.options?.color}" data-size="${item.options?.size}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="qty-btn plus" data-id="${item.id}" data-color="${item.options?.color}" data-size="${item.options?.size}">+</button>
                            </div>
                        </div>
                        <button class="remove-item" data-id="${item.id}" data-color="${item.options?.color}" data-size="${item.options?.size}">×</button>
                    </div>
                `).join('')
            }
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <strong>Total: ${calculateCartTotal()}</strong>
            </div>
            <button class="checkout-btn" ${cartItems.length === 0 ? 'disabled' : ''}>
                Checkout
            </button>
        </div>
    `;
    
    // Add cart sidebar styles
    const cartStyles = document.createElement('style');
    cartStyles.textContent = `
        .cart-sidebar {
            position: fixed;
            top: 0;
            right: 0;
            width: 400px;
            height: 100%;
            background: white;
            box-shadow: -5px 0 20px rgba(0,0,0,0.1);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        .cart-sidebar.active {
            transform: translateX(0);
        }
        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        .cart-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
        }
        .cart-content {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
        }
        .empty-cart {
            text-align: center;
            color: #999;
            padding: 2rem;
        }
        .cart-item {
            display: flex;
            gap: 1rem;
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
            position: relative;
        }
        .cart-item img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
        }
        .item-details {
            flex: 1;
        }
        .item-details h4 {
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }
        .item-details p {
            color: var(--primary-color);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .item-options {
            font-size: 0.8rem;
            color: #666;
            margin-bottom: 0.5rem;
        }
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .qty-btn {
            background: #f0f0f0;
            border: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 0.8rem;
        }
        .quantity {
            font-weight: 600;
            min-width: 20px;
            text-align: center;
        }
        .remove-item {
            position: absolute;
            top: 0.5rem;
            right: 0;
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #999;
        }
        .cart-footer {
            padding: 1.5rem;
            border-top: 1px solid #eee;
        }
        .cart-total {
            margin-bottom: 1rem;
            text-align: center;
            font-size: 1.2rem;
        }
        .checkout-btn {
            width: 100%;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        .checkout-btn:hover:not(:disabled) {
            background: #b8941f;
        }
        .checkout-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        @media (max-width: 480px) {
            .cart-sidebar {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(cartStyles);
    
    document.body.appendChild(cartSidebar);
    
    // Animate in
    setTimeout(() => {
        cartSidebar.classList.add('active');
    }, 10);
    
    // Close cart sidebar
    const closeBtn = cartSidebar.querySelector('.cart-close');
    closeBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        setTimeout(() => {
            cartSidebar.remove();
            cartStyles.remove();
        }, 300);
    });
    
    // Quantity controls
    cartSidebar.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.getAttribute('data-id');
            const color = e.target.getAttribute('data-color');
            const size = e.target.getAttribute('data-size');
            const isPlus = e.target.classList.contains('plus');
            
            const item = cartItems.find(item => 
                item.id === itemId && 
                item.options.color === color && 
                item.options.size === size
            );
            
            if (item) {
                if (isPlus) {
                    item.quantity++;
                } else {
                    item.quantity--;
                    if (item.quantity <= 0) {
                        removeItemFromCart(itemId, { color, size });
                        cartSidebar.remove();
                        cartStyles.remove();
                        return;
                    }
                }
                
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
                updateCartCount();
                
                // Update quantity display
                const quantitySpan = e.target.parentNode.querySelector('.quantity');
                quantitySpan.textContent = item.quantity;
                
                // Update total
                const totalElement = cartSidebar.querySelector('.cart-total');
                totalElement.innerHTML = `<strong>Total: ${calculateCartTotal()}</strong>`;
            }
        });
    });
    
    // Remove item from cart
    cartSidebar.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.getAttribute('data-id');
            const color = e.target.getAttribute('data-color');
            const size = e.target.getAttribute('data-size');
            
            removeItemFromCart(itemId, { color, size });
            cartSidebar.remove();
            cartStyles.remove();
        });
    });
    
    // Checkout button
    const checkoutBtn = cartSidebar.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cartItems.length > 0) {
            window.location.href = './pages/checkout.html';
        }
    });
});

// Calculate cart total
function calculateCartTotal() {
    const total = cartItems.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(total);
}

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!data.name || !data.email || !data.message) {
            showNotification('Mohon lengkapi semua field yang wajib diisi.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Pesan Anda sedang dikirim...', 'info');
        
        setTimeout(() => {
            showNotification('Terima kasih! Pesan Anda telah berhasil dikirim.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                z-index: 10000;
                min-width: 300px;
                animation: slideInRight 0.3s ease;
            }
            .notification-success { border-left: 4px solid #27ae60; }
            .notification-error { border-left: 4px solid #e74c3c; }
            .notification-info { border-left: 4px solid #3498db; }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #999;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

// Video Play Button
const playButton = document.getElementById('play-video');
if (playButton) {
    playButton.addEventListener('click', () => {
        // Create video modal
        const videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="video-container">
                <button class="video-close">&times;</button>
                <button class="video-mute" id="video-mute">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                </button>
                <video id="modal-video" muted autoplay>
                    <source src="./assets/rolex.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
        
        // Add video modal styles
        const videoStyles = document.createElement('style');
        videoStyles.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .video-container {
                position: relative;
                width: 90%;
                max-width: 800px;
                aspect-ratio: 16/9;
            }
            .video-container video {
                width: 100%;
                height: 100%;
                border-radius: 8px;
            }
            .video-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
            }
            .video-mute {
                position: absolute;
                top: -40px;
                right: 40px;
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 8px;
                border-radius: 4px;
                background: rgba(0,0,0,0.5);
            }
        `;
        document.head.appendChild(videoStyles);
        
        document.body.appendChild(videoModal);
        
        // Close video modal
        const closeBtn = videoModal.querySelector('.video-close');
        closeBtn.addEventListener('click', () => {
            videoModal.remove();
            videoStyles.remove();
        });
        
        // Mute/Unmute video
        const muteBtn = videoModal.querySelector('.video-mute');
        const video = videoModal.querySelector('#modal-video');
        muteBtn.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                muteBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.25.02-.01zm-6.5 0c0 .83.26 1.65.75 2.28l-1.07 1.07c-.84-.9-1.35-2.17-1.35-3.35 0-1.77 1.02-3.29 2.5-4.03v1.79l2.48 2.25-.02-.01zM5.47 3.47L4 4.94l2.76 2.76C6.07 7.13 5.5 7.53 5.5 8h2c0-.36.13-.69.35-.93L7.06 8.94C6.87 9.27 6.75 9.62 6.75 10c0 1.77 1.02 3.29 2.5 4.03v1.79c-2.89-.86-5-3.54-5-6.82 0-1.47.48-2.89 1.35-4.13L5.47 3.47zM12 3.23v2.06c.91.06 1.76.44 2.39 1.03l1.06-1.06c-.84-.63-1.87-1.02-2.95-1.02-1.01 0-1.97.26-2.81.71L9.69 6.3c.36-.23.77-.39 1.19-.39.83 0 1.5.67 1.5 1.5v.69l1.48 1.48c.17-.29.29-.63.29-1.01 0-1.77-1.02-3.29-2.5-4.03zm0 11.23c-.36 0-.69-.13-.93-.35L12 13.07v.93c0 .36-.13.69-.35.93L12 15.64c.84.63 1.87 1.02 2.95 1.02 1.01 0 1.97-.26 2.81-.71l-1.31-1.31c-.36.23-.77.39-1.19.39-.83 0-1.5-.67-1.5-1.5v-.69l-1.48-1.48c-.17.29-.29.63-.29 1.01z"/>
                    </svg>
                `;
            } else {
                video.muted = true;
                muteBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                `;
            }
        });
        
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.remove();
                videoStyles.remove();
            }
        });
    });
}

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1200,
        easing: 'ease-out',
        once: true,
        offset: 100
    });
}

// Performance Optimization
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    initCollectionsSlider();
    initProductCards();
    updateCartCount();
});

// Export functions for global use
window.addItemToCart = addItemToCart;
window.removeItemFromCart = removeItemFromCart;
window.updateCartCount = updateCartCount;
window.showNotification = showNotification;