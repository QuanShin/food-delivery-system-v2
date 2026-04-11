import { useState } from "react";
import { loginUser } from "../api/authApi";

function CustomerLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setMessage(`Login successful. Welcome ${data.username}`);
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>Customer Login</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px", maxWidth: "400px" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}

      {token && (
        <div>
          <p><strong>JWT Token:</strong></p>
          <textarea
            rows="6"
            cols="80"
            value={token}
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export default CustomerLoginPage;