import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="site-footer mt-5 pt-5 pb-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span
                style={{
                  width: 30, height: 30, borderRadius: 9,
                  background: 'rgba(255,255,255,0.12)', color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <MapPin size={17} strokeWidth={2.4} />
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>
                StockSnap
              </span>
            </div>
            <p className="small mb-0" style={{ maxWidth: 320 }}>
              Find products in nearby local stores, compare prices, and
              contact sellers directly — all in one place.
            </p>
          </div>

          <div className="col-lg-2 col-6">
            <h6 className="mb-3">Explore</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/stores">Stores</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-6">
            <h6 className="mb-3">Account</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h6 className="mb-3">Get in touch</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li className="d-flex align-items-center gap-2">
                <Mail size={14} /> support@stocksnap.app
              </li>
              <li className="d-flex align-items-center gap-2">
                <Phone size={14} /> +91 98765 43210
              </li>
            </ul>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.12)' }} className="my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <small>&copy; {new Date().getFullYear()} StockSnap. All rights reserved.</small>
          <small>Built with React + Spring Boot</small>
        </div>
      </div>
    </footer>
  )
}
