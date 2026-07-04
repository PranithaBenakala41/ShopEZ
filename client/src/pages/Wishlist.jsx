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

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>

  {/* ADD TO CART */}
  <button
    onClick={() => addToCart(item)}
    style={{
      background: "#2874f0",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Add to Cart
  </button>

  {/* HEART ICON */}
  <button
    onClick={() => toggleWishlist(item)}
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "1px solid #ddd",
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    ❤️
  </button>

</div>

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