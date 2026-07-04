import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://shopez-53o5.onrender.com/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // LOADING STATE
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  // ERROR STATE
  if (!product) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <Link to="/" style={{ color: "#2874f0" }}>
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        border: "1px solid #eee",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      
      <div style={{ flex: "1", minWidth: "300px", textAlign: "center" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: "10px",
          }}
        />
      </div>

      
      <div style={{ flex: "2", minWidth: "300px" }}>
        
        <Link
          to="/products"
          style={{
            textDecoration: "none",
            color: "#2874f0",
            fontWeight: "bold",
          }}
        >
          ← Back
        </Link>

        {/* NAME */}
        <h2 style={{ marginTop: "10px" }}>{product.name}</h2>

        {/* PRICE */}
        <h2 style={{ color: "green" }}>₹{product.price}</h2>

        {/* CATEGORY */}
        <p>
          <b>Category:</b> {product.category}
        </p>

        {/* DESCRIPTION */}
        <p style={{ color: "#555", lineHeight: "1.5" }}>
          {product.description}
        </p>

        
        <button
          onClick={() => addToCart(product)}
          style={{
            marginTop: "20px",
            background: "#2874f0",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;