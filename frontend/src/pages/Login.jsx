import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Reveal from '../components/Reveal'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <Reveal as="div" className="col-md-4">
          <div className="card">
            <div className="card-body p-4">
              <div
                style={{
                  width: 46, height: 46, borderRadius: 14,
                  background: 'var(--primary-tint)', color: 'var(--primary-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}
              >
                <LogIn size={22} />
              </div>
              <h2 className="mb-1">Welcome back</h2>
              <p className="text-muted small mb-4">Log in to manage your store or favorites.</p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                </div>
                <button className="btn btn-primary w-100 mb-1">Login</button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
