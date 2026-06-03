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
    <div className="card h-100 shadow-sm card-hover">
      <img
        className="card-img-top product-image"
        src={product.imageUrl || 'https://via.placeholder.com/400x250?text=Product'}
        alt={product.productName}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.productName}</h5>
        <p className="text-muted mb-1">{product.brand || 'No brand'}</p>
        <p className="small mb-2">{product.storeName} - {product.area}, {product.city}</p>
        <p className="mb-1"><strong>Rs.{product.price}</strong></p>
        <p className="small mb-2">Category: {product.categoryName}</p>

        {product.openingTime && product.closingTime && (
          <p className="small mb-2 text-muted">
            Open: {product.openingTime} to {product.closingTime}
          </p>
        )}

        <span className={'badge mb-3 ' + (product.available ? 'bg-success' : 'bg-danger')}>
          {product.available ? 'In Stock' : 'Out of Stock'}
        </span>

        <div className="mt-auto d-flex flex-wrap gap-2">

          {callUrl && (
            <a href={callUrl} className="btn btn-outline-success btn-sm">
              Call {phone}
            </a>
          )}

          {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm">
              WhatsApp
            </a>
          )}

          {mapUrl && (
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
              View on Map
            </a>
          )}

          {showFavoriteButton && (
            <button className="btn btn-outline-secondary btn-sm" onClick={function() { onFavorite(product.id) }}>
              Save
            </button>
          )}

        </div>
      </div>
    </div>
  )
}