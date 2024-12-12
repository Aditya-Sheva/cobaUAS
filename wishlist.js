document.addEventListener('DOMContentLoaded', () => {
    // Render wishlist items
    renderWishlist();

    // Update wishlist count
    updateWishlistCount();
});

// Fungsi untuk render produk wishlist
function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlist-container');
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    
    // Kosongkan kontainer sebelum menambahkan elemen baru
    wishlistContainer.innerHTML = '';

    if (wishlistItems.length === 0) {
        // Tampilkan pesan jika wishlist kosong
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <h2>Your Wishlist is Empty</h2>
                <p>Start adding your favorite items!</p>
                <a href="index.html" class="btn btn-primary">Go to Products</a>
            </div>
        `;
    } else {

        // Tampilkan produk wishlist
        wishlistItems.forEach(productId => {
            const product = products.find(p => p.id === productId); // Pastikan `products` sudah tersedia
            if (product) {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <div class="product-info">
                            <span class="product-price">$${product.price}</span>
                            <div class="product-rating">
                                <i class="fas fa-star"></i>
                                <span>${product.rating}</span>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-secondary remove-from-wishlist" data-id="${product.id}">
                                Remove
                            </button>
                            <button class="btn btn-primary checkout" data-id="${product.id}">
                                Checkout
                            </button>
                        </div>
                    </div>
                `;
                wishlistContainer.appendChild(productCard);
            }
        });

        // Tambahkan event listener ke tombol hapus
        document.querySelectorAll('.remove-from-wishlist').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.currentTarget.dataset.id);
                removeFromWishlist(productId);
            });
        });
        document.querySelectorAll('.btn-primary.checkout').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                alert(`Checkout for product ID: ${productId}`);
                // Implement checkout logic here
            });
        });
        
    }
}

// Fungsi untuk menghapus produk dari wishlist
function removeFromWishlist(productId) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    
    // Hapus produk berdasarkan ID
    wishlistItems = wishlistItems.filter(id => id !== productId);
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

    // Perbarui UI
    renderWishlist();
    updateWishlistCount();

    // Optional: Tampilkan notifikasi
    alert('Product removed from wishlist.');
}

// Fungsi untuk update jumlah produk di wishlist
function updateWishlistCount() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const wishlistCountEl = document.getElementById('wishlist-count');
    if (wishlistCountEl) {
        wishlistCountEl.textContent = wishlistItems.length;
    }
}
