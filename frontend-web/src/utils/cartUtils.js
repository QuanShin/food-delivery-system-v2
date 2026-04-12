const CART_KEY = "food_delivery_cart";

export const getCartItems = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (menuItem) => {
  const cartItems = getCartItems();

  const existingItem = cartItems.find((item) => item.id === menuItem.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: menuItem.id,
      name: menuItem.name,
      price: Number(menuItem.price),
      quantity: 1,
    });
  }

  saveCartItems(cartItems);
};

export const updateCartItemQuantity = (id, quantity) => {
  const cartItems = getCartItems()
    .map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );

  saveCartItems(cartItems);
};

export const removeCartItem = (id) => {
  const cartItems = getCartItems().filter((item) => item.id !== id);
  saveCartItems(cartItems);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const getCartTotal = () => {
  return getCartItems().reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};