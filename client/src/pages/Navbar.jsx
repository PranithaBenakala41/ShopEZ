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
    <>
      <style>
        {`
          .navbar .nav-link {
            color: white !important;
            display: flex;
            align-items: center;
            line-height: 1;
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .navbar .nav-link:hover {
            color: #f1f1f1 !important;
          }

          .navbar-nav {
            align-items: center;
          }
        `}
      </style>

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

            {/* SEARCH */}
            <form className="d-flex w-100 w-lg-50 mx-lg-3 my-3 my-lg-0">
              <input
                className="form-control"
                type="search"
                placeholder="🔍 Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {/* NAV */}
            <ul className="navbar-nav ms-auto d-flex flex-row align-items-center gap-2">

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
                  <span className="me-1">📦</span> Orders
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
                  <span className="me-1">❤️</span> {wishlistCount}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <span className="me-1">🛒</span> {cartCount}
                </Link>
              </li>

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
                      className="btn btn-light btn-sm ms-2"
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
    </>
  );
}

export default Navbar;