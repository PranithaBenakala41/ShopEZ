import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      console.log("PRODUCTS:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.log("GET PRODUCTS ERROR:", error);
      alert("Failed to load products");
    }
  }

  async function deleteProduct(id) {
    try {
      const ok = window.confirm("Delete this product?");
      if (!ok) return;

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product deleted successfully");
      getProducts();
    } catch (error) {
      console.log("DELETE ERROR:", error);
      alert("Failed to delete product");
    }
  }

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Manage Products</h2>
          <p className="text-muted">Edit or delete products</p>
        </div>

        <Link to="/admin/add-product" className="btn btn-primary">
          <FaPlus className="me-2" />
          Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="card-body p-0">

          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>

                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        width="60"
                        height="60"
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </td>

                    <td>{product.name}</td>

                    <td>
                      <span className="badge bg-primary">
                        {product.category}
                      </span>
                    </td>

                    <td className="fw-bold text-success">
                      ₹{product.price}
                    </td>

                    <td className="text-center">

                      {/* EDIT */}
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <FaEdit />
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <FaTrash />
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default AdminProducts;