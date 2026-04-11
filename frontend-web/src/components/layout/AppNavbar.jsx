import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <nav style={{ display: "flex", gap: "16px", padding: "16px 0" }}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/catalog">Food Catalog</Link>
      <Link to="/checkout">Checkout</Link>
      <Link to="/tracking">Track Order</Link>
      <Link to="/rider">Rider Dashboard</Link>
    </nav>
  );
}

export default AppNavbar;