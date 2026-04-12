import { useEffect, useState } from "react";
import { createMenuItem, getAllMenuItems } from "../api/menuApi";
import { addToCart } from "../utils/cartUtils";

function FoodCatalogPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    available: true,
  });

  const handleAddToCart = (item) => {
  addToCart(item);
  setMessage(`${item.name} added to cart.`);
  };
  
  const loadMenuItems = async () => {
    try {
      const data = await getAllMenuItems();
      setMenuItems(data);
    } catch (error) {
      console.error("Menu load error:", error);
      setMessage("Failed to load menu items.");
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await createMenuItem({
        ...formData,
        price: parseFloat(formData.price),
      });

      setMessage("Menu item created successfully.");
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        available: true,
      });

      loadMenuItems();
    } catch (error) {
      console.error("Create menu item error:", error);
      setMessage(
        error.response?.data?.error || "Failed to create menu item."
      );
    }
  };

  return (
    <div>
      <h2>Food Catalog</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "12px", maxWidth: "500px", marginBottom: "24px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Food name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Available
        </label>

        <button type="submit">Add Menu Item</button>
      </form>

      {message && <p>{message}</p>}

      <div>
        <h3>Available Menu Items</h3>
        {menuItems.length === 0 ? (
          <p>No menu items found.</p>
        ) : (
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "12px" }}>
                <strong>{item.name}</strong> - {item.category} - ${item.price}
                <br />
                {item.description}
                <br />
                Status: {item.available ? "Available" : "Unavailable"}
                <br />
                <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.available}
                    style={{ marginTop: "8px" }}
                >
                    Add to Cart
                </button>
               </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FoodCatalogPage;