import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products/search")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="hero-overlay">

          <div className="hero-content">

            <span className="hero-tag">
              🚀 Smart Local Product Discovery
            </span>

            <h1>
              Find Products In Nearby
              <br />
              Local Stores Instantly
            </h1>

            <p>
              Compare prices, check stock availability,
              contact stores directly and navigate to the
              nearest seller — all in one place.
            </p>

            <div className="hero-buttons">

              <Link
                to="/products"
                className="btn btn-primary btn-lg"
              >
                Explore Products
              </Link>

              <Link
                to="/register"
                className="btn btn-light btn-lg ms-3"
              >
                Register Store
              </Link>

            </div>

          </div>

        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <section className="products-home-section">
        <div className="container">

          <div className="products-header text-center">

            <span className="products-badge">
              Featured Products
            </span>

            <h2 className="products-title">
              Discover Products Near You
            </h2>

            <p className="products-subtitle">
              Find products from local stores, compare prices,
              check availability and connect directly with sellers.
            </p>

            <div className="products-count">
              {products.length} Products Available
            </div>

          </div>

          <div className="row g-4 mt-4">

            {products.slice(0, 6).map((product) => (
              <div
                className="col-md-6 col-lg-4"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}

          </div>

          <div className="text-center mt-5">
            <Link
              to="/products"
              className="btn btn-primary btn-lg px-5"
            >
              View All Products →
            </Link>
          </div>

        </div>
      </section>


      <section className="why-section">
  <div className="container">

    <div className="section-header text-center">
      <span className="section-badge">Why StockSnap</span>

      <h2>
        A Smarter Way To Find Products
      </h2>

      <p>
        StockSnap connects customers with local stores in real time,
        helping them find products faster and make informed decisions.
      </p>
    </div>

    <div className="row g-4 mt-5">

      <div className="col-lg-4">
        <div className="why-card">
          <div className="why-icon">⚡</div>
          <h4>Instant Search</h4>
          <p>
            Find products across multiple stores within seconds.
          </p>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="why-card">
          <div className="why-icon">📍</div>
          <h4>Nearby Stores</h4>
          <p>
            Discover stores closest to your current location.
          </p>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="why-card">
          <div className="why-icon">💬</div>
          <h4>Direct Contact</h4>
          <p>
            Call or WhatsApp store owners instantly.
          </p>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="why-card">
          <div className="why-icon">💰</div>
          <h4>Compare Prices</h4>
          <p>
            Compare prices before making a purchase.
          </p>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="why-card">
          <div className="why-icon">✅</div>
          <h4>Verified Sellers</h4>
          <p>
            Shop confidently from trusted stores.
          </p>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="why-card">
          <div className="why-icon">🗺️</div>
          <h4>Live Navigation</h4>
          <p>
            Reach the store with one-click directions.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>



<section className="how-section">

  <div className="container">

    <div className="section-header text-center">
      <span className="section-badge">Simple Process</span>

      <h2>How StockSnap Works</h2>

      <p>
        Get your desired product in just a few steps.
      </p>
    </div>

    <div className="timeline">

      <div className="timeline-item">
        <div className="step-number">01</div>
        <h4>Search Product</h4>
        <p>
          Enter the product name you're looking for.
        </p>
      </div>

      <div className="timeline-item">
        <div className="step-number">02</div>
        <h4>Compare Results</h4>
        <p>
          View nearby stores and compare prices.
        </p>
      </div>

      <div className="timeline-item">
        <div className="step-number">03</div>
        <h4>Contact Seller</h4>
        <p>
          Call or WhatsApp the store owner directly.
        </p>
      </div>

      <div className="timeline-item">
        <div className="step-number">04</div>
        <h4>Visit & Buy</h4>
        <p>
          Navigate to the store and purchase instantly.
        </p>
      </div>

    </div>

  </div>

</section>


<section className="cta-premium">

  <div className="container">

    <div className="cta-content">

      <span className="section-badge">
        For Store Owners
      </span>

      <h2>
        Grow Your Business With StockSnap
      </h2>

      <p>
        Reach nearby customers actively searching for your products.
        Increase visibility, generate more sales and expand your
        customer base effortlessly.
      </p>

      <div className="mt-4">
        <button className="btn btn-light btn-lg">
          Register Your Store
        </button>
      </div>

    </div>

  </div>

</section>

    </>
  );
}