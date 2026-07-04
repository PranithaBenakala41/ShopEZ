import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, clearCart }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");

    if (
      !customerName.trim() ||
      !phone.trim() ||
      !street.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill all details");
      return;
    }

    if (phone.length !== 10) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    if (!token) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          customerName,
          phone,
          street,
          city,
          pincode,
          paymentMethod: "COD",
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Order placed successfully!");

      clearCart();

      // Go to Orders page after placing order
      navigate("/orders");
    } catch (error) {
      console.log(error.response);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Failed to place order");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      <h3>Total Amount: ₹{total}</h3>

      <input
        type="text"
        placeholder="Enter Full Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "300px",
        }}
      />

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "300px",
        }}
      />

      <input
        type="text"
        placeholder="Street Address"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "300px",
        }}
      />

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "300px",
        }}
      />

      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        style={{
          display: "block",
          margin: "10px 0",
          padding: "8px",
          width: "300px",
        }}
      />

      <div
        style={{
          margin: "20px 0",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          width: "300px",
          background: "#f8f8f8",
        }}
      >
        <strong>Payment Method</strong>
        <br />
        <input type="radio" checked readOnly />
        <label style={{ marginLeft: "8px" }}>Cash on Delivery (COD)</label>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;