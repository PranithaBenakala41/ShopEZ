import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import Wishlist from "./pages/Wishlist";
import AdminOrders from "./pages/AdminOrders";

const user = JSON.parse(localStorage.getItem("user") || "null");
function App() {
  // CART
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // WISHLIST
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // SEARCH & FILTER
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  // LOGIN CHECK
 const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
);

useEffect(() => {
  setIsLoggedIn(!!localStorage.getItem("token"));
}, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // SAVE WISHLIST
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // CART COUNT
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ADD TO CART
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // TOGGLE WISHLIST
  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE FROM CART
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  return (
    <BrowserRouter>

    <Navbar
  cartCount={cartCount}
  wishlistCount={wishlist.length}
  search={search}
  setSearch={setSearch}
/>
      <Routes>

        <Route path="/" element={<Home />} />

      <Route
  path="/products"
  element={
    <Products
      addToCart={addToCart}
      toggleWishlist={toggleWishlist}
      wishlist={wishlist}
      search={search}
      category={category}
      setCategory={setCategory}
      sort={sort}
      setSort={setSort}
    />
  }
/>

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            isLoggedIn ? (
              <Checkout
                cart={cart}
                clearCart={clearCart}
              />
            ) : (
              <Navigate to="/login" state={{from:"/checkout"}}replace/>
            )
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/orders"
          element={
            isLoggedIn ? (
              <Orders />
            ) : (
              <Navigate to="/login" state={{from:{pathname:"/orders"}}} replace/>
            )
          }
        />

        <Route
          path="/payment"
          element={
            isLoggedIn ? (
              <Payment clearCart={clearCart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/add-product"
          element={<AddProduct />}
        />
        <Route path="/admin/products" element={<AdminProducts/>}/>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct/>}/>
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;