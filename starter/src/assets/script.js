// This function formats a number to two decimal places, rounding if necessary.
function formatCurrency(amount) {
  return Math.round(amount * 100) / 100;
}

// This array holds the products available for purchase. 
// Each product object has 5 properties: name, price, quantity, productId, and image.
const products = [
   {
      name: "Cherry",
      price: 1.99,
      quantity: 0,
      productId: 1,
      image: "images/cherry.jpg"
   },
   {
      name: "Orange",
      price: 0.58,
      quantity: 0,
      productId: 2,
      image: "images/orange.jpg"
   },
   {
      name: "Strawberry",
      price: 1.57,
      quantity: 0,
      productId: 3,
      image: "images/strawberry.jpg"
   }
];

// This function retrieves a product by its productId.
function getProductById(productId) {
  return products.find(p => p.productId === productId);
}

// This array holds the products that have been added to the cart.
const cart = [];

// This function adds a product to the cart based on the productId
function addProductToCart(productId) {
  const product = getProductById(productId);
  if (!product) return console.warn("Product not found");

  const cartItem = cart.find(item => item.productId === productId);
  if (cartItem) {
    product.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
}

// This function increases the quantity of a product in the cart based on the productId.
function increaseQuantity(productId) {
  const product = getProductById(productId);
  if (product) product.quantity += 1;
}

// This function decreases the quantity of a product in the cart based on the productId.
// If the quantity reaches 0, the product is removed from the cart.
function decreaseQuantity(productId) {
  const product = getProductById(productId);
  if (product) {
    product.quantity -= 1;
    if (product.quantity <= 0) {
      product.quantity = 0;
      const index = cart.findIndex(item => item.productId === productId);
      if (index !== -1) cart.splice(index, 1);
    }
  }
}

// This function removes a product from the cart based on the productId.
function removeProductFromCart(productId) {
  const product = getProductById(productId);
  if (product) product.quantity = 0;

  const index = cart.findIndex(item => item.productId === productId);
  if (index !== -1) cart.splice(index, 1);
}

// This function calculates the total cost of all products in the cart.
function cartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return formatCurrency(total);
}
    
// This function empties the cart by clearing the cart array and resetting product quantities.
function emptyCart() {
  cart.length = 0;
  products.forEach(product => product.quantity = 0); 
}

// This variable keeps track of the total amount paid by the user and starts at 0.
let totalPaid = 0;

// This function processes a payment by adding the amount paid to totalPaid.
// It returns the balance (totalPaid - cartTotal). If the balance is 0 or more, it resets totalPaid to 0.
function pay(amount) {
  totalPaid += amount;          
  const total = cartTotal();    
  const balance = totalPaid - total;

  // customer has paid enough (or more), reset for next purchase
  if (balance >= 0) {
    totalPaid = 0;
    emptyCart();
  }

  return formatCurrency(balance);
}

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   formatCurrency,

}
