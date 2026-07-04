import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders({ addToCart }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", {
          state: { from: { pathname: "/orders" } },
        });
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);
    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", {
          state: { from: { pathname: "/orders" } },
        });
      } else {
        alert("Unable to fetch orders");
      }
    }

    setLoading(false);
  };

  // CANCEL ORDER
 const cancelOrder = async (id) => {
  try {
    const token = localStorage.getItem("token");

    console.log("Cancel clicked, order id:", id); // STEP DEBUG 1

    if (!token) {
      alert("Login required");
      navigate("/login");
      return;
    }

    const res = await axios.put(
      `http://localhost:5000/api/orders/cancel/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", res.data); // STEP DEBUG 2

    alert("Order Cancelled Successfully");


    fetchOrders(); // refresh UI
  } catch (err) {
    console.log("ERROR:", err.response); // STEP DEBUG 3

    alert(err.response?.data?.message || "Cancel failed");
  }
};

  // BUY AGAIN
  const buyAgain = (item) => {
    if (addToCart) {
      addToCart({
        _id: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: 1,
      });

      navigate("/cart");
    }
  };

  // STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#28a745";

      case "Cancelled":
        return "#dc3545";

      case "Shipped":
        return "#17a2b8";

      default:
        return "#ff9800";
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Loading Orders...
      </div>
    );
  }
const trackOrder = (status) => {
  if (status === "Pending") {
    alert("📦 Order is being processed");
  } 
  else if (status === "Shipped") {
    alert("🚚 Your order is on the way");
  } 
  else if (status === "Delivered") {
    alert("🎉 Order delivered successfully");
  } 
  else if (status === "Cancelled") {
    alert("❌ Order was cancelled");
  } 
  else {
    alert("📦 Order status: " + status);
  }
};
  return (
    <div
      style={{
        background: "#f1f3f6",
        minHeight: "100vh",
        padding: "25px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          color: "#222",
        }}
      >
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <h2>No Orders Yet 😔</h2>

          <button
            onClick={() => navigate("/products")}
            style={{
              marginTop: "20px",
              background: "#2874f0",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
              marginBottom: "15px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>
                Order #{order._id.slice(-6).toUpperCase()}
              </h3>

              <p style={{ color: "#777" }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                color: "white",
                background: getStatusColor(order.status),
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {order.status}
            </span>
          </div>

          {/* DELIVERY DETAILS */}
          <div
            style={{
              background: "#f8f9fa",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <p><b>Name:</b> {order.customerName}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Address:</b> {order.address}</p>
          </div>

          {/* PRODUCTS */}
          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "15px",
                padding: "15px",
                border: "1px solid #eee",
                borderRadius: "10px",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : `http://localhost:5000/${item.image}`
                }
                alt={item.name}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "contain",
                  background: "#f9f9f9",
                  borderRadius: "8px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 5px" }}>{item.name}</h4>

                <p style={{ color: "#2874f0", fontWeight: "bold" }}>
                  ₹{item.price}
                </p>

                <p>Qty: {item.quantity}</p>

                <p>
                  Total: <b>₹{item.price * item.quantity}</b>
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={() => navigate(`/product/${item.productId}`)}
                  style={{
                    background: "#2874f0",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  View
                </button>

                <button
                  onClick={() => buyAgain(item)}
                  style={{
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Buy Again
                </button>
              </div>
            </div>
          ))}

          {/* FOOTER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "15px",
              flexWrap: "wrap",
            }}
          >
            <h3 style={{ color: "#2874f0" }}>
              Grand Total: ₹{order.totalAmount}
            </h3>

            <div style={{ display: "flex", gap: "10px" }}>
              {order.status === "Pending" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Cancel Order
                </button>
              )}

              <button
  onClick={() => trackOrder(order.status)}
  style={{
    background: "#17a2b8",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Track Order
</button>
            </div>
          </div>
        </div>
      ))}
    </>
  )}
</div>
);
}

export default Orders;
        