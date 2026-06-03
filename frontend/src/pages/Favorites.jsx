import { useEffect, useState } from 'react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Favorites() {
  const [items, setItems] = useState([])

  const load = async () => {
    const { data } = await api.get('/favorites')
    setItems(data)
  }

  useEffect(() => { load() }, [])

  const remove = async (productId) => {
    await api.delete(`/favorites/${productId}`)
    load()
  }

  return (
    <div>
      <h2 className="mb-4">My Favorites</h2>
      <div className="row g-4">
        {items.map(item => (
          <div className="col-md-6 col-xl-4" key={item.id}>
            <div className="position-relative">
              <ProductCard product={item} />
              <button className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2" onClick={() => remove(item.id)}>Remove</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>No favorite products saved yet.</p>}
      </div>
    </div>
  )
}
