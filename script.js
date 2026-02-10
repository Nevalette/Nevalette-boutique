// script.js

// Example content structure
const productPrices = {
    "product1": 29.99,
    "product2": 49.99,
};

function displayPrices() {
    for (const product in productPrices) {
        const price = productPrices[product];
        console.log(`Price of ${product}: £${price.toFixed(2)}`); // Changed to £
    }
}

function cartDisplay(cartItems) {
    const total = cartItems.reduce((acc, item) => acc + productPrices[item], 0);
    console.log(`Total in cart: £${total.toFixed(2)}`); // Changed to £
}

function checkoutMessage() {
    console.log(`Please pay the total amount in British pounds (£).`); // Changed to £
}

// Updating any currency values in strings

// Call functions to demonstrate the changes
displayPrices();
let cartItems = ["product1", "product2"]; // Example cart
cartDisplay(cartItems);
checkoutMessage();