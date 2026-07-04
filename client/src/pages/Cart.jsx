import { Link } from "react-router-dom";

function Cart({cart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart,}) 
{
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{maxWidth: "1000px",margin: "30px auto",padding: "20px",}}>
      <h1 style={{ marginBottom: "25px" }}>🛒 Shopping Cart</h1>
      {cart.length === 0 ? (
        <div style={{background: "#fff",
        padding: "50px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",}}>
          
          <h2>Your cart is empty 😔</h2>
          
          <p style={{ color: "#666",
             marginBottom: "20px" }}>
              Add some products to your cart.</p>
          
          <Link to="/products">
          
          <button style={{background: "#2874f0",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",}}>Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} 
            style={{display: "flex",
            alignItems: "center",
            gap: "20px",
            background: "#fff",
            borderRadius: "12px",
            padding: "18px",
            marginBottom: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",}}>
              {/* Product Image */}
              <img src={item.image} alt={item.name}
               style={{width: "140px",
               height: "140px",
               objectFit: "contain",
               background: "#f7f7f7",
               borderRadius: "10px",
               padding: "10px",}}/>

              {/* Product Details */}
              <div style={{ flex: 1 }}>
                <h2 style={{margin: "0 0 10px",fontSize: "22px",}}>{item.name}</h2>
                <p style={{color: "#2874f0",fontWeight: "bold",ontSize: "24px",margin: "5px 0",}}>₹{item.price}</p>
                <p style={{color: "#777",textTransform: "capitalize",marginBottom: "15px",}}>{item.category}</p>

                {/* Quantity */}
                <div style={{display: "flex",alignItems: "center",gap: "10px",}}>
                  <button onClick={() => decreaseQuantity(item._id)}style={{width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}>
                   </button>
                   <span style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}>{item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >+</button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background: "#ff4d4f",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >Remove</button>
                <p
                  style={{
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}>₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}

          {/* Total Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "25px",
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <div>
              <h2>Total Amount</h2>
              <h1
                style={{
                  color: "#2874f0",
                  margin: 0,
                }}
              >₹{totalPrice}
              </h1>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <button
                onClick={clearCart}
                style={{
                  background: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >Clear Cart
              </button>

              <Link to="/checkout">
                <button
                  style={{
                    background: "#2874f0",
                    color: "#fff",
                    border: "none",
                    padding: "12px 22px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;