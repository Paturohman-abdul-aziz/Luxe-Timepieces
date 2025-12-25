# Erlangga Rizky Saputra - Website Jam Tangan Elegan

Website premium untuk bisnis jam tangan elegan dengan desain modern, animasi yang memukau, slider interaktif manual, sistem order terintegrasi WhatsApp, dan optimasi SEO terbaik.

## 🌟 Fitur Utama

### ✨ Desain & UI/UX
- **Design Premium**: Layout elegan dengan skema warna emas dan hitam
- **Responsive Design**: Tampil sempurna di semua perangkat (desktop, tablet, mobile)
- **Animasi Smooth**: Animasi CSS3 dan JavaScript yang halus dan profesional dengan transisi pelan
- **Loading Screen**: Loading screen yang menarik dengan animasi jam tangan
- **Hover Effects**: Efek hover yang interaktif pada semua elemen (tanpa efek magnetik berlebihan)

### 🎬 Animasi & Interaksi
- **Scroll Animations**: Animasi saat scroll menggunakan AOS (Animate On Scroll)
- **Hero Animations**: Animasi fade-in untuk hero section (typewriter dihapus)
- **Parallax Effects**: Efek parallax pada background dan elemen
- **Smooth Scrolling**: Navigasi yang halus antar section
- **Video Modal**: Modal video di about section dengan autoplay dan kontrol mute

### 🎠 Slider Koleksi Produk
- **Manual Slider**: Slider horizontal manual dengan kontrol prev/next dan dot indicators
- **No Auto-slide**: Tidak ada auto-slide otomatis, hanya kontrol manual
- **No Drag/Swipe**: Tidak ada gesture drag atau swipe, hanya tombol navigasi
- **Navigation Controls**: Tombol prev/next dan dot indicators untuk navigasi
- **Responsive Slides**: Jumlah slide menyesuaikan ukuran layar

### 🛍️ Fitur E-commerce Lengkap
- **Product Showcase**: Galeri produk dengan slider dan quick view
- **Detail Product Page**: Halaman detail lengkap dengan spesifikasi
- **Image Gallery**: Multiple view gambar produk dengan thumbnail
- **Product Options**: Pilihan warna, ukuran, dan quantity
- **Shopping Cart**: Keranjang belanja dengan floating icon dan sidebar
- **Floating Cart Icon**: Icon keranjang mengambang untuk akses cepat
- **Search Function**: Fitur pencarian dengan overlay dan suggestions
- **Wishlist**: Fitur wishlist untuk menyimpan produk favorit

### 💳 Sistem Order & Checkout
- **Checkout Page**: Halaman checkout yang elegan dan user-friendly
- **Order Summary**: Ringkasan pesanan dengan kalkulasi otomatis
- **Shipping Options**: Pilihan metode pengiriman (reguler, express, same-day)
- **Form Validation**: Validasi form yang comprehensive
- **WhatsApp Integration**: Order langsung via WhatsApp dengan format pesan otomatis
- **Email Integration**: Kirim pesanan via email dengan template yang rapi
- **Order Confirmation**: Modal konfirmasi dengan nomor pesanan
- **Local Storage**: Penyimpanan cart dan order history di browser

### 📱 Integrasi WhatsApp & Email
- **WhatsApp Order**: Tombol order langsung ke WhatsApp dengan format pesan lengkap
- **Email Order**: Kirim detail pesanan via email dengan template profesional
- **Auto-format Message**: Format pesan otomatis dengan detail lengkap
- **Customer Data**: Include data pelanggan dan alamat pengiriman
- **Order Details**: Detail produk, quantity, options, dan total harga

### 🔍 SEO & Performance
- **Meta Tags Lengkap**: Title, description, keywords yang optimal
- **Open Graph**: Meta tags untuk social media sharing
- **Schema.org JSON-LD**: Structured data untuk search engines
- **Lazy Loading**: Optimasi loading gambar
- **Performance Optimized**: Kode yang dioptimasi untuk kecepatan
- **Mobile-First**: SEO yang dioptimasi untuk mobile

### 📱 Responsive & Accessibility
- **Mobile First**: Desain yang mengutamakan mobile experience
- **Touch Friendly**: Interface yang ramah untuk perangkat sentuh
- **Keyboard Navigation**: Navigasi menggunakan keyboard
- **Screen Reader Friendly**: Struktur HTML yang semantik

## 📁 Struktur File

```
luxe-timepieces/
├── index.html                 # Halaman utama dengan slider manual
├── pages/
│   ├── product-detail.html   # Halaman detail produk
│   └── checkout.html         # Halaman checkout & order
├── assets/
│   ├── css/
│   │   ├── style.css         # Stylesheet utama + slider manual
│   │   ├── animations.css    # Animasi CSS pelan
│   │   ├── product-detail.css # Style halaman detail
│   │   └── checkout.css      # Style halaman checkout
│   ├── js/
│   │   ├── main.js          # JavaScript utama + slider manual
│   │   ├── animations.js    # Animasi JavaScript tanpa magnetik
│   │   ├── product-detail.js # Logic halaman detail
│   │   └── checkout.js      # Logic checkout & order
│   ├── images/              # Folder gambar
│   │   ├── logo.png         # Logo navbar/footer
│   │   ├── hero-watch.png   # Gambar hero Emporio Armani
│   │   ├── watch-1.jpg      # Emporio Armani Classic
│   │   ├── watch-2.jpg      # Emporio Armani Sport
│   │   ├── watch-3.jpg      # Emporio Armani Luxury
│   │   ├── watch-4.jpg      # Emporio Armani Diamond
│   │   ├── watch-5.jpg      # Emporio Armani Vintage
│   │   ├── watch-6.jpg      # Emporio Armani Modern
│   │   ├── craftsman.jpg
│   │   ├── og-image.jpg
│   │   └── favicon.ico
│   └── videos/              # Folder video
│       └── hero-bg.mp4      # Video background hero
└── README.md               # Dokumentasi
```

## 🚀 Cara Deploy ke GitHub Pages

### 1. Persiapan Repository
```bash
# Buat repository baru di GitHub
# Clone repository ke local
git clone https://github.com/username/luxe-timepieces.git
cd luxe-timepieces

# Copy semua file website ke folder repository
```

### 2. Upload File
```bash
# Add semua file
git add .

# Commit dengan pesan
git commit -m "Initial commit: Luxe Timepieces website with slider & order system"

# Push ke GitHub
git push origin main
```

### 3. Aktifkan GitHub Pages
1. Buka repository di GitHub
2. Masuk ke **Settings** > **Pages**
3. Pilih **Source**: Deploy from a branch
4. Pilih **Branch**: main
5. Pilih **Folder**: / (root)
6. Klik **Save**

### 4. Akses Website
Website akan tersedia di: `https://username.github.io/luxe-timepieces`

## 🎨 Kustomisasi

### Warna & Branding
Edit variabel CSS di `assets/css/style.css`:
```css
:root {
    --primary-color: #d4af37;    /* Warna emas */
    --secondary-color: #1a1a1a;  /* Warna hitam */
    --accent-color: #f8f8f8;     /* Warna abu terang */
}
```

### Konten Produk
Edit data produk di `assets/js/product-detail.js`:
```javascript
const productData = {
    1: {
        name: "Classic Heritage",
        price: "Rp 15.000.000",
        description: "...",
        // ... data lainnya
    }
}
```

### WhatsApp & Email
Update nomor WhatsApp di `assets/js/checkout.js`:
```javascript
const whatsappNumber = '6281234567890'; // Ganti dengan nomor Anda
```

### Slider Settings
Slider sekarang manual-only tanpa auto-slide atau drag. Kustomisasi di `assets/js/main.js`:
```javascript
// Navigasi manual dengan tombol prev/next dan dots
function initCollectionsSlider() {
    // Event listeners untuk prev/next buttons dan dots
    // Tidak ada auto-slide atau drag events
}
```

## 🛒 Cara Kerja Sistem Order

### 1. Tambah ke Keranjang
- User klik "Tambah ke Keranjang" di slider atau detail produk
- Produk tersimpan di localStorage browser
- Counter keranjang di navbar terupdate otomatis

### 2. Checkout Process
- User klik icon keranjang untuk melihat items
- Klik "Checkout" untuk ke halaman checkout
- Isi form data pelanggan dan alamat pengiriman
- Pilih metode pengiriman (reguler/express/same-day)

### 3. Order via WhatsApp/Email
- Sistem tidak menggunakan payment gateway
- User pilih order via WhatsApp atau Email
- Pesan otomatis ter-format dengan detail lengkap:
  - Data pelanggan
  - Detail produk (nama, harga, quantity, options)
  - Alamat pengiriman
  - Metode pengiriman
  - Total pembayaran
  - Catatan khusus (jika ada)

### 4. Konfirmasi Order
- Modal konfirmasi muncul dengan nomor pesanan
- Order tersimpan di localStorage untuk tracking
- Cart otomatis dikosongkan

## 📊 Fitur SEO

### Meta Tags
- Title tag yang optimal untuk setiap halaman
- Meta description yang menarik
- Keywords yang relevan
- Canonical URL
- Robots meta tag

### Structured Data
- Schema.org JSON-LD untuk toko online
- Product schema untuk setiap produk
- Organization schema untuk perusahaan
- Review schema untuk rating produk

### Performance
- Minified CSS dan JavaScript
- Optimized images dengan lazy loading
- Efficient animations
- Debounced scroll events

## 🔧 Teknologi yang Digunakan

- **HTML5**: Struktur semantik dengan microdata
- **CSS3**: Styling modern dengan Flexbox, Grid, dan Custom Properties
- **JavaScript ES6+**: Interaktivitas, slider manual, dan sistem order
- **AOS Library**: Animate On Scroll
- **Google Fonts**: Typography premium (Playfair Display + Inter)
- **Local Storage**: Penyimpanan cart dan order data
- **WhatsApp API**: Integrasi pesan WhatsApp
- **Email Protocol**: Integrasi email client
- **Video API**: Kontrol video dengan autoplay dan mute

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Best Practices

### Performance
- Lazy loading untuk gambar
- Debounced scroll events
- Efficient CSS selectors
- Minimal DOM manipulation
- Optimized slider dengan transform3d

### SEO
- Semantic HTML structure
- Proper heading hierarchy
- Alt text untuk semua gambar
- Fast loading speed
- Mobile-first approach

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus indicators
- ARIA labels where needed

### E-commerce UX
- Clear product information
- Easy navigation
- Intuitive checkout process
- Multiple contact options
- Responsive design

## 📞 Konfigurasi Kontak

### WhatsApp
Ganti nomor di `assets/js/checkout.js`:
```javascript
const whatsappNumber = '6281573318999'; // Format: 62 + nomor tanpa 0
```

### Email
Ganti email di `assets/js/checkout.js`:
```javascript
const emailUrl = `mailto:saputralang5@gmail.com?subject=...`;
```

## 🔄 Update & Maintenance

### Menambah Produk Baru
1. Tambah data di `productData` object di `product-detail.js`
2. Tambah card baru di slider di `index.html`
3. Tambah gambar produk di folder `assets/images/`

### Update Harga
Edit harga di:
- `index.html` (card di slider)
- `assets/js/product-detail.js` (data produk)

### Menambah Fitur Pembayaran
Untuk menambah payment gateway:
1. Edit `pages/checkout.html` bagian payment notice
2. Tambah logic pembayaran di `assets/js/checkout.js`
3. Integrate dengan API payment provider

## 📄 License

© 2024 Erlangga Rizky Saputra. All rights reserved.

---

**Dibuat dengan ❤️ untuk memberikan pengalaman terbaik dalam menjelajahi dan memesan koleksi jam tangan premium dengan sistem order yang terintegrasi WhatsApp dan Email.**