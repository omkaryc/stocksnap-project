import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '')

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        borderBottom: '1px solid var(--line)',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        paddingTop: scrolled ? '0.5rem' : '0.9rem',
        paddingBottom: scrolled ? '0.5rem' : '0.9rem',
      }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span
            style={{
              width: 30, height: 30, borderRadius: 9,
              background: 'var(--ink)', color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <MapPin size={17} strokeWidth={2.4} />
          </span>
          StockSnap
        </Link>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <div className="navbar-nav me-auto">
            <NavLink className={linkClass} to="/products">Products</NavLink>
            <NavLink className={linkClass} to="/stores">Stores</NavLink>
            {user?.role === 'CUSTOMER' && <NavLink className={linkClass} to="/favorites">Favorites</NavLink>}
            {user && <NavLink className={linkClass} to="/dashboard">Dashboard</NavLink>}
          </div>
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <span className="navbar-text small" style={{ color: 'var(--ink-soft)' }}>
                  Hi, {user.name}
                </span>
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-primary btn-sm" to="/login">Login</Link>
                <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
