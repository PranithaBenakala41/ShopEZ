import { Link } from "react-router-dom";

function Wishlist({ wishlist, toggleWishlist, addToCart }) {
  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>❤️ Your Wishlist is Empty</h2>
        <Link to="/products">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Wishlist</h2>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "25px",
    marginTop: "20px",
  }}
>
        {wishlist.map((item) => (
          <div
            key={item._id}
            style={{
  background: "#fff",
  borderRadius: "12px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}}
          >
            <img
  src={item.image}
  alt={item.name}
  style={{
    width: "100%",
    height: "200px",
    objectFit: "contain",
    marginBottom: "15px",
  }}
/>

            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <button
  onClick={() => addToCart(item)}
  style={{
    background: "#2874f0",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px",
  }}
>
  Add to Cart
</button><br/>

<button
  onClick={() => toggleWishlist(item)}
  style={{
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Remove from Wishlist
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;