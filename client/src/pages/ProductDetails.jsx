import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails({ addToCart, toggleWishlist, wishlist = [] }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID");
      return;
    }

    axios
      .get(`https://shopez-53o5.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Failed to load product"));
  }, [id]);

  if (error) return <h3>{error}</h3>;
  if (!product) return <h3>Loading...</h3>;

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  return (
  <div style={{ padding: "20px", maxWidth: "600px" }}>

    <img
      src={product.image}
      alt={product.name}
      style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
    />

    <h2>{product.name}</h2>
    <p style={{ color: "#2874f0" }}>₹{product.price}</p>
    <p>{product.description}</p>

    {/* ACTION AREA - ALWAYS VISIBLE */}
    <div
      style={{
        position: "sticky",
        bottom: "0",
        background: "white",
        padding: "15px",
        display: "flex",
        gap: "10px",
        borderTop: "1px solid #ddd",
      }}
    >
      <button
        onClick={() => addToCart(product)}
        style={{
          flex: 1,
          padding: "12px",
          background: "#ff9f00",
          border: "none",
          color: "white",
          fontWeight: "bold",
          borderRadius: "5px",
        }}
      >
        Add to Cart
      </button>

      <button
        onClick={() => toggleWishlist(product)}
        style={{
          width: "50px",
          fontSize: "22px",
          border: "1px solid #ddd",
          background: "white",
          cursor: "pointer",
          color: wishlist?.some((item) => item._id === product._id)
            ? "red"
            : "gray",
          borderRadius: "5px",
        }}
      >
        ❤️
      </button>
    </div>
  </div>
);
}

export default ProductDetails;