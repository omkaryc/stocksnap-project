import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Zap, MapPin, MessageCircle, Tag, ShieldCheck, Navigation,
} from "lucide-react";
import "./Home.css";

import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";

const WHY = [
  { icon: Zap, title: "Instant search", text: "Find products across multiple stores within seconds." },
  { icon: MapPin, title: "Nearby stores", text: "Discover stores closest to your current location." },
  { icon: MessageCircle, title: "Direct contact", text: "Call or WhatsApp store owners instantly." },
  { icon: Tag, title: "Compare prices", text: "Compare prices before making a purchase." },
  { icon: ShieldCheck, title: "Verified sellers", text: "Shop confidently from trusted stores." },
  { icon: Navigation, title: "Live navigation", text: "Reach the store with one-click directions." },
];

const STEPS = [
  { n: "01", title: "Search product", text: "Enter the product name you're looking for." },
  { n: "02", title: "Compare results", text: "View nearby stores and compare prices." },
  { n: "03", title: "Contact seller", text: "Call or WhatsApp the store owner directly." },
  { n: "04", title: "Visit & buy", text: "Navigate to the store and purchase instantly." },
];

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
        <div className="container">
          <div className="hero-grid">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero-tag">
                <Zap size={14} /> Smart local product discovery
              </span>

              <h1>
                Find products in nearby
                <br />
                <em>local stores</em> instantly
              </h1>

              <p>
                Compare prices, check stock availability, contact stores
                directly and navigate to the nearest seller — all in one place.
              </p>

              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary btn-lg">
                  Explore products
                </Link>
                <Link to="/register" className="btn btn-light btn-lg">
                  Register store
                </Link>
              </div>

              <div className="hero-stats">
                <div>
                  <div className="stat-num">{products.length || "—"}</div>
                  <div className="stat-label">Products live</div>
                </div>
                <div>
                  <div className="stat-num">24/7</div>
                  <div className="stat-label">Store lookup</div>
                </div>
                <div>
                  <div className="stat-num">1-tap</div>
                  <div className="stat-label">Contact seller</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="radar-wrap">
                <div className="radar-ring" />
                <div className="radar-ring r2" />
                <div className="radar-ring r3" />
                <div className="radar-pin">
                  <MapPin size={26} strokeWidth={2.2} />
                </div>
              </div>

              <div className="hero-chip c1">
                <span className="dot" /> Amul milk <span className="dist">0.4 km</span>
              </div>
              <div className="hero-chip c2">
                <span className="dot" /> Phone charger <span className="dist">1.1 km</span>
              </div>
              <div className="hero-chip c3">
                <span className="dot" /> Basmati rice <span className="dist">0.8 km</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <section className="products-home-section">
        <div className="container">
          <Reveal className="products-header text-center">
            <span className="eyebrow">Featured products</span>
            <h2 className="products-title">Discover products near you</h2>
            <p className="products-subtitle">
              Find products from local stores, compare prices, check
              availability and connect directly with sellers.
            </p>
            <div className="products-count">{products.length} products available</div>
          </Reveal>

          <div className="row g-4 mt-4">
            {products.slice(0, 6).map((product, i) => (
              <Reveal as="div" delay={i * 0.05} className="col-md-6 col-lg-4" key={product.id}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-5">
            <Link to="/products" className="btn btn-primary btn-lg px-5">
              View all products &rarr;
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="why-section">
        <div className="container">
          <Reveal className="section-header text-center">
            <span className="eyebrow">Why StockSnap</span>
            <h2>A smarter way to find products</h2>
            <p>
              StockSnap connects customers with local stores in real time,
              helping them find products faster and make informed decisions.
            </p>
          </Reveal>

          <div className="row g-4 mt-5">
            {WHY.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal as="div" delay={i * 0.06} className="col-lg-4 col-md-6" key={item.title}>
                  <div className="why-card">
                    <div className="why-icon"><Icon size={24} /></div>
                    <h4>{item.title}</h4>
                    <p className="mb-0" style={{ color: "var(--muted)" }}>{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container">
          <Reveal className="section-header text-center">
            <span className="eyebrow">Simple process</span>
            <h2>How StockSnap works</h2>
            <p>Get your desired product in just a few steps.</p>
          </Reveal>

          <div className="timeline">
            {STEPS.map((step, i) => (
              <Reveal as="div" delay={i * 0.08} className="timeline-item" key={step.n}>
                <div className="step-number data-num">{step.n}</div>
                <h4>{step.title}</h4>
                <p style={{ color: "var(--muted)" }}>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-premium">
        <div className="container">
          <Reveal className="cta-content">
            <span className="eyebrow">For store owners</span>
            <h2>Grow your business with StockSnap</h2>
            <p>
              Reach nearby customers actively searching for your products.
              Increase visibility, generate more sales and expand your
              customer base effortlessly.
            </p>
            <div className="mt-4">
              <Link to="/register" className="btn btn-light btn-lg">
                Register your store
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
