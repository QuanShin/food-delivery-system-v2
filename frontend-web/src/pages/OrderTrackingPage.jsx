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
      setMessage(
        error.response?.data?.error || "Failed to create delivery."
      );
    }
  };

  const handleUpdateStatus = async (deliveryId, status) => {
    try {
      await updateDeliveryStatus(deliveryId, { status });
      setMessage(`Delivery #${deliveryId} updated to ${status}`);
      loadData();
    } catch (error) {
      console.error("Update delivery status error:", error);
      setMessage(
        error.response?.data?.error || "Failed to update delivery status."
      );
    }
  };

  const getDeliveryForOrder = (orderId) => {
    return deliveries.find((delivery) => delivery.orderId === orderId);
  };

  return (
    <div>
      <h2>Track Order</h2>

      {message && <p>{message}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => {
            const delivery = getDeliveryForOrder(order.id);

            return (
              <li key={order.id} style={{ marginBottom: "20px" }}>
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
                Order Status: {order.status}
                <br />

                {delivery ? (
                  <div style={{ marginTop: "10px" }}>
                    <strong>Delivery Info</strong>
                    <br />
                    Rider: {delivery.riderName}
                    <br />
                    Address: {delivery.deliveryAddress}
                    <br />
                    Delivery Status: {delivery.status}
                    <br />
                    <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
                  <div style={{ marginTop: "10px" }}>
                    <button onClick={() => handleCreateDelivery(order)}>
                      Create Delivery
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default OrderTrackingPage;