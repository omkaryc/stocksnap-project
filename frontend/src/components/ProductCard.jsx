import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPinned, Heart } from 'lucide-react'

export default function ProductCard({ product, onFavorite, showFavoriteButton = false }) {
  var phone = product.contactNumber || ''
  var whatsapp = product.whatsappNumber || product.contactNumber || ''
  var lat = product.latitude
  var lng = product.longitude

  var mapUrl = null
  if (lat && lng) {
    mapUrl = 'https://www.google.com/maps?q=' + lat + ',' + lng
  } else if (product.address || product.area || product.city) {
    var addressQuery = [product.address, product.area, product.city].filter(Boolean).join(', ')
    mapUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(addressQuery)
  }

  var whatsappUrl = whatsapp ? 'https://wa.me/91' + whatsapp.replace(/\D/g, '') : null
  var callUrl = phone ? 'tel:' + phone : null

  return (
    <motion.div
      className="card h-100 card-hover"
      style={{ overflow: 'hidden' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <img
          className="product-image w-100"
          style={{ transition: 'transform 0.4s ease', display: 'block' }}
          src={product.imageUrl || 'https://via.placeholder.com/400x250?text=Product'}
          alt={product.productName}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <span
          className={'badge position-absolute d-flex align-items-center gap-1 ' + (product.available ? 'bg-success' : 'bg-danger')}
          style={{ top: 12, left: 12 }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
          {product.available ? 'In stock' : 'Out of stock'}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{product.productName}</h5>
        <p className="text-muted mb-1 small">{product.brand || 'No brand'}</p>
        <p className="small mb-2" style={{ color: 'var(--ink-soft)' }}>
          {product.storeName} — {product.area}, {product.city}
        </p>

        <p className="mb-1 data-num fs-5 fw-semibold" style={{ color: 'var(--ink)' }}>
          &#8377;{product.price}
        </p>

        <p className="small mb-2" style={{ color: 'var(--muted)' }}>
          {product.categoryName}
        </p>

        {product.openingTime && product.closingTime && (
          <p className="small mb-3" style={{ color: 'var(--muted)' }}>
            Open {product.openingTime}–{product.closingTime}
          </p>
        )}

        <div className="mt-auto d-flex flex-wrap gap-2">
          {callUrl && (
            <a href={callUrl} className="btn btn-outline-success btn-sm d-inline-flex align-items-center gap-1">
              <Phone size={14} /> Call
            </a>
          )}

          {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm d-inline-flex align-items-center gap-1">
              <MessageCircle size={14} /> WhatsApp
            </a>
          )}

          {mapUrl && (
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1">
              <MapPinned size={14} /> Map
            </a>
          )}

          {showFavoriteButton && (
            <button
              className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
              onClick={function () { onFavorite(product.id) }}
            >
              <Heart size={14} /> Save
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
