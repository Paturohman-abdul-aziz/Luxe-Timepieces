// Checkout Page JavaScript

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    loadOrderItems();
    calculateTotals();
    initShippingOptions();
    initCheckoutForm();
    initPaymentMethods();
});

// Load cart items into order summary
function loadOrderItems() {
    const orderItemsContainer = document.getElementById('order-items');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (cartItems.length === 0) {
        orderItemsContainer.innerHTML = `
            <div class="empty-order">
                <p>Keranjang Anda kosong</p>
                <a href="../index.html#collections" class="btn btn-primary">Mulai Belanja</a>
            </div>
        `;
        return;
    }
    
    orderItemsContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-options">
                    ${item.options ? `Warna: ${item.options.color}, Ukuran: ${item.options.size}` : ''}
                </div>
                <div class="item-quantity">Jumlah: ${item.quantity}</div>
            </div>
            <div class="item-price">${item.price}</div>
        `;
        orderItemsContainer.appendChild(orderItem);
    });
}

// Calculate order totals
function calculateTotals() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let subtotal = 0;
    
    cartItems.forEach(item => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''));
        subtotal += price * item.quantity;
    });
    
    const shippingCost = getShippingCost();
    const taxRate = 0.11; // 11% tax
    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + shippingCost + taxAmount;
    
    // Update display
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('shipping-cost').textContent = shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost);
    document.getElementById('tax-amount').textContent = formatCurrency(taxAmount);
    document.getElementById('grand-total').textContent = formatCurrency(grandTotal);
}

// Get shipping cost based on selected option
function getShippingCost() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (!selectedShipping) return 0;
    
    switch (selectedShipping.value) {
        case 'regular': return 0;
        case 'express': return 50000;
        case 'same-day': return 100000;
        default: return 0;
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Initialize shipping options
function initShippingOptions() {
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    
    shippingOptions.forEach(option => {
        option.addEventListener('change', () => {
            calculateTotals();
            updateDeliveryEstimate();
        });
    });
}

// Update delivery estimate
function updateDeliveryEstimate() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    let estimate = '3-5 hari kerja';
    
    if (selectedShipping) {
        switch (selectedShipping.value) {
            case 'regular': estimate = '3-5 hari kerja'; break;
            case 'express': estimate = '1-2 hari kerja'; break;
            case 'same-day': estimate = 'Hari ini juga'; break;
        }
    }
    
    // Update in confirmation modal (will be used later)
    window.deliveryEstimate = estimate;
}

// Initialize checkout form
function initCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            processOrder();
        }
    });
    
    // City selection handler
    const citySelect = document.getElementById('city');
    citySelect.addEventListener('change', () => {
        calculateTotals();
    });
}

// Validate form
function validateForm() {
    const requiredFields = [
        'firstName', 'lastName', 'email', 'phone', 
        'address', 'city', 'postalCode'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName.replace(/([A-Z])/g, '-$1').toLowerCase());
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('phone');
    const phoneRegex = /^[\+]?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
        phone.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!isValid) {
        showNotification('Mohon lengkapi semua field yang wajib diisi dengan benar.', 'error');
    }
    
    return isValid;
}

// Process order
function processOrder() {
    const formData = new FormData(document.getElementById('checkout-form'));
    const orderData = Object.fromEntries(formData);
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Generate order number
    const orderNumber = generateOrderNumber();
    
    // Prepare order details
    const orderDetails = {
        orderNumber: orderNumber,
        customer: orderData,
        items: cartItems,
        totals: {
            subtotal: document.getElementById('subtotal').textContent,
            shipping: document.getElementById('shipping-cost').textContent,
            tax: document.getElementById('tax-amount').textContent,
            total: document.getElementById('grand-total').textContent
        },
        shipping: {
            method: orderData.shipping,
            estimate: window.deliveryEstimate || '3-5 hari kerja'
        },
        timestamp: new Date().toISOString()
    };
    
    // Save order to localStorage (in real app, send to server)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Show confirmation modal
    showOrderConfirmation(orderDetails);
    
    // Clear cart
    localStorage.removeItem('cartItems');
    updateCartCount();
}

// Generate order number
function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `LT-${year}${month}${day}-${random}`;
}

// Show order confirmation modal
function showOrderConfirmation(orderDetails) {
    const modal = document.getElementById('order-confirmation-modal');
    
    // Update modal content
    document.getElementById('order-number').textContent = orderDetails.orderNumber;
    document.getElementById('final-total').textContent = orderDetails.totals.total;
    document.getElementById('delivery-estimate').textContent = orderDetails.shipping.estimate;
    
    // Show modal
    modal.classList.add('active');
    
    // Modal actions
    document.getElementById('continue-shopping').addEventListener('click', () => {
        window.location.href = '../index.html#collections';
    });
    
    document.getElementById('track-order').addEventListener('click', () => {
        // In real app, redirect to order tracking page
        showNotification('Fitur pelacakan pesanan akan segera tersedia!', 'info');
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Initialize payment methods
function initPaymentMethods() {
    const whatsappBtn = document.getElementById('whatsapp-order');
    const emailBtn = document.getElementById('email-order');
    
    whatsappBtn.addEventListener('click', () => {
        sendWhatsAppOrder();
    });
    
    emailBtn.addEventListener('click', () => {
        sendEmailOrder();
    });
}

// Send order via WhatsApp
function sendWhatsAppOrder() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const formData = new FormData(document.getElementById('checkout-form'));
    const customerData = Object.fromEntries(formData);
    
    let message = `*PESANAN BARU - LUXE TIMEPIECES*\n\n`;
    message += `*Data Pelanggan:*\n`;
    message += `Nama: ${customerData.firstName} ${customerData.lastName}\n`;
    message += `Email: ${customerData.email}\n`;
    message += `Telepon: ${customerData.phone}\n`;
    message += `Alamat: ${customerData.address}\n`;
    message += `Kota: ${customerData.city}\n`;
    message += `Kode Pos: ${customerData.postalCode}\n\n`;
    
    message += `*Detail Pesanan:*\n`;
    cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Harga: ${item.price}\n`;
        message += `   Jumlah: ${item.quantity}\n`;
        if (item.options) {
            message += `   Warna: ${item.options.color}, Ukuran: ${item.options.size}\n`;
        }
        message += `\n`;
    });
    
    message += `*Pengiriman:* ${customerData.shipping}\n`;
    message += `*Total: ${document.getElementById('grand-total').textContent}*\n\n`;
    
    if (customerData.orderNotes) {
        message += `*Catatan:* ${customerData.orderNotes}\n\n`;
    }
    
    message += `Mohon konfirmasi pesanan ini. Terima kasih! 🙏`;
    
    const whatsappNumber = '6281573318999'; // Replace with actual number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Send order via Email
function sendEmailOrder() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const formData = new FormData(document.getElementById('checkout-form'));
    const customerData = Object.fromEntries(formData);
    
    let subject = `Pesanan Baru - ${customerData.firstName} ${customerData.lastName}`;
    
    let body = `PESANAN BARU - LUXE TIMEPIECES\n\n`;
    body += `Data Pelanggan:\n`;
    body += `Nama: ${customerData.firstName} ${customerData.lastName}\n`;
    body += `Email: ${customerData.email}\n`;
    body += `Telepon: ${customerData.phone}\n`;
    body += `Alamat: ${customerData.address}\n`;
    body += `Kota: ${customerData.city}\n`;
    body += `Kode Pos: ${customerData.postalCode}\n\n`;
    
    body += `Detail Pesanan:\n`;
    cartItems.forEach((item, index) => {
        body += `${index + 1}. ${item.name}\n`;
        body += `   Harga: ${item.price}\n`;
        body += `   Jumlah: ${item.quantity}\n`;
        if (item.options) {
            body += `   Warna: ${item.options.color}, Ukuran: ${item.options.size}\n`;
        }
        body += `\n`;
    });
    
    body += `Pengiriman: ${customerData.shipping}\n`;
    body += `Total: ${document.getElementById('grand-total').textContent}\n\n`;
    
    if (customerData.orderNotes) {
        body += `Catatan: ${customerData.orderNotes}\n\n`;
    }
    
    body += `Mohon konfirmasi pesanan ini. Terima kasih!`;
    
    const emailUrl = `mailto:saputralang5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = emailUrl;
}

// Promo code functionality
document.getElementById('apply-promo').addEventListener('click', () => {
    const promoInput = document.getElementById('promo-input');
    const promoCode = promoInput.value.trim().toUpperCase();
    
    // Sample promo codes
    const promoCodes = {
        'WELCOME10': { discount: 0.10, description: 'Diskon 10% untuk pelanggan baru' },
        'LUXURY15': { discount: 0.15, description: 'Diskon 15% untuk koleksi luxury' },
        'SAVE20': { discount: 0.20, description: 'Diskon 20% pembelian di atas 50 juta' }
    };
    
    if (promoCodes[promoCode]) {
        const promo = promoCodes[promoCode];
        showNotification(`Kode promo berhasil diterapkan! ${promo.description}`, 'success');
        
        // Apply discount (simplified - in real app, recalculate totals)
        const currentTotal = document.getElementById('grand-total').textContent;
        const totalAmount = parseInt(currentTotal.replace(/[^\d]/g, ''));
        const discountAmount = totalAmount * promo.discount;
        const newTotal = totalAmount - discountAmount;
        
        // Add discount line to totals
        const orderTotals = document.querySelector('.order-totals');
        const discountLine = document.createElement('div');
        discountLine.className = 'total-line discount-line';
        discountLine.innerHTML = `
            <span>Diskon (${promoCode}):</span>
            <span style="color: #27ae60;">-${formatCurrency(discountAmount)}</span>
        `;
        
        // Remove existing discount line if any
        const existingDiscount = orderTotals.querySelector('.discount-line');
        if (existingDiscount) {
            existingDiscount.remove();
        }
        
        // Insert before grand total
        const grandTotalLine = orderTotals.querySelector('.grand-total');
        orderTotals.insertBefore(discountLine, grandTotalLine);
        
        // Update grand total
        document.getElementById('grand-total').textContent = formatCurrency(newTotal);
        
        promoInput.value = '';
    } else {
        showNotification('Kode promo tidak valid atau sudah kadaluarsa.', 'error');
    }
});

// Update cart count function (shared with main.js)
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

// Notification function (shared with main.js)
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