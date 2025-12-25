// Product Detail Page JavaScript

// Product Data
const productData = {
    1: {
        name: "Emporio Armani Classic",
        price: "Rp 8.500.000",
        originalPrice: "Rp 9.800.000",
        discount: "13% OFF",
        description: "Jam tangan klasik dengan desain elegan dan strap kulit premium. Emporio Armani Classic menggabungkan keanggunan Italia dengan kualitas Swiss, cocok untuk pria yang menghargai gaya dan kualitas.",
        rating: 4.7,
        reviews: 156,
        stock: 12,
        images: [
            "https://watchesprime.com/wp-content/uploads/2023/12/ar1701-emporio-armani-watch-men-brown-dial-leather-strap-quartz-battery-analog-chronograph-classic_6.webp",
            "https://watchesprime.com/wp-content/uploads/2023/12/ar1701-emporio-armani-watch-men-brown-dial-leather-strap-quartz-battery-analog-chronograph-classic_6.webp",
            "https://watchesprime.com/wp-content/uploads/2023/12/ar1701-emporio-armani-watch-men-brown-dial-leather-strap-quartz-battery-analog-chronograph-classic_6.webp",
            "https://watchesprime.com/wp-content/uploads/2023/12/ar1701-emporio-armani-watch-men-brown-dial-leather-strap-quartz-battery-analog-chronograph-classic_6.webp"
        ],
        specs: {
            movement: "Swiss Quartz Chronograph",
            case: "Stainless Steel",
            crystal: "Mineral Crystal",
            waterResistance: "50m",
            diameter: "43mm",
            thickness: "12mm",
            strap: "Genuine Leather",
            warranty: "2 Years International"
        }
    },
    2: {
        name: "Rolex Submariner",
        price: "Rp 380.000.000",
        originalPrice: "Rp 420.000.000",
        discount: "10% OFF",
        description: "Jam tangan diving legendaris dengan ketahanan luar biasa. Rolex Submariner adalah standar emas untuk jam tangan diving, dipercaya oleh penyelam profesional di seluruh dunia.",
        rating: 4.8,
        reviews: 156,
        stock: 5,
        images: [
            "https://tse1.mm.bing.net/th/id/OIP._xA0hctuzAKTNnAQ6AxEaQHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
            "https://tse1.mm.bing.net/th/id/OIP._xA0hctuzAKTNnAQ6AxEaQHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
            "https://tse1.mm.bing.net/th/id/OIP._xA0hctuzAKTNnAQ6AxEaQHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
            "https://tse1.mm.bing.net/th/id/OIP._xA0hctuzAKTNnAQ6AxEaQHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3"
        ],
        specs: {
            movement: "Swiss Perpetual Automatic",
            case: "Oystersteel",
            crystal: "Sapphire Crystal",
            waterResistance: "300m",
            diameter: "41mm",
            thickness: "12.8mm",
            strap: "Oystersteel Bracelet",
            warranty: "5 Years International"
        }
    },
    3: {
        name: "Rolex Datejust",
        price: "Rp 320.000.000",
        originalPrice: "Rp 350.000.000",
        discount: "9% OFF",
        description: "Klasik abadi dengan elegansi yang tak lekang waktu. Rolex Datejust adalah simbol kesempurnaan dan prestise, cocok untuk segala acara formal maupun kasual.",
        rating: 4.7,
        reviews: 203,
        stock: 8,
        images: [
            "https://tse1.mm.bing.net/th/id/OIP._xA0hctuzAKTNnAQ6AxEaQHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
            "https://tse1.mm.bing.net/th/id/OIP._xA0hctuzAKTNnAQ6AxEaQHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
            "https://tse1.mm.bing.net/th/id/OIP._xA0hctuzAKTNnAQ6AxEaQHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
            "https://tse1.mm.bing.net/th/id/OIP._xA0hctuzAKTNnAQ6AxEaQHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3"
        ],
        specs: {
            movement: "Swiss Perpetual Automatic",
            case: "Oystersteel & 18k Gold",
            crystal: "Sapphire Crystal",
            waterResistance: "100m",
            diameter: "36mm",
            thickness: "12mm",
            strap: "Jubilee Bracelet",
            warranty: "5 Years International"
        }
    },
    4: {
        name: "LIGE Luxury Sport",
        price: "Rp 2.500.000",
        originalPrice: "Rp 3.200.000",
        discount: "22% OFF",
        description: "Jam tangan sport premium dengan fitur multifungsi. LIGE Luxury Sport menawarkan kombinasi sempurna antara gaya, fungsi, dan keterjangkauan untuk gaya hidup modern.",
        rating: 4.5,
        reviews: 78,
        stock: 15,
        images: [
            "https://images-cdn.ubuy.co.in/6484ac96c913a5555e0f5648-2021-men-039-s-watches-top-brand.jpg",
            "https://images-cdn.ubuy.co.in/6484ac96c913a5555e0f5648-2021-men-039-s-watches-top-brand.jpg",
            "https://images-cdn.ubuy.co.in/6484ac96c913a5555e0f5648-2021-men-039-s-watches-top-brand.jpg",
            "https://images-cdn.ubuy.co.in/6484ac96c913a5555e0f5648-2021-men-039-s-watches-top-brand.jpg"
        ],
        specs: {
            movement: "Japanese Quartz",
            case: "Stainless Steel",
            crystal: "Mineral Crystal",
            waterResistance: "30m",
            diameter: "44mm",
            thickness: "13mm",
            strap: "Stainless Steel",
            warranty: "2 Years International"
        }
    },
    5: {
        name: "Atmos Clock Leather Strap",
        price: "Rp 8.500.000",
        originalPrice: "Rp 9.800.000",
        discount: "13% OFF",
        description: "Jam tangan klasik dengan strap kulit premium. Menggabungkan keanggunan tradisional dengan kenyamanan modern, cocok untuk pria yang menghargai kualitas dan gaya.",
        rating: 4.3,
        reviews: 45,
        stock: 12,
        images: [
            "https://th.bing.com/th/id/R.3ebe6933c56a1a4784ce9db81be9fb60?rik=17j9eovYIzkDEA&riu=http%3a%2f%2fqualproshop.weebly.com%2fuploads%2f4%2f9%2f7%2f4%2f49746177%2fs478053636886215742_p2_i1_w1300.jpeg&ehk=ln4K3da6KGKUuxP7N3yynGoyuiISoFpTjn3pFZSaYcY%3d&risl=&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/R.3ebe6933c56a1a4784ce9db81be9fb60?rik=17j9eovYIzkDEA&riu=http%3a%2f%2fqualproshop.weebly.com%2fuploads%2f4%2f9%2f7%2f4%2f49746177%2fs478053636886215742_p2_i1_w1300.jpeg&ehk=ln4K3da6KGKUuxP7N3yynGoyuiISoFpTjn3pFZSaYcY%3d&risl=&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/R.3ebe6933c56a1a4784ce9db81be9fb60?rik=17j9eovYIzkDEA&riu=http%3a%2f%2fqualproshop.weebly.com%2fuploads%2f4%2f9%2f7%2f4%2f49746177%2fs478053636886215742_p2_i1_w1300.jpeg&ehk=ln4K3da6KGKUuxP7N3yynGoyuiISoFpTjn3pFZSaYcY%3d&risl=&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/R.3ebe6933c56a1a4784ce9db81be9fb60?rik=17j9eovYIzkDEA&riu=http%3a%2f%2fqualproshop.weebly.com%2fuploads%2f4%2f9%2f7%2f4%2f49746177%2fs478053636886215742_p2_i1_w1300.jpeg&ehk=ln4K3da6KGKUuxP7N3yynGoyuiISoFpTjn3pFZSaYcY%3d&risl=&pid=ImgRaw&r=0"
        ],
        specs: {
            movement: "Swiss Quartz",
            case: "Stainless Steel",
            crystal: "Sapphire Crystal",
            waterResistance: "50m",
            diameter: "40mm",
            thickness: "10mm",
            strap: "Genuine Leather",
            warranty: "3 Years International"
        }
    },
    6: {
        name: "Obsyss WWR Aspen",
        price: "Rp 12.000.000",
        originalPrice: "Rp 14.500.000",
        discount: "17% OFF",
        description: "Desain modern dengan teknologi canggih. Obsyss WWR Aspen menggabungkan inovasi teknologi terdepan dengan desain kontemporer yang memukau.",
        rating: 4.4,
        reviews: 67,
        stock: 7,
        images: [
            "https://ob-watches.com/cdn/shop/products/6_1_1800x1800.png?v=1663156728",
            "https://ob-watches.com/cdn/shop/products/6_1_1800x1800.png?v=1663156728",
            "https://ob-watches.com/cdn/shop/products/6_1_1800x1800.png?v=1663156728",
            "https://ob-watches.com/cdn/shop/products/6_1_1800x1800.png?v=1663156728"
        ],
        specs: {
            movement: "Swiss Automatic",
            case: "Titanium",
            crystal: "Sapphire Crystal AR",
            waterResistance: "200m",
            diameter: "42mm",
            thickness: "11.5mm",
            strap: "Titanium Bracelet",
            warranty: "3 Years International"
        }
    },
    7: {
        name: "Shaarms Elegant",
        price: "Rp 1.200.000",
        originalPrice: "Rp 1.650.000",
        discount: "27% OFF",
        description: "Jam tangan fashion dengan desain elegan dan terjangkau. Shaarms Elegant adalah pilihan sempurna untuk mereka yang menginginkan gaya tanpa menguras kantong.",
        rating: 4.2,
        reviews: 134,
        stock: 25,
        images: [
            "https://canary.contestimg.wish.com/api/webimage/6083bc5e23a04d728f142f54-large.jpg?cache_buster=091286222ed5083e5c1b17ac2d18b42c",
            "https://canary.contestimg.wish.com/api/webimage/6083bc5e23a04d728f142f54-large.jpg?cache_buster=091286222ed5083e5c1b17ac2d18b42c",
            "https://canary.contestimg.wish.com/api/webimage/6083bc5e23a04d728f142f54-large.jpg?cache_buster=091286222ed5083e5c1b17ac2d18b42c",
            "https://canary.contestimg.wish.com/api/webimage/6083bc5e23a04d728f142f54-large.jpg?cache_buster=091286222ed5083e5c1b17ac2d18b42c"
        ],
        specs: {
            movement: "Japanese Quartz",
            case: "Alloy Steel",
            crystal: "Mineral Crystal",
            waterResistance: "30m",
            diameter: "38mm",
            thickness: "9mm",
            strap: "Leather",
            warranty: "1 Year International"
        }
    }
};

// Get product ID from URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1';
}

// Load product data
function loadProductData() {
    const productId = getProductId();
    const product = productData[productId];
    
    if (!product) {
        window.location.href = '../index.html';
        return;
    }
    
    // Update page title and meta
    document.title = `${product.name} - Luxe Timepieces`;
    document.getElementById('product-title').textContent = `${product.name} - Luxe Timepieces`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-product').textContent = product.name;
    
    // Update product info
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-desc').textContent = product.description;
    document.getElementById('stock-count').textContent = product.stock;
    
    // Update images
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;
    
    // Update thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (product.images[index]) {
            thumb.dataset.image = product.images[index];
            const img = thumb.querySelector('img');
            img.src = product.images[index];
            img.alt = `${product.name} View ${index + 1}`;
        }
    });
    
    // Update rating
    const ratingScore = document.querySelector('.rating-score');
    ratingScore.textContent = `(${product.rating})`;
    
    const reviewCount = document.querySelector('.review-count');
    reviewCount.textContent = `${product.reviews} ulasan`;
    
    // Update specs
    updateSpecs(product.specs);
}

// Update specifications
function updateSpecs(specs) {
    const specsList = document.getElementById('product-specs');
    specsList.innerHTML = '';
    
    Object.entries(specs).forEach(([key, value]) => {
        const li = document.createElement('li');
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        li.innerHTML = `<strong>${label}:</strong> ${value}`;
        specsList.appendChild(li);
    });
}

// Image gallery functionality
function initImageGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const newImageSrc = thumbnail.dataset.image;
            mainImage.src = newImageSrc;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
}

// Product options functionality
function initProductOptions() {
    // Color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });
}

// Quantity controls
function initQuantityControls() {
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const quantityInput = document.getElementById('quantity');
    const stockCount = parseInt(document.getElementById('stock-count').textContent);
    
    qtyMinus.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    qtyPlus.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < stockCount) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    quantityInput.addEventListener('change', () => {
        const value = parseInt(quantityInput.value);
        if (value < 1) quantityInput.value = 1;
        if (value > stockCount) quantityInput.value = stockCount;
    });
}

// Product tabs functionality
function initProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab panel
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// Add to cart functionality
function initAddToCart() {
    const addToCartBtn = document.getElementById('add-to-cart');
    const buyNowBtn = document.getElementById('buy-now');
    const wishlistBtn = document.getElementById('wishlist');
    
    addToCartBtn.addEventListener('click', () => {
        const productId = getProductId();
        const product = productData[productId];
        const quantity = parseInt(document.getElementById('quantity').value);
        const selectedColor = document.querySelector('.color-option.active')?.dataset.color || 'black';
        const selectedSize = document.querySelector('.size-option.active')?.dataset.size || '42mm';
        
        const cartItem = {
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity,
            options: {
                color: selectedColor,
                size: selectedSize
            }
        };
        
        // Add to cart (using main.js cart functionality)
        if (typeof addItemToCart === 'function') {
            addItemToCart(cartItem);
            showNotification('Produk berhasil ditambahkan ke keranjang!', 'success');
        }
    });
    
    buyNowBtn.addEventListener('click', () => {
        // Trigger add to cart first
        addToCartBtn.click();
        
        // Redirect to checkout
        setTimeout(() => {
            window.location.href = './checkout.html';
        }, 500);
    });
    
    wishlistBtn.addEventListener('click', () => {
        wishlistBtn.classList.toggle('active');
        const isActive = wishlistBtn.classList.contains('active');
        
        if (isActive) {
            wishlistBtn.style.background = '#e74c3c';
            wishlistBtn.style.color = 'white';
            showNotification('Ditambahkan ke wishlist!', 'success');
        } else {
            wishlistBtn.style.background = '';
            wishlistBtn.style.color = '';
            showNotification('Dihapus dari wishlist!', 'info');
        }
    });
}

// View product function for related products
function viewProduct(productId) {
    window.location.href = `./product-detail.html?id=${productId}`;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProductData();
    initImageGallery();
    initProductOptions();
    initQuantityControls();
    initProductTabs();
    initAddToCart();
    
    // Initialize cart count from main.js
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
});

// Export functions for global use
window.viewProduct = viewProduct;