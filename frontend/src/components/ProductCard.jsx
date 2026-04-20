export default function ProductCard({ product, onFavorite, showFavoriteButton = false }) {
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
        <p className="small mb-2">{product.storeName} • {product.area}, {product.city}</p>
        <p className="mb-1"><strong>₹{product.price}</strong></p>
        <p className="small mb-2">Category: {product.categoryName}</p>
        <span className={`badge ${product.available ? 'bg-success' : 'bg-danger'} mb-3`}>{product.available ? 'In Stock' : 'Out of Stock'}</span>
        <div className="mt-auto d-flex gap-2">
          {showFavoriteButton && <button className="btn btn-outline-primary btn-sm" onClick={() => onFavorite(product.id)}>Save</button>}
        </div>
      </div>
    </div>
  )
}
