// Fungsi untuk membaca data dari localStorage dan menampilkan keranjang
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');

    cartContainer.innerHTML = ''; // Kosongkan kontainer

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <a href="index.html" class="btn btn-primary">Go to Products</a>
            </div>
        `;
        return;
    }

    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += product.price * product.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)} x ${product.quantity}</p>
                    <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="btn decrease-quantity" data-id="${product.id}">-</button>
                <button class="btn increase-quantity" data-id="${product.id}">+</button>
                <button class="btn remove-item" data-id="${product.id}">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    // Tambahkan total harga
    const totalContainer = document.createElement('div');
    totalContainer.classList.add('cart-total');
    totalContainer.innerHTML = `
        <h3>Total Price: $${totalPrice.toFixed(2)}</h3>
        <button class="btn checkout">Checkout</button>
    `;
    cartContainer.appendChild(totalContainer);

    addCartActionListeners();
}

// Fungsi untuk memperbarui jumlah barang di keranjang
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCountEl = document.getElementById('cart-count');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
}

// Tambahkan event listener untuk tombol-tombol di keranjang
function addCartActionListeners() {
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems = cartItems.filter(item => item.id !== productId);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCart();
            updateCartCount();
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const item = cartItems.find(item => item.id === productId);
            if (item) item.quantity += 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCart();
            updateCartCount();
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const item = cartItems.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cartItems = cartItems.filter(item => item.id !== productId);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCart();
            updateCartCount();
        });
    });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartCount();
});
