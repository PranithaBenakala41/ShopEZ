import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment({ clearCart }) {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const handlePayment = () => {
    if (method === "cod") {
      alert("Order placed with Cash on Delivery!");
    } else {
      alert("Payment Successful 🎉 (Demo)");
    }

    // SAFE CLEAR CART
    if (typeof clearCart === "function") {
      clearCart();
    }

    navigate("/orders");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment Page</h2>

      <label>
        <input
          type="radio"
          value="cod"
          checked={method === "cod"}
          onChange={(e) => setMethod(e.target.value)}
        />
        Cash on Delivery
      </label>

      <br /><br />

      <label>
        <input
          type="radio"
          value="online"
          checked={method === "online"}
          onChange={(e) => setMethod(e.target.value)}
        />
        Online Payment (Demo)
      </label>

      <br /><br />

      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;