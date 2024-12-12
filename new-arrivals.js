// Pastikan ada LocalStorageUtil untuk mengelola local storage
// Utility untuk localStorage
const LocalStorageUtil = {
    get: (key, defaultValue = []) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error retrieving ${key} from localStorage:`, error);
            return defaultValue;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from localStorage:`, error);
        }
    }
};

// Data Produk New Arrivals
const newArrivals = [
{
    id: 100,
    name: "Leina Denim Skirt Blue",
    price: 295.000,
    image: "product/2.png",
    category: "Skirt",
    rating: 4.3,
    description: "Stylish blue denim skirt perfect for casual outings."
},
{
    id: 101,
    name: "Leina Denim Skirt White",
    price: 295.000,
    image: "product/3.png",
    category: "Skirt",
    rating: 4.3,
    description: "Chic white denim skirt for a fresh look."
},
{
    id: 102,
    name: "Leina Denim Skirt Black",
    price: 295.000,
    image: "product/4.png",
    category: "Skirt",
    rating: 4.3,
    description: "Elegant black denim skirt for versatile styling."
},
{
    id: 103,
    name: "Leina Denim Skirt Gray",
    price: 295.000,
    image: "product/5.png",
    category: "Skirt",
    rating: 4.3,
    description: "Sophisticated gray denim skirt for any occasion."
},
{
    id: 104,
    name: "Leina Denim Skirt Blue",
    price: 295.000,
    image: "product/2.png",
    category: "Skirt",
    rating: 4.3,
    description: "Stylish blue denim skirt perfect for casual outings."
},
{
    id: 105,
    name: "Leina Denim Skirt White",
    price: 295.000,
    image: "product/3.png",
    category: "Skirt",
    rating: 4.3,
    description: "Chic white denim skirt for a fresh look."
},
{
    id: 106,
    name: "Leina Denim Skirt Black",
    price: 295.000,
    image: "product/4.png",
    category: "Skirt",
    rating: 4.3,
    description: "Elegant black denim skirt for versatile styling."
},
{
    id: 107,
    name: "Leina Denim Skirt Gray",
    price: 295.000,
    image: "product/5.png",
    category: "Skirt",
    rating: 4.3,
    description: "Sophisticated gray denim skirt for any occasion."
},
{
    id: 108,
    name: "Leina Denim Skirt Blue",
    price: 295.000,
    image: "product/2.png",
    category: "Skirt",
    rating: 4.3,
    description: "Stylish blue denim skirt perfect for casual outings."
},
{
    id: 109,
    name: "Leina Denim Skirt White",
    price: 295.000,
    image: "product/3.png",
    category: "Skirt",
    rating: 4.3,
    description: "Chic white denim skirt for a fresh look."
},
{
    id: 110,
    name: "Leina Denim Skirt Black",
    price: 295.000,
    image: "product/4.png",
    category: "Skirt",
    rating: 4.3,
    description: "Elegant black denim skirt for versatile styling."
},
{
    id: 111,
    name: "Leina Denim Skirt Gray",
    price: 295.000,
    image: "product/5.png",
    category: "Skirt",
    rating: 4.3,
    description: "Sophisticated gray denim skirt for any occasion."
}
];

// Fungsi untuk inisialisasi wishlist
function initializeWishlist() {
    if (!LocalStorageUtil.get('wishlistItems')) {
        LocalStorageUtil.set('wishlistItems', []);
    }
}

function getWishlistProducts() {
    const wishlistItems = LocalStorageUtil.get('wishlistItems');
    return wishlistItems.map(productId => newArrivals.find(product => product.id === productId)).filter(Boolean);
}

// Fungsi untuk menambahkan ke keranjang
function addToCart(product) {
  const cartItems = LocalStorageUtil.get('cartItems') || [];
  const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1;
  } else {
      cartItems.push({ ...product, quantity: 1 });
  }

  LocalStorageUtil.set('cartItems', cartItems);
  updateCartCount();

  alert(`${product.name} added to cart!`);

  displayCart();
  }


// Fungsi untuk menambahkan ke wishlist
function addToWishlist(productId) {
    const wishlistItems = LocalStorageUtil.get('wishlistItems');

    if (!wishlistItems.includes(productId)) {
        wishlistItems.push(productId);
        LocalStorageUtil.set('wishlistItems', wishlistItems);
        updateWishlistCount();

        alert('Product added to wishlist!');

        // Render ulang wishlist jika di halaman wishlist
        if (window.location.pathname.includes('wishlist.html')) {
            renderWishlist();
        }
    } else {
        alert('Product already in wishlist!');
    }
}

// Fungsi untuk menghapus produk dari wishlist
function removeFromWishlist(productId) {
const wishlistItems = LocalStorageUtil.get('wishlistItems');
const updatedWishlistItems = wishlistItems.filter(id => id !== productId);

LocalStorageUtil.set('wishlistItems', updatedWishlistItems);
updateWishlistCount();
renderWishlist();

alert('Product removed from wishlist!');
}

// Fungsi untuk update wishlist count
function updateWishlistCount() {
  const wishlistItems = LocalStorageUtil.get('wishlistItems');
  const wishlistCountEl = document.getElementById('wishlist-count');
  
  if (wishlistCountEl) {
      wishlistCountEl.textContent = wishlistItems.length;
  }
}

// Fungsi untuk render produk wishlist
// Fungsi untuk render wishlist
function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlist-container');

    if (!wishlistContainer) {
        console.error('Wishlist container not found');
        return;
    }

    const wishlistProducts = getWishlistProducts();

    wishlistContainer.innerHTML = '';

    if (wishlistProducts.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <p>Your wishlist is empty</p>
            </div>
        `;
        return;
    }

    wishlistProducts.forEach(product => {
        const wishlistCard = createNewArrivalCard(product);
        wishlistContainer.appendChild(wishlistCard);
    });
}


// Fungsi untuk membuat kartu produk new arrivals
// Fungsi untuk membuat kartu produk
function createNewArrivalCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <div class="product-detail-link" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-details">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-info">
                <span class="product-price">Rp${product.price.toFixed(3)}</span>
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${product.rating}</span>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    Add to Cart
                </button>
                <button class="btn btn-wishlist add-to-wishlist" data-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    // Tambahkan event listener
    card.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart(product);
    });

    card.querySelector('.add-to-wishlist').addEventListener('click', () => {
        addToWishlist(product.id);
    });

    return card;
}

// Fungsi untuk navigasi ke halaman detail produk
function navigateToProductDetail(productId) {
// Simpan ID produk di localStorage
localStorage.setItem('selectedProductId', productId);

// Arahkan ke halaman detail
window.location.href = 'detail-newarrivals.html';
}

// Fungsi untuk render produk new arrivals
function renderNewArrivals() {
const newArrivalsGrid = document.getElementById('new-arrivals-grid');

if (!newArrivalsGrid) {
    console.error('Element with ID "new-arrivals-grid" not found.');
    return;
}

newArrivalsGrid.innerHTML = '';

newArrivals.forEach(product => {
    const productCard = createNewArrivalCard(product);
    newArrivalsGrid.appendChild(productCard);
});
}

// Fungsi untuk menampilkan detail produk new arrivals
function displayNewArrivalDetails() {
const productId = parseInt(localStorage.getItem('selectedProductId'));
const product = newArrivals.find(p => p.id === productId);

if (!product) {
    console.error('Product not found');
    return;
}


const detailsContainer = document.getElementById('product-details-container');
detailsContainer.innerHTML = `
    <div class="product-details-wrapper">
        <div class="product-image-section">
            <img src="${product.image}" alt="${product.name}" class="product-main-image">
        </div>
        <div class="product-info-section">
            <h1 class="product-name">${product.name}</h1>
            <div class="product-price-rating">
                <span class="product-price">Rp${product.price.toFixed(3)}</span>
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${product.rating} / 5.0</span>
                </div>
            </div>
            <div class="product-description">
                <h3>Product Description</h3>
                <p>${product.description}</p>
            </div>
            <div class="product-details">
                <p><strong>Category:</strong> ${product.category}</p>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    Add to Cart
                </button>
                <button class="btn btn-secondary add-to-wishlist" data-id="${product.id}">
                    Add to Wishlist
                </button>
            </div>
        </div>
    </div>
`;

// Add event listeners
detailsContainer.querySelector('.add-to-cart').addEventListener('click', () => {
    addToCart(product);
});

detailsContainer.querySelector('.add-to-wishlist').addEventListener('click', () => {
    addToWishlist(product.id);
});
}

// Fungsi untuk menampilkan halaman wishlist
function displayWishlistPage() {
  const wishlistContainer = document.getElementById('wishlist-container');
  const wishlistItems = LocalStorageUtil.get('wishlistItems');
  
  if (!wishlistContainer) {
      console.error('Wishlist container not found');
      return;
  }

  wishlistContainer.innerHTML = '';

  if (wishlistItems.length === 0) {
      wishlistContainer.innerHTML = `
          <div class="empty-wishlist">
              <h2>Your Wishlist is Empty</h2>
              <p>Start adding your favorite items!</p>
              <a href="index.html" class="btn btn-primary">Go to Products</a>
          </div>
      `;
  } else {
      wishlistItems.forEach(productId => {
          const product = products.find(p => p.id === productId);
          if (product) {
              const productCard = createProductCard(product);
              wishlistContainer.appendChild(productCard);
          }
      });
  }
}

// Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi wishlist
  initializeWishlist();

  const currentPath = window.location.pathname;

  if (currentPath.includes('detail-newarrivals.html')) {
      // Menampilkan detail produk jika di halaman detail
      const productId = parseInt(localStorage.getItem('selectedProductId'));
      const newArrivalProduct = newArrivals.find(p => p.id === productId);
      
      if (newArrivalProduct) {
          displayNewArrivalDetails();
      }
  } else if (
      currentPath.includes('index.html') || 
      currentPath === '/' || 
      currentPath.includes('new-arrivals.html')
  ) {
      renderNewArrivals();
  } else if (currentPath.includes('wishlist.html')) {
      // Render wishlist jika berada di halaman wishlist
      renderWishlist();
      displayWishlistPage();
      updateWishlistCount();
  }
});

// Tambahan fungsi untuk mendukung keranjang (jika belum ada)
function displayCart() {
// Implementasi sederhana untuk menampilkan keranjang
console.log('Cart updated');
}

function updateCartCount() {
const cartItems = LocalStorageUtil.get('cartItems');
const cartCountElements = document.querySelectorAll('.cart-count');

cartCountElements.forEach(element => {
  element.textContent = cartItems.length;
});
}

console.log('Wishlist Items:', LocalStorageUtil.get('wishlistItems'));
console.log('Products in Wishlist:', getWishlistProducts());
console.log('New Arrivals:', newArrivals);
console.log(localStorage.getItem('wishlistItems'));