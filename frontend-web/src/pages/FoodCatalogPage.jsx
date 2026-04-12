import { useEffect, useMemo, useState } from "react";
import { getAllMenuItems } from "../api/menuApi";
import { addToCart } from "../utils/cartUtils";

function FoodCatalogPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const loadMenuItems = async () => {
    try {
      const data = await getAllMenuItems();
      const backendItems = Array.isArray(data) ? data : [];

      const enriched = backendItems
        .filter(
          (item) =>
            item.name &&
            item.category &&
            item.description
        )
        .map((item) => {
          const lowerCategory = (item.category || "").toLowerCase();

          let image = "/images/dishes/american.jpg";
          let rating = 4.5;
          let prepTime = "15-20 min";
          let popular = false;

          if (lowerCategory === "asian") {
            image = "/images/dishes/asian.jpg";
            rating = 4.7;
            prepTime = "20-25 min";
          } else if (lowerCategory === "mexican") {
            image = "/images/dishes/mexican.jpg";
            rating = 4.6;
            prepTime = "18-22 min";
          } else if (lowerCategory === "italian") {
            image = "/images/dishes/italian.jpg";
            rating = 4.7;
            prepTime = "22-28 min";
          }

          if (
            item.name === "Cheeseburger" ||
            item.name === "Pork Ramen" ||
            item.name === "Chicken Tacos" ||
            item.name === "Spaghetti & Meatballs"
          ) {
            popular = true;
          }

          return {
            ...item,
            image,
            rating,
            prepTime,
            popular,
          };
        });

      setMenuItems(enriched);
    } catch (error) {
      console.error("Menu load error:", error);
      setMessage("Failed to load menu items.");
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
                src={item.image}
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