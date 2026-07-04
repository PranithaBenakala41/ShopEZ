import { useState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location=useLocation();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://shopez-53o5.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      alert("Login Successful!");
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      const redirectTo =
      location.state?.from?.pathname || location.state?.from || "/";
      window.location.href = redirectTo;
      } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };
return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <h2>Login</h2>
      <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#2874f0",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;