import { useState } from "react";
import { registerUser } from "../api/authApi";

function CustomerRegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

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
      const data = await registerUser(formData);
      setMessage(`Registration successful for ${data.username}`);
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>Customer Registration</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px", maxWidth: "400px" }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

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

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CustomerRegisterPage;