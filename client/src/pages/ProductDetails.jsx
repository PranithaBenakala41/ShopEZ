import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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

  const isWishlisted = wishlist.some(
    (item) => item._id === product._id
  );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "contain",
        }}
      />

      {/* Product Details */}
      <h2>{product.name}</h2>

      <p
        style={{
          color: "#2874f0",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        ₹{product.price}
      </p>

      <p>{product.description}</p>

      {/* Bottom Action Bar */}
      <div
        style={{
          position: "sticky",
          bottom: "0",
          background: "#fff",
          padding: "15px",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          style={{
            flex: 1,
            padding: "14px",
            background: "#ff9f00",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>

        {/* Wishlist Heart Button */}
        <button
          onClick={() => toggleWishlist(product)}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "1px solid #ddd",
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {isWishlisted ? (
            <FaHeart size={24} color="red" />
          ) : (
            <FaRegHeart size={24} color="#666" />
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;