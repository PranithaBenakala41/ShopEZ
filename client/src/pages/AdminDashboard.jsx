import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  FaPlus,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "https://shopez-53o5.onrender.com/api/orders/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStats(res.data);
    } catch (err) {
      console.log("Error fetching stats:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <h3 style={{ padding: "20px" }}>Loading dashboard...</h3>;

  if (!stats)
    return <h3 style={{ padding: "20px" }}>No stats found</h3>;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "15px",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "5px" }}>
          Admin Dashboard
        </h2>
        <p style={{ color: "#666" }}>
          Manage your store, products, and orders.
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {[
          { icon: <FaBoxOpen />, label: "Products", value: stats.totalProducts },
          { icon: <FaClipboardList />, label: "Orders", value: stats.totalOrders },
          { icon: <FaUsers />, label: "Users", value: stats.totalUsers },
          {
            icon: <FaRupeeSign />,
            label: "Revenue",
            value: `₹${stats.revenue}`,
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "20px" }}>{item.icon}</div>
            <h5 style={{ margin: "8px 0" }}>{item.label}</h5>
            <h3 style={{ margin: 0 }}>{item.value}</h3>
          </div>
        ))}
      </div>

      {/* ACTION CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
        }}
      >
        {/* Add Product */}
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <FaPlus size={25} color="blue" />
          <h4>Add Product</h4>
          <p style={{ color: "#666" }}>Add new products to your store</p>

          <Link
            to="/admin/add-product"
            style={{
              display: "block",
              padding: "10px",
              background: "#2874f0",
              color: "#fff",
              borderRadius: "6px",
              marginTop: "10px",
            }}
          >
            Add Product
          </Link>
        </div>

        {/* Products */}
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <FaBoxOpen size={25} color="green" />
          <h4>Products</h4>
          <p style={{ color: "#666" }}>Edit or delete products</p>

          <Link
            to="/admin/products"
            style={{
              display: "block",
              padding: "10px",
              background: "green",
              color: "#fff",
              borderRadius: "6px",
              marginTop: "10px",
            }}
          >
            Manage Products
          </Link>
        </div>

        {/* Orders */}
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <FaClipboardList size={25} color="orange" />
          <h4>Orders</h4>
          <p style={{ color: "#666" }}>View and manage orders</p>

          <Link
            to="/admin/orders"
            style={{
              display: "block",
              padding: "10px",
              background: "orange",
              color: "#fff",
              borderRadius: "6px",
              marginTop: "10px",
            }}
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;