import { useEffect, useState } from 'react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import { useAuth } from '../context/AuthContext'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({ q: '', category: '', brand: '', city: '', inStock: false })
  const { user } = useAuth()

  const load = async () => {
    const params = {}
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== false) params[key] = value
    })
    const { data } = await api.get('/products/search', { params })
    setProducts(data)
  }

  useEffect(() => {
    load()
    api.get('/categories').then(res => setCategories(res.data))
  }, [])

  const addFavorite = async (productId) => {
    try {
      await api.post(`/favorites/${productId}`)
      alert('Added to favorites')
    } catch (err) {
      alert(err.response?.data?.message || 'Could not add to favorites')
    }
  }

  return (
    <div className="row g-4">
      <div className="col-lg-3">
        <div className="card shadow-sm sidebar-card">
          <div className="card-body">
            <h5>Search Filters</h5>
            <input className="form-control mb-2" placeholder="Search product" value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})} />
            <select className="form-select mb-2" value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})}>
              <option value="">All categories</option>
              {categories.map(c => <option key={c.id} value={c.categoryName}>{c.categoryName}</option>)}
            </select>
            <input className="form-control mb-2" placeholder="Brand" value={filters.brand} onChange={e=>setFilters({...filters,brand:e.target.value})} />
            <input className="form-control mb-2" placeholder="City" value={filters.city} onChange={e=>setFilters({...filters,city:e.target.value})} />
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" checked={filters.inStock} onChange={e=>setFilters({...filters,inStock:e.target.checked})} id="instock" />
              <label className="form-check-label" htmlFor="instock">In stock only</label>
            </div>
            <button className="btn btn-primary w-100" onClick={load}>Apply</button>
          </div>
        </div>
      </div>
      <div className="col-lg-9">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Products</h2>
          <span className="text-muted">{products.length} item(s)</span>
        </div>
        <div className="row g-4">
          {products.map(product => (
            <div className="col-md-6 col-xl-4" key={product.id}>
              <ProductCard product={product} onFavorite={addFavorite} showFavoriteButton={user?.role === 'CUSTOMER'} />
            </div>
          ))}
          {products.length === 0 && <p>No products found.</p>}
        </div>
      </div>
    </div>
  )
}
