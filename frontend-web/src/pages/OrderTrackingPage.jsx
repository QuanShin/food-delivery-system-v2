import { useEffect, useState } from "react";
import { getAllOrders } from "../api/orderApi";

function OrderTrackingPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Load orders error:", error);
      setMessage("Failed to load orders.");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h2>Track Order</h2>

      {message && <p>{message}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: "12px" }}>
              <strong>Order #{order.id}</strong>
              <br />
              Customer: {order.customerEmail}
              <br />
              Item: {order.menuItemName}
              <br />
              Quantity: {order.quantity}
              <br />
              Total: ${order.totalPrice}
              <br />
              Status: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderTrackingPage;