import { useEffect, useMemo, useState } from "react";
import { getAllMenuItems } from "../api/menuApi";
import { addToCart } from "../utils/cartUtils";
import { menuSeed } from "../data/menuSeed";

function FoodCatalogPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const loadMenuItems = async () => {
    try {
      const data = await getAllMenuItems();
      const backendItems = Array.isArray(data) ? data : [];

      const mergedMap = new Map();

      menuSeed.forEach((seedItem) => {
        mergedMap.set(seedItem.name.toLowerCase(), seedItem);
      });

      backendItems.forEach((item) => {
        const matched = menuSeed.find(
          (seed) => seed.name.toLowerCase() === item.name.toLowerCase()
        );

        const enrichedItem = matched
          ? { ...matched, ...item }
          : {
              ...item,
              image: "/images/dishes/american.jpg",
              rating: 4.5,
              prepTime: "15-20 min",
              popular: false,
              description: item.description || "Freshly prepared menu item.",
            };

        mergedMap.set(item.name.toLowerCase(), enrichedItem);
      });

      const mergedItems = Array.from(mergedMap.values()).filter(
        (item) =>
          item.name &&
          item.name.trim() !== "" &&
          item.category &&
          item.category.trim() !== "" &&
          item.description &&
          item.description.trim() !== ""
      );

      setMenuItems(mergedItems);
    } catch (error) {
      console.error("Menu load error:", error);
      setMenuItems(menuSeed);
      setMessage("Loaded demo catalog from seed data.");
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage(`${item.name} added to cart.`);
  };

  const categories = useMemo(() => {
    const unique = [...new Set(menuItems.map((item) => item.category))];
    return ["All", ...unique];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchTerm]);

  return (
    <div>
      <h2 className="page-title">Food Catalog</h2>

      <div className="catalog-toolbar">
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="catalog-search"
        />
      </div>

      <div className="category-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-chip ${
              selectedCategory === category ? "category-chip-active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {message && <p className="message">{message}</p>}

      <h3 className="section-title">Available Dishes</h3>

      {filteredItems.length === 0 ? (
        <p>No menu items found.</p>
      ) : (
        <div className="dish-list">
          {filteredItems.map((item) => (
            <div className="dish-row" key={item.id}>
              <img
                src={item.image || "/images/dishes/american.jpg"}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src = "/images/dishes/american.jpg";
                }}
                className="dish-image"
              />

              <div className="dish-main">
                <div className="dish-topline">
                  <div>
                    <div className="dish-name">{item.name}</div>
                    <div className="dish-meta">
                      <span className="dish-category">{item.category}</span>
                      <span>•</span>
                      <span>⭐ {item.rating}</span>
                      <span>•</span>
                      <span>{item.prepTime}</span>
                    </div>
                  </div>

                  {item.popular && <span className="dish-popular">Popular</span>}
                </div>

                <p className="dish-description">{item.description}</p>
              </div>

              <div className="dish-side">
                <div className="dish-price">${item.price}</div>

                <div
                  className={`status-badge ${
                    item.available ? "status-available" : "status-unavailable"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.available}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodCatalogPage;