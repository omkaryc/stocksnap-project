import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'

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
    <div className="container mt-5">
      <Reveal>
        <span className="eyebrow">Saved for later</span>
        <h2 className="mt-3 mb-4">My favorites</h2>
      </Reveal>

      <div className="row g-4">
        {items.map((item, i) => (
          <Reveal as="div" delay={Math.min(i, 6) * 0.05} className="col-md-6 col-xl-4" key={item.id}>
            <div className="position-relative h-100">
              <ProductCard product={item} />
              <button
                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 d-inline-flex align-items-center justify-content-center"
                style={{ width: 30, height: 30, padding: 0, borderRadius: '50%' }}
                onClick={() => remove(item.id)}
                aria-label="Remove from favorites"
              >
                <X size={15} />
              </button>
            </div>
          </Reveal>
        ))}
        {items.length === 0 && <p className="text-muted">No favorite products saved yet.</p>}
      </div>
    </div>
  )
}
