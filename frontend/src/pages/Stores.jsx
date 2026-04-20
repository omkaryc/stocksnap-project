import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Stores() {
  const [stores, setStores] = useState([])

  useEffect(() => {
    api.get('/stores').then(res => setStores(res.data))
  }, [])

  return (
    <div>
      <h2 className="mb-4">Verified Stores</h2>
      <div className="row g-4">
        {stores.map(store => (
          <div className="col-md-6" key={store.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5>{store.storeName}</h5>
                <p className="mb-1">{store.address}</p>
                <p className="mb-1">{store.area}, {store.city} - {store.pincode}</p>
                <p className="mb-1">Contact: {store.contactNumber}</p>
                <p className="mb-1">Time: {store.openingTime} - {store.closingTime}</p>
                <span className="badge bg-success">Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
