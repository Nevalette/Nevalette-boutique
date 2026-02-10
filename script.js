// Sample product data
const products = [
    { id: 1, name: "Soft Cotton Onesie", category: "newborn", price: 24.99, image: "https://via.placeholder.com/250x250?text=Cotton+Onesie", description: "Comfortable and breathable cotton onesie" },
    { id: 2, name: "Floral Baby Dress", category: "dresses", price: 34.99, image: "https://via.placeholder.com/250x250?text=Floral+Dress", description: "Adorable floral printed dress for little girls" },
    { id: 3, name: "Toddler T-Shirt Set", category: "toddler", price: 29.99, image: "https://via.placeholder.com/250x250?text=Toddler+Tee", description: "Set of 3 colorful t-shirts for toddlers" },
    { id: 4, name: "Baby Romper", category: "newborn", price: 32.99, image: "https://via.placeholder.com/250x250?text=Baby+Romper", description: "Cute and cozy romper for newborns" },
    { id: 5, name: "Fairy Tale Princess Dress", category: "dresses", price: 44.99, image: "https://via.placeholder.com/250x250?text=Princess+Dress", description: "Magical princess dress for special occasions" },
    { id: 6, name: "Toddler Overall Set", category: "toddler", price: 39.99, image: "https://via.placeholder.com/250x250?text=Toddler+Overall", description: "Stylish overalls with cute patterns" }
];

let cart = [];
let currentFilter = 'all';

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupCartListener();
});

// Display products based on filter
function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">$${product.price}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(productCard);
    });
}

// Filter products
function filterProducts(category) {
    currentFilter = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display products
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Setup cart icon listener
function setupCartListener() {
    document.querySelector('.cart-icon').addEventListener('click', openCart);
}

// Open cart modal
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
    displayCartItems();
}

// Close cart modal
function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
}

// Display cart items
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${itemTotal.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItem);
    });
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCartItems();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nThis will redirect to payment (feature coming soon)`);

    // Clear cart
    cart = [];
    updateCartCount();
    closeCart();
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    event.target.reset();
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};