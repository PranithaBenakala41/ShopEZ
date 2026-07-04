import { Link, useNavigate } from "react-router-dom";

function Navbar({
  cartCount,
  wishlistCount,
  search,
  setSearch,
}) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#2874f0",
        color: "white",
        gap: "25px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "28px",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        ShopEZ
      </Link>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 1,
          maxWidth: "450px",
          padding: "10px 18px",
          borderRadius: "25px",
          border: "none",
          outline: "none",
          fontSize: "15px",
        }}
      />

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <Link
          to="/products"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Products
        </Link>

        
        <Link
  to="/admin"
  style={{
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
  }}
>
  Admin
</Link>


        <Link
          to="/orders"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          📦 Orders
        </Link>

        <Link
          to="/wishlist"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "600",
          }}
          title="Wishlist"
        >
          ❤️ {wishlistCount}
        </Link>

        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "600",
          }}
          title="Cart"
        >
          🛒 {cartCount}
        </Link>
      </div>

      {/* User */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          whiteSpace: "nowrap",
        }}
      >
        {user ? (
          <>
            <span
              style={{
                fontWeight: "600",
              }}
            >
              👤 {user.name}
            </span>

            <button
              onClick={handleLogout}
              style={{
                background: "white",
                color: "#2874f0",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;