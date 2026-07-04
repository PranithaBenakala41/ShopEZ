import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const updateStatus = async (orderId, status) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/orders/admin/status/${orderId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchOrders(); // Refresh orders after update
  } catch (err) {
    console.error(err);
    alert("Failed to update order status");
  }
};

  return (
    <div className="container mt-4">
      <h2>All Customer Orders</h2>

      {orders.length === 0 ? (
        <h4>No Orders Found</h4>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card mb-3 p-3 shadow-sm"
          >
            <h5>{order.customerName}</h5>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
  <strong>Address:</strong><br />
  {order.street}<br />
  {order.city} - {order.pincode}
</p>

<p>
  <strong>Payment Method:</strong> {order.paymentMethod}
</p>

<p>
  <strong>Payment Status:</strong> {order.paymentStatus}
</p>

            <p>
  <strong>Status:</strong>
</p>
<div
  style={{
    marginTop: "15px",
    padding: "12px",
    background: "#f8f9fa",
    borderRadius: "10px",
    border: "1px solid #ddd",
  }}
>
  <h6
    style={{
      marginBottom: "10px",
      color: "#444",
      fontWeight: "bold",
    }}
  >
    Change Order Status
  </h6>

  <select
    value={order.status}
    onChange={(e) => updateStatus(order._id, e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      outline: "none",
    }}
  >
    <option value="Pending">🟡 Pending</option>
    <option value="Processing">🔵 Processing</option>
    <option value="Shipped">📦 Shipped</option>
    <option value="Out for Delivery">🚚 Out for Delivery</option>
    <option value="Delivered">✅ Delivered</option>
    <option value="Cancelled">❌ Cancelled</option>
  </select>
</div>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <hr />

            <h6>Items</h6>

            {order.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width="60"
                  height="60"
                  style={{
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />

                <div>
                  <div>{item.name}</div>
                  <div>₹{item.price}</div>
                  <div>Qty: {item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;