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
    <div style={{ padding: "20px" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px", objectFit: "cover" }}
      />

      <h2>{product.name}</h2>
      <p style={{ color: "#2874f0" }}>₹{product.price}</p>
      <p>{product.description}</p>

      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "15px" }}>
        
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "10px 15px",
            background: "#ff9f00",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={() => toggleWishlist(product)}
          style={{
            fontSize: "22px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: isWishlisted ? "red" : "gray",
          }}
        >
          ❤️
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;