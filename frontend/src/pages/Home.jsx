import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="hero p-5 mb-5 shadow">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h1 className="display-5 fw-bold">Find products in nearby local stores</h1>
            <p className="lead mt-3">Search products, compare prices, check availability, and support local businesses with StockSnap.</p>
            <div className="d-flex gap-2 mt-3">
              <Link className="btn btn-light btn-lg" to="/products">Explore Products</Link>
              <Link className="btn btn-outline-light btn-lg" to="/register">Register Your Store</Link>
            </div>
          </div>
          <div className="col-lg-5 mt-4 mt-lg-0">
            <div className="bg-white text-dark rounded-4 p-4 shadow-sm">
              <h4>How it works</h4>
              <ol className="mb-0">
                <li>Search product</li>
                <li>Compare nearby stores</li>
                <li>Visit and buy offline</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4">
        {[
          ['Real-time availability', 'Know whether the product is in stock before you visit the shop.'],
          ['Price comparison', 'Compare the same product across different local stores.'],
          ['Trusted local sellers', 'Admin can verify stores to improve reliability.'],
        ].map(([title, text]) => (
          <div className="col-md-4" key={title}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5>{title}</h5>
                <p className="mb-0">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
