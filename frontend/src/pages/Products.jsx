import { useEffect, useState } from 'react'
import { LocateFixed, MapPin } from 'lucide-react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { useAuth } from '../context/AuthContext'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [locationMessage, setLocationMessage] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const { user } = useAuth()

  const [filters, setFilters] = useState({
    q: '',
    category: '',
    brand: '',
    city: '',
    inStock: false,
    radiusKm: '',
    latitude: '',
    longitude: ''
  })

  const load = async () => {
    try {
      const params = {}

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== false && value !== null) {
          params[key] = value
        }
      })

      const { data } = await api.get('/products/search', { params })
      setProducts(data)
    } catch (error) {
      console.error(error)
      alert('Failed to load products')
    }
  }

  useEffect(() => {
    load()

    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage('Geolocation is not supported by your browser')
      return
    }

    setLocationMessage('Getting your location...')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        setFilters(prev => ({
          ...prev,
          latitude: lat,
          longitude: lng
        }))

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          )

          const data = await response.json()
          const address = data.address || {}

          setUserLocation({
            area:
              address.suburb ||
              address.neighbourhood ||
              address.village ||
              address.town ||
              address.hamlet ||
              '',
            city:
              address.city ||
              address.county ||
              address.town ||
              '',
            state: address.state || '',
            country: address.country || '',
            fullAddress: data.display_name || ''
          })

          setLocationMessage('Location added successfully')
        } catch (error) {
          console.error(error)
          setLocationMessage('Location added, but address not found')
        }
      },
      (error) => {
        console.error(error)
        setLocationMessage('Location permission denied')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  const clearFilters = () => {
    setFilters({
      q: '',
      category: '',
      brand: '',
      city: '',
      inStock: false,
      radiusKm: '',
      latitude: '',
      longitude: ''
    })

    setLocationMessage('')
    setUserLocation(null)
  }

  const addFavorite = async (productId) => {
    try {
      await api.post(`/favorites/${productId}`)
      alert('Added to favorites')
    } catch (err) {
      alert(err.response?.data?.message || 'Could not add to favorites')
    }
  }

  return (
    <div className="container mt-5">
    <div className="row g-4">
      <Reveal as="div" className="col-lg-3">
        <div className="card sidebar-card">
          <div className="card-body">
            <h5 className="mb-3">Search products</h5>

            <label className="form-label small">Product name</label>
            <input
              className="form-control mb-2"
              placeholder="e.g. milk, atta, charger"
              value={filters.q}
              onChange={e => setFilters({ ...filters, q: e.target.value })}
            />

            <label className="form-label small">Category</label>
            <select
              className="form-select mb-2"
              value={filters.category}
              onChange={e => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.categoryName}>
                  {c.categoryName}
                </option>
              ))}
            </select>

            <label className="form-label small">Brand</label>
            <input
              className="form-control mb-2"
              placeholder="e.g. Amul, Apple, Samsung"
              value={filters.brand}
              onChange={e => setFilters({ ...filters, brand: e.target.value })}
            />

            <label className="form-label small">City</label>
            <input
              className="form-control mb-2"
              placeholder="e.g. Pune, Satara"
              value={filters.city}
              onChange={e => setFilters({ ...filters, city: e.target.value })}
            />

            {/* <button 
              type="button"
              className="btn btn-outline-primary w-100 mb-2 d-inline-flex align-items-center justify-content-center gap-2"
              onClick={handleUseMyLocation}
            >
              <LocateFixed size={16} /> Use my location
            </button> */}

            {/* {locationMessage && (
              <div className="small text-muted mb-2">
                {locationMessage}
              </div>
            )}

            {userLocation && (
              <div
                className="p-3 mt-2 mb-3 border rounded"
                style={{
                  backgroundColor: '#f8f9fa',
                  fontSize: '14px'
                }}
              >
                <div className="fw-bold text-success mb-2 d-flex align-items-center gap-1">
                  <MapPin size={15} /> Your current location
                </div>

                <div>
                  <strong>Area:</strong> {userLocation.area || 'N/A'}
                </div>

                <div>
                  <strong>City:</strong> {userLocation.city || 'N/A'}
                </div>

                <div>
                  <strong>State:</strong> {userLocation.state || 'N/A'}
                </div>

                <div>
                  <strong>Country:</strong> {userLocation.country || 'N/A'}
                </div>

                <div className="mt-2 text-muted">
                  {userLocation.fullAddress}
                </div>

                <div className="mt-2">
                  <strong>Latitude:</strong> {filters.latitude}
                  <br />
                  <strong>Longitude:</strong> {filters.longitude}
                </div>
              </div>
            )} */}

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={filters.inStock}
                onChange={e => setFilters({ ...filters, inStock: e.target.checked })}
                id="instock"
              />
              <label className="form-check-label" htmlFor="instock">
                In stock only
              </label>
            </div>

            <button className="btn btn-primary w-100 mb-2" onClick={load}>
              Apply filters
            </button>

            <button className="btn btn-info w-100" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        </div>
      </Reveal>

      <div className="col-lg-9">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Products</h2>
          <span className="text-muted data-num small">{products.length} item(s)</span>
        </div>

        <div className="row g-4">
          {products.map((product, i) => (
            <Reveal as="div" delay={Math.min(i, 6) * 0.04} className="col-md-6 col-xl-4" key={product.id}>
              <ProductCard
                product={product}
                onFavorite={addFavorite}
                showFavoriteButton={user?.role === 'CUSTOMER'}
              />
            </Reveal>
          ))}

          {products.length === 0 && (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>

    </div>
  )
}