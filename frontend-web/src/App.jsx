import { BrowserRouter } from "react-router-dom";
import AppNavbar from "./components/layout/AppNavbar";
import AppRoutes from "./routes/AppRoutes";
import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <h1>Food Ordering and Delivery System</h1>
        <AppNavbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;