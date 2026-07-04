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

        {/* TOGGLER (mobile menu button) */}
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
          <ul className="navbar-nav ms-auto align-items-lg-center text-center text-lg-start">

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                📦 Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                ❤️ {wishlistCount}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                🛒 {cartCount}
              </Link>
            </li>

            {/* USER LOGIN STATE */}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    👤 {user.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-light btn-sm mt-2 mt-lg-0 ms-lg-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
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