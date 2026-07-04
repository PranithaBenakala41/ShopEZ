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
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  if (!product)
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Product not found</h3>
        <Link to="/products">Go Back</Link>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "20px auto",
        padding: "15px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      {/* IMAGE */}
      <div style={{ flex: 1, minWidth: "250px" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            maxHeight: "350px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* DETAILS */}
      <div style={{ flex: 2, minWidth: "250px" }}>
        <Link to="/products" style={{ color: "#2874f0" }}>
          ← Back
        </Link>

        <h2>{product.name}</h2>
        <h2 style={{ color: "green" }}>₹{product.price}</h2>

        <p>
          <b>Category:</b> {product.category}
        </p>

        <p style={{ color: "#555" }}>{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          style={{
            marginTop: "15px",
            background: "#2874f0",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "6px",
            width: "100%",
            maxWidth: "250px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;