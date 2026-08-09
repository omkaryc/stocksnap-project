import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Reveal from '../components/Reveal'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'CUSTOMER' })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <Reveal as="div" className="col-md-5">
          <div className="card">
            <div className="card-body p-4">
              <div
                style={{
                  width: 46, height: 46, borderRadius: 14,
                  background: 'var(--accent-tint)', color: 'var(--accent-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}
              >
                <UserPlus size={22} />
              </div>
              <h2 className="mb-1">Create your account</h2>
              <p className="text-muted small mb-4">Join StockSnap as a shopper or a store owner.</p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={submit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input className="form-control" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">I am a</label>
                    <select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                      <option value="CUSTOMER">Customer</option>
                      <option value="STORE_OWNER">Store owner</option>
                    </select>
                  </div>
                </div>
                <button className="btn btn-primary w-100 mt-4">Create account</button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
