import { useEffect, useState } from 'react'
import { Store, Phone, Clock, ShieldCheck } from 'lucide-react'
import api from '../services/api'
import Reveal from '../components/Reveal'

export default function Stores() {
  const [stores, setStores] = useState([])

  useEffect(() => {
    api.get('/stores').then(res => setStores(res.data))
  }, [])

  return (
    <div className="container mt-5">
      <Reveal>
        <span className="eyebrow">Local sellers</span>
        <h2 className="mt-3 mb-4">Verified stores</h2>
      </Reveal>

      <div className="row g-4">
        {stores.map((store, i) => (
          <Reveal as="div" delay={Math.min(i, 6) * 0.05} className="col-md-6" key={store.id}>
            <div className="card h-100 card-hover">
              <div className="card-body">
                <div className="d-flex align-items-start gap-3 mb-2">
                  <span
                    style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: 'var(--primary-tint)', color: 'var(--primary-dark)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                  >
                    <Store size={20} />
                  </span>
                  <div>
                    <h5 className="mb-1">{store.storeName}</h5>
                    <span className="badge bg-success d-inline-flex align-items-center gap-1">
                      <ShieldCheck size={12} /> Verified
                    </span>
                  </div>
                </div>
                <p className="mb-1" style={{ color: 'var(--ink-soft)' }}>{store.address}</p>
                <p className="mb-2 small text-muted">{store.area}, {store.city} — {store.pincode}</p>
                <p className="mb-1 small d-flex align-items-center gap-2">
                  <Phone size={14} /> {store.contactNumber}
                </p>
                <p className="mb-0 small d-flex align-items-center gap-2">
                  <Clock size={14} /> {store.openingTime} – {store.closingTime}
                </p>
              </div>
            </div>
          </Reveal>
        ))}

        {stores.length === 0 && <p className="text-muted">No stores found yet.</p>}
      </div>
    </div>
  )
}
