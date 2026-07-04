import { Link, useNavigate } from "react-router-dom";

function Navbar({ cartCount, wishlistCount, search, setSearch }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
      <div className="container-fluid">

        {/* BRAND */}
        <Link className="navbar-brand fw-bold fs-3" to="/">
          ShopEZ
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE CONTENT */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* SEARCH BAR */}
          <form className="d-flex w-100 w-lg-50 mx-lg-3 my-3 my-lg-0">
            <input
              className="form-control"
              type="search"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {/* NAV LINKS */}
          <ul className="navbar-nav ms-auto d-flex align-items-center text-center text-lg-start">

            <li className="nav-item">
              <Link className="nav-link text-white" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin">
                Admin
              </Link>
            </li>

            {/* ORDERS */}
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link d-flex align-items-center text-white" to="/orders">
                <span className="me-1">📦</span> Orders
              </Link>
            </li>

            {/* WISHLIST */}
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link d-flex align-items-center text-white" to="/wishlist">
                <span className="me-1">❤️</span> {wishlistCount}
              </Link>
            </li>

            {/* CART */}
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link d-flex align-items-center text-white" to="/cart">
                <span className="me-1">🛒</span> {cartCount}
              </Link>
            </li>

            {/* USER LOGIN STATE */}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    👤 {user.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-light btn-sm ms-lg-2 mt-2 mt-lg-0"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;