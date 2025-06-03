const products = [
            { id: 1, name: "Product 1", price: 10 },
            { id: 2, name: "Product 2", price: 20 },
            { id: 3, name: "Product 3", price: 30 },
            { id: 4, name: "Product 4", price: 40 },
            { id: 5, name: "Product 5", price: 50 },
        ];

        // In-memory cart storage (replaces sessionStorage for Claude.ai compatibility)
        let cart = [];

        // DOM elements
        const productList = document.getElementById('product-list');
        const cartList = document.getElementById('cart-list');
        const clearCartBtn = document.getElementById('clear-cart-btn');
        const cartTotal = document.getElementById('cart-total');

        // Initialize the page
        function init() {
            renderProducts();
            renderCart();
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

        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                // Check if product already exists in cart
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1
                    });
                }
                
                renderCart();
                updateCartTotal();
            }
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            renderCart();
            updateCartTotal();
        }

        // Update item quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    renderCart();
                    updateCartTotal();
                }
            }
        }

        // Render cart
        function renderCart() {
            cartList.innerHTML = '';
            
            if (cart.length === 0) {
                const emptyMessage = document.createElement('li');
                emptyMessage.className = 'empty-cart';
                emptyMessage.textContent = 'Your cart is empty';
                cartList.appendChild(emptyMessage);
                clearCartBtn.style.display = 'none';
                cartTotal.style.display = 'none';
            } else {
                cart.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <div class="cart-item-info">
                            <span class="cart-item-name">${item.name}</span>
                            <span class="cart-item-price">$${item.price} × ${item.quantity} = $${item.price * item.quantity}</span>
                        </div>
                        <div>
                            <button onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span style="margin: 0 10px;">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; background-color: #dc3545;">Remove</button>
                        </div>
                    `;
                    cartList.appendChild(li);
                });
                clearCartBtn.style.display = 'block';
                cartTotal.style.display = 'block';
            }
        }

        // Update cart total
        function updateCartTotal() {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `Total: $${total}`;
        }

        // Clear cart
        function clearCart() {
            cart = [];
            renderCart();
            updateCartTotal();
        }

        // Event listeners
        clearCartBtn.addEventListener('click', clearCart);

        // Initialize the application
        init();