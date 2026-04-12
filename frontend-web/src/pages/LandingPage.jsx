import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className="hero">
        <h2>Fast delivery for your favorite meals</h2>
        <p>
          Discover curated dishes, add them to your cart, and track every order
          from checkout to doorstep.
        </p>
        <div className="hero-actions">
          <Link to="/catalog">
            <button className="primary-btn">Explore Menu</button>
          </Link>
          <Link to="/tracking">
            <button className="secondary-btn">Track Delivery</button>
          </Link>
        </div>
      </div>

      <h3 className="section-title">Top cuisines</h3>
      <div className="card-grid">
        <div className="card">
          <img src="/images/dishes/american.jpg" alt="American food" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12 }} />
          <h4>American Classics</h4>
          <p>Burgers, fries, comfort food, and quick favorites.</p>
        </div>
        <div className="card">
          <img src="/images/dishes/asian.jpg" alt="Asian food" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12 }} />
          <h4>Asian Specials</h4>
          <p>Ramen, bowls, sushi, and bold modern flavors.</p>
        </div>
        <div className="card">
          <img src="/images/dishes/mexican.jpg" alt="Mexican food" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12 }} />
          <h4>Mexican Favorites</h4>
          <p>Tacos, burritos, quesadillas, and fresh sides.</p>
        </div>
        <div className="card">
          <img src="/images/dishes/italian.jpg" alt="Italian food" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12 }} />
          <h4>Italian Kitchen</h4>
          <p>Pasta, lasagna, parmesan dishes, and house sauces.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;