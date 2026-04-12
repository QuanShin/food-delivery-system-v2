import { useEffect, useState } from "react";
import { getAllOrders } from "../api/orderApi";
import { createDelivery, getAllDeliveries, updateDeliveryStatus } from "../api/deliveryApi";

function OrderTrackingPage() {
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      const [ordersData, deliveriesData] = await Promise.all([
        getAllOrders(),
        getAllDeliveries(),
      ]);

      setOrders(ordersData);
      setDeliveries(deliveriesData);
    } catch (error) {
      console.error("Tracking page load error:", error);
      setMessage("Failed to load order or delivery data.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateDelivery = async (order) => {
    try {
      await createDelivery({
        orderId: order.id,
        riderName: "Default Rider",
        deliveryAddress: "Customer Address Placeholder",
      });

      setMessage(`Delivery created for order #${order.id}`);
      loadData();
    } catch (error) {
      console.error("Create delivery error:", error);
      setMessage(error.response?.data?.error || "Failed to create delivery.");
    }
  };

  const handleUpdateStatus = async (deliveryId, status) => {
    try {
      await updateDeliveryStatus(deliveryId, { status });
      setMessage(`Delivery #${deliveryId} updated to ${status}`);
      loadData();
    } catch (error) {
      console.error("Update delivery status error:", error);
      setMessage(error.response?.data?.error || "Failed to update delivery status.");
    }
  };

  const getDeliveryForOrder = (orderId) => {
    return deliveries.find((delivery) => delivery.orderId === orderId);
  };

  const getTimelineClass = (currentStatus, step) => {
    const order = ["ASSIGNED", "PICKED_UP", "ON_THE_WAY", "DELIVERED"];
    return order.indexOf(currentStatus) >= order.indexOf(step)
      ? "timeline-step timeline-active"
      : "timeline-step";
  };

  return (
    <div>
      <h2 className="page-title">Track Order</h2>

      {message && <p className="message">{message}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="tracking-list">
          {orders.map((order) => {
            const delivery = getDeliveryForOrder(order.id);

            return (
              <div className="tracking-item" key={order.id}>
                <h3>Order #{order.id}</h3>
                <p><strong>Customer:</strong> {order.customerEmail}</p>
                <p><strong>Total:</strong> ${order.totalPrice}</p>
                <p><strong>Order Status:</strong> {order.status}</p>

                <h4>Items</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.menuItemName} — Qty: {item.quantity} — ${item.lineTotal}
                    </li>
                  ))}
                </ul>

                {delivery ? (
                  <div>
                    <h4>Delivery Info</h4>
                    <p><strong>Rider:</strong> {delivery.riderName}</p>
                    <p><strong>Address:</strong> {delivery.deliveryAddress}</p>
                    <p><strong>Delivery Status:</strong> {delivery.status}</p>

                    <div className="delivery-timeline">
                      <span className={getTimelineClass(delivery.status, "ASSIGNED")}>Assigned</span>
                      <span className={getTimelineClass(delivery.status, "PICKED_UP")}>Picked Up</span>
                      <span className={getTimelineClass(delivery.status, "ON_THE_WAY")}>On The Way</span>
                      <span className={getTimelineClass(delivery.status, "DELIVERED")}>Delivered</span>
                    </div>

                    <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button onClick={() => handleUpdateStatus(delivery.id, "PICKED_UP")}>
                        Picked Up
                      </button>
                      <button onClick={() => handleUpdateStatus(delivery.id, "ON_THE_WAY")}>
                        On The Way
                      </button>
                      <button onClick={() => handleUpdateStatus(delivery.id, "DELIVERED")}>
                        Delivered
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => handleCreateDelivery(order)}>
                    Create Delivery
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderTrackingPage;