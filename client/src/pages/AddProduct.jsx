import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/products", product);

      alert("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleChange} className="form-control mb-2" placeholder="Name" />
        <input name="price" onChange={handleChange} className="form-control mb-2" placeholder="Price" />
        <input name="image" onChange={handleChange} className="form-control mb-2" placeholder="Image URL" />
        <input name="category" onChange={handleChange} className="form-control mb-2" placeholder="Category" />
        <textarea name="description" onChange={handleChange} className="form-control mb-2" placeholder="Description" />

        <button className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;