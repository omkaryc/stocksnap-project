import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">StockSnap</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="nav">
          <div className="navbar-nav me-auto">
            <NavLink className="nav-link" to="/products">Products</NavLink>
            <NavLink className="nav-link" to="/stores">Stores</NavLink>
            {user?.role === 'CUSTOMER' && <NavLink className="nav-link" to="/favorites">Favorites</NavLink>}
            {user && <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>}
          </div>
          <div className="d-flex gap-2">
            {user ? (
              <>
                <span className="navbar-text">Hi, {user.name}</span>
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
