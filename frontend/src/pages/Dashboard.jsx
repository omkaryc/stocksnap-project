import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const emptyStore = { storeName: '', address: '', city: '', area: '', pincode: '', contactNumber: '', openingTime: '', closingTime: '' }
const emptyProduct = { productName: '', brand: '', description: '', categoryId: '', price: '', stockQuantity: '', imageUrl: '' }

export default function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [store, setStore] = useState(emptyStore)
  const [myStore, setMyStore] = useState(null)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productForm, setProductForm] = useState(emptyProduct)
  const [adminStores, setAdminStores] = useState([])
  const [adminUsers, setAdminUsers] = useState([])

  const loadProfile = async () => {
    const { data } = await api.get('/auth/profile')
    setProfile(data)
  }

  const loadOwnerData = async () => {
    try {
      const storeRes = await api.get('/stores/my')
      setMyStore(storeRes.data)
      setStore(storeRes.data)
      const productRes = await api.get(`/products/store/${storeRes.data.id}`)
      setProducts(productRes.data)
    } catch {
      setMyStore(null)
    }
    const categoryRes = await api.get('/categories')
    setCategories(categoryRes.data)
  }

  const loadAdminData = async () => {
    const [storesRes, usersRes] = await Promise.all([api.get('/admin/stores'), api.get('/admin/users')])
    setAdminStores(storesRes.data)
    setAdminUsers(usersRes.data)
  }

  useEffect(() => {
    loadProfile()
    if (user?.role === 'STORE_OWNER') loadOwnerData()
    if (user?.role === 'ADMIN') loadAdminData()
  }, [user])

  const saveStore = async (e) => {
    e.preventDefault()
    if (myStore) await api.put(`/stores/${myStore.id}`, store)
    else await api.post('/stores', store)
    await loadOwnerData()
    alert('Store saved successfully')
  }

  const addProduct = async (e) => {
    e.preventDefault()
    await api.post('/products', { ...productForm, categoryId: Number(productForm.categoryId), price: Number(productForm.price), stockQuantity: Number(productForm.stockQuantity) })
    setProductForm(emptyProduct)
    await loadOwnerData()
    alert('Product added successfully')
  }

  const updateStock = async (id, current) => {
    const next = prompt('Enter new stock quantity', current)
    if (next === null) return
    await api.put(`/products/${id}/stock`, { stockQuantity: Number(next) })
    loadOwnerData()
  }

  const verifyStore = async (id) => {
    await api.put(`/admin/stores/${id}/verify`)
    loadAdminData()
  }

  const disableUser = async (id) => {
    await api.put(`/admin/users/${id}/disable`)
    loadAdminData()
  }

  return (
    <div>
      <h2 className="mb-3">Dashboard</h2>
      {profile && <div className="alert alert-light border">Logged in as <strong>{profile.name}</strong> ({profile.role})</div>}

      {user?.role === 'CUSTOMER' && (
        <div className="card shadow-sm"><div className="card-body"><h4>Customer Dashboard</h4><p>You can search products, compare stores, and save favorites.</p></div></div>
      )}

      {user?.role === 'STORE_OWNER' && (
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card shadow-sm mb-4"><div className="card-body">
              <h4>{myStore ? 'Update Store' : 'Create Store'}</h4>
              <form onSubmit={saveStore} className="row g-2">
                {Object.keys(emptyStore).map(key => (
                  <div className="col-12" key={key}>
                    <input className="form-control" placeholder={key} value={store[key] || ''} onChange={e=>setStore({...store,[key]:e.target.value})} />
                  </div>
                ))}
                <button className="btn btn-primary mt-2">Save Store</button>
              </form>
              {myStore && <p className="mt-3 mb-0">Verification: <span className={`badge ${myStore.verified ? 'bg-success' : 'bg-warning text-dark'}`}>{myStore.verified ? 'Verified' : 'Pending'}</span></p>}
            </div></div>

            <div className="card shadow-sm"><div className="card-body">
              <h4>Add Product</h4>
              <form onSubmit={addProduct} className="row g-2">
                <div className="col-12"><input className="form-control" placeholder="Product name" value={productForm.productName} onChange={e=>setProductForm({...productForm,productName:e.target.value})} /></div>
                <div className="col-12"><input className="form-control" placeholder="Brand" value={productForm.brand} onChange={e=>setProductForm({...productForm,brand:e.target.value})} /></div>
                <div className="col-12"><textarea className="form-control" placeholder="Description" value={productForm.description} onChange={e=>setProductForm({...productForm,description:e.target.value})} /></div>
                <div className="col-12"><select className="form-select" value={productForm.categoryId} onChange={e=>setProductForm({...productForm,categoryId:e.target.value})}><option value="">Select category</option>{categories.map(c => <option key={c.id} value={c.id}>{c.categoryName}</option>)}</select></div>
                <div className="col-md-6"><input className="form-control" placeholder="Price" value={productForm.price} onChange={e=>setProductForm({...productForm,price:e.target.value})} /></div>
                <div className="col-md-6"><input className="form-control" placeholder="Stock" value={productForm.stockQuantity} onChange={e=>setProductForm({...productForm,stockQuantity:e.target.value})} /></div>
                <div className="col-12"><input className="form-control" placeholder="Image URL" value={productForm.imageUrl} onChange={e=>setProductForm({...productForm,imageUrl:e.target.value})} /></div>
                <button className="btn btn-success mt-2" disabled={!myStore}>Add Product</button>
              </form>
            </div></div>
          </div>

          <div className="col-lg-7">
            <div className="card shadow-sm"><div className="card-body">
              <h4>My Products</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>{p.productName}</td>
                        <td>₹{p.price}</td>
                        <td>{p.stockQuantity}</td>
                        <td><span className={`badge ${p.available ? 'bg-success' : 'bg-danger'}`}>{p.available ? 'In Stock' : 'Out of Stock'}</span></td>
                        <td><button className="btn btn-outline-primary btn-sm" onClick={() => updateStock(p.id, p.stockQuantity)}>Update Stock</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div></div>
          </div>
        </div>
      )}

      {user?.role === 'ADMIN' && (
        <div className="row g-4">
          <div className="col-lg-6"><div className="card shadow-sm"><div className="card-body">
            <h4>Stores</h4>
            <table className="table">
              <thead><tr><th>Name</th><th>Owner</th><th>Status</th><th></th></tr></thead>
              <tbody>{adminStores.map(s => <tr key={s.id}><td>{s.storeName}</td><td>{s.owner?.name}</td><td>{s.verified ? 'Verified' : 'Pending'}</td><td>{!s.verified && <button className="btn btn-sm btn-success" onClick={() => verifyStore(s.id)}>Verify</button>}</td></tr>)}</tbody>
            </table>
          </div></div></div>
          <div className="col-lg-6"><div className="card shadow-sm"><div className="card-body">
            <h4>Users</h4>
            <table className="table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th></th></tr></thead>
              <tbody>{adminUsers.map(u => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.enabled ? <button className="btn btn-sm btn-outline-danger" onClick={() => disableUser(u.id)}>Disable</button> : <span className="badge bg-secondary">Disabled</span>}</td></tr>)}</tbody>
            </table>
          </div></div></div>
        </div>
      )}
    </div>
  )
}
