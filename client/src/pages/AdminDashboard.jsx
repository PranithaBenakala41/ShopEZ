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

  if (loading) return <h3 className="p-4">Loading dashboard...</h3>;
  if (!stats) return <h3 className="p-4">No stats found</h3>;

  return (
    <div className="container py-4">

      {/* Heading */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">
          Manage your store, products, and orders.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center">
            <FaBoxOpen size={25} />
            <h5 className="mt-2">Products</h5>
            <h3>{stats.totalProducts}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center">
            <FaClipboardList size={25} />
            <h5 className="mt-2">Orders</h5>
            <h3>{stats.totalOrders}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center">
            <FaUsers size={25} />
            <h5 className="mt-2">Users</h5>
            <h3>{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm text-center">
            <FaRupeeSign size={25} />
            <h5 className="mt-2">Revenue</h5>
            <h3>₹{stats.revenue}</h3>
          </div>
        </div>

      </div>

      {/* ACTION CARDS */}
      <div className="row g-4">

        {/* Add Product */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3 text-center">
            <FaPlus size={30} className="mb-2 text-primary" />
            <h4>Add Product</h4>
            <p className="text-muted">Add new products to your store</p>

            <Link to="/admin/add-product" className="btn btn-primary w-100">
              Add Product
            </Link>
          </div>
        </div>

        {/* Manage Products */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3 text-center">
            <FaBoxOpen size={30} className="mb-2 text-success" />
            <h4>Products</h4>
            <p className="text-muted">Edit or delete products</p>

            <Link to="/admin/products" className="btn btn-success w-100">
              Manage Products
            </Link>
          </div>
        </div>

        {/* Orders */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3 text-center">
            <FaClipboardList size={30} className="mb-2 text-warning" />
            <h4>Orders</h4>
            <p className="text-muted">View and manage customer orders</p>

            <Link to="/admin/orders" className="btn btn-warning w-100 text-white">
              View Orders
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;