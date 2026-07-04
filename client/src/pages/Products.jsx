import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Products({
  addToCart,
  toggleWishlist,
  wishlist,
  search,
  category,
  setCategory,
  sort,
  setSort,
}) {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://shopez-53o5.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products"));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedCategory = params.get("category");

    if (selectedCategory) setCategory(selectedCategory);
    else setCategory("All");
  }, [location.search, setCategory]);

  const shareProduct = (product) => {
    const shareData = {
      title: product.name,
      text: `🔥 Check this product: ${product.name} for ₹${product.price}`,
      url: window.location.origin + `/product/${product._id}`,
    };

    if (navigator.share) navigator.share(shareData);
    else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied!");
    }
  };

  if (error) return <p>{error}</p>;
  if (!products.length) return <p>Loading products...</p>;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts];

  if (sort === "low") sortedProducts.sort((a, b) => a.price - b.price);
  else if (sort === "high") sortedProducts.sort((a, b) => b.price - a.price);
  else if (sort === "name")
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {/* FILTER BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          margin: "10px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <div>
            <label style={{ fontWeight: "600" }}>Category: </label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Beauty">Beauty</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "600" }}>Sort: </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Default</option>
              <option value="low">Low → High</option>
              <option value="high">High → Low</option>
              <option value="name">A → Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          padding: "12px",
        }}
      >
        {sortedProducts.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>No products found</h3>
        ) : (
          sortedProducts.map((p) => (
            <div
              key={p._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              {/* IMAGE */}
              <Link to={`/product/${p._id}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Link>

              {/* DETAILS */}
              <div style={{ padding: "10px" }}>
                
                {/* NAME + SHARE ROW */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <h4 style={{ fontSize: "14px", margin: 0 }}>
                    {p.name}
                  </h4>

                  {/* SHARE ICON */}
                  <button
                    onClick={() => shareProduct(p)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#f1f1f1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <HiOutlineShare />
                  </button>
                </div>

                {/* PRICE */}
                <p style={{ color: "#2874f0", marginTop: "6px" }}>
                  ₹{p.price}
                </p>

                {/* CART BUTTON */}
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    width: "100%",
                    background: "#2874f0",
                    color: "white",
                    border: "none",
                    padding: "8px",
                    borderRadius: "6px",
                    marginTop: "5px",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Products;