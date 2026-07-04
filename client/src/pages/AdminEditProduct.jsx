import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (!id) return;

    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://shopez-53o5.onrender.com/api/products/${id}`
      );

      setProduct(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product
      );

      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={product.name} onChange={handleChange} className="form-control mb-2" />
        <input name="price" value={product.price} onChange={handleChange} className="form-control mb-2" />
        <input name="image" value={product.image} onChange={handleChange} className="form-control mb-2" />
        <input name="category" value={product.category} onChange={handleChange} className="form-control mb-2" />
        <textarea name="description" value={product.description} onChange={handleChange} className="form-control mb-2" />

        <button className="btn btn-success">Update Product</button>
      </form>
    </div>
  );
}

export default AdminEditProduct;