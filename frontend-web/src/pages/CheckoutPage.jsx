import { useEffect, useState } from "react";
import { createOrder } from "../api/orderApi";
import {
  clearCart,
  getCartItems,
  getCartTotal,
  removeCartItem,
  updateCartItemQuantity,
} from "../utils/cartUtils";

function CheckoutPage() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const [createdOrders, setCreatedOrders] = useState([]);

  const loadCart = () => {
    setCartItems(getCartItems());
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = (id, quantity) => {
    updateCartItemQuantity(id, Number(quantity));
    loadCart();
  };

  const handleRemoveItem = (id) => {
    removeCartItem(id);
    loadCart();
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setMessage("");
    setCreatedOrders([]);

    if (cartItems.length === 0) {
      setMessage("Cart is empty.");
      return;
    }

    try {
      const results = [];

      for (const item of cartItems) {
        const order = await createOrder({
          customerEmail,
          menuItemName: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
        });

        results.push(order);
      }

      setCreatedOrders(results);
      setMessage("Order placed successfully.");
      clearCart();
      loadCart();
      setCustomerEmail("");
    } catch (error) {
      console.error("Checkout error:", error);
      setMessage(error.response?.data?.error || "Failed to place order.");
    }
  };

  return (
    <div>
      <h2 className="page-title">Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>

                <div>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    style={{ marginLeft: "8px", width: "70px" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    style={{ marginLeft: "12px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-box">
            <h3>Order Summary</h3>
            <p><strong>Total:</strong> ${getCartTotal().toFixed(2)}</p>

            <form className="form-grid" onSubmit={handleCheckout}>
              <input
                type="email"
                placeholder="Customer email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />

              <button type="submit">Place Order</button>
            </form>
          </div>
        </>
      )}

      {message && <p className="message">{message}</p>}

      {createdOrders.length > 0 && (
        <div className="summary-box sticky-summary">
          <h3>Created Orders</h3>
          <ul>
            {createdOrders.map((order) => (
              <li key={order.id}>
                Order #{order.id} - {order.menuItemName} - {order.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;