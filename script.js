const products = [
            { id: 1, name: "Product 1", price: 10 },
            { id: 2, name: "Product 2", price: 20 },
            { id: 3, name: "Product 3", price: 30 },
            { id: 4, name: "Product 4", price: 40 },
            { id: 5, name: "Product 5", price: 50 },
        ];

        // DOM elements
        const productList = document.getElementById('product-list');
        const cartList = document.getElementById('cart-list');
        const clearCartBtn = document.getElementById('clear-cart-btn');

        // Initialize the page
        function init() {
            renderProducts();
            loadCart();
        }

        // Render products list
        function renderProducts() {
            productList.innerHTML = '';
            
            products.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="product-info">
                        <span class="product-name">${product.name}</span>
                        <span class="product-price">$${product.price}</span>
                    </div>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(li);
            });
        }

        // Load cart from sessionStorage
        function loadCart() {
            try {
                const cartData = sessionStorage.getItem('cart');
                if (cartData) {
                    const cart = JSON.parse(cartData);
                    renderCart(cart);
                }
            } catch (error) {
                // If sessionStorage fails, cart remains empty
                console.log('SessionStorage not available');
            }
        }

        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                try {
                    // Get current cart from sessionStorage
                    let cart = [];
                    const cartData = sessionStorage.getItem('cart');
                    if (cartData) {
                        cart = JSON.parse(cartData);
                    }
                    
                    // Add product to cart
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price
                    });
                    
                    // Save to sessionStorage
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    
                    // Re-render cart
                    renderCart(cart);
                } catch (error) {
                    // If sessionStorage fails, still show in cart temporarily
                    console.log('SessionStorage not available');
                    const li = document.createElement('li');
                    li.textContent = `${product.name} - $${product.price}`;
                    cartList.appendChild(li);
                }
            }
        }

        // Render cart
        function renderCart(cart) {
            cartList.innerHTML = '';
            
            if (cart && cart.length > 0) {
                cart.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.name} - $${item.price}`;
                    cartList.appendChild(li);
                });
            }
        }

        // Clear cart
        function clearCart() {
            try {
                sessionStorage.removeItem('cart');
            } catch (error) {
                console.log('SessionStorage not available');
            }
            cartList.innerHTML = '';
        }

        // Event listeners
        clearCartBtn.addEventListener('click', clearCart);

        // Initialize the application
        init();