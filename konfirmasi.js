document.addEventListener('DOMContentLoaded', () => {
    // Generate a random order number
    function generateOrderNumber() {
        const prefix = 'NB';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}${randomNum}`;
    }

    // Render order items
    function renderOrderItems() {
        const orderItems = document.getElementById('order-items');
        const customerDetails = document.getElementById('customer-details');
        const subtotalEl = document.getElementById('subtotal');
        const totalEl = document.getElementById('total');
        const orderNumberEl = document.getElementById('order-number');

        // Retrieve order details from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const customerInfo = JSON.parse(localStorage.getItem('customerInfo')) || {};

        // Clear previous content
        orderItems.innerHTML = '';
        customerDetails.innerHTML = '';

        // Render order items
        let subtotal = 0;
        cartItems.forEach(item => {
            const orderItemEl = document.createElement('div');
            orderItemEl.classList.add('order-item');
            orderItemEl.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            orderItems.appendChild(orderItemEl);
            subtotal += item.price;
        });

        // Render customer details
        const customerDetailsHTML = `
            <p><strong>Name:</strong> ${customerInfo['full-name'] || 'N/A'}</p>
            <p><strong>Email:</strong> ${customerInfo['email'] || 'N/A'}</p>
            <p><strong>Address:</strong> ${customerInfo['address'] || 'N/A'}</p>
            <p><strong>City:</strong> ${customerInfo['city'] || 'N/A'}</p>
            <p><strong>Postal Code:</strong> ${customerInfo['postal-code'] || 'N/A'}</p>
        `;
        customerDetails.innerHTML = customerDetailsHTML;

        // Update subtotal and total
        const shipping = 10.00;
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        totalEl.textContent = `$${(subtotal + shipping).toFixed(2)}`;

        // Generate and display order number
        const orderNumber = generateOrderNumber();
        orderNumberEl.textContent = orderNumber;

        // Clear localStorage
        localStorage.removeItem('cartItems');
        localStorage.removeItem('customerInfo');
    }

    // Print order functionality
    function printOrder() {
        window.print();
    }

    // Update cart and wishlist counts
    function updateNavCounts() {
        const cartCountEl = document.getElementById('cart-count');
        const wishlistCountEl = document.getElementById('wishlist-count');
        
        cartCountEl.textContent = '0';
        wishlistCountEl.textContent = '0';
    }

    // Initialize page
    renderOrderItems();
    updateNavCounts();

    // Add print order event listener
    const printOrderBtn = document.getElementById('print-order');
    printOrderBtn.addEventListener('click', printOrder);
});