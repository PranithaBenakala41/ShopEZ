import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams(); // ✅ MUST match route param
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
      .catch((err) => {
        console.log(err);
        setError("Failed to load product");
      });
  }, [id]);

  if (error) return <h3>{error}</h3>;
  if (!product) return <h3>Loading...</h3>;

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
    </div>
  );
}

export default ProductDetails;