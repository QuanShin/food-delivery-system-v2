import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CustomerLoginPage from "../pages/CustomerLoginPage";
import CustomerRegisterPage from "../pages/CustomerRegisterPage";
import FoodCatalogPage from "../pages/FoodCatalogPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderTrackingPage from "../pages/OrderTrackingPage";
import RiderDashboardPage from "../pages/RiderDashboardPage";
import ProfilePage from "../pages/ProfilePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<CustomerLoginPage />} />
      <Route path="/register" element={<CustomerRegisterPage />} />
      <Route path="/catalog" element={<FoodCatalogPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/tracking" element={<OrderTrackingPage />} />
      <Route path="/rider" element={<RiderDashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default AppRoutes;