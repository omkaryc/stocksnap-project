import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="mb-4">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={submit}>
              <div className="row g-3">
                <div className="col-md-6"><label className="form-label">Name</label><input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                <div className="col-md-6"><label className="form-label">Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
                <div className="col-md-6"><label className="form-label">Email</label><input className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
                <div className="col-md-6"><label className="form-label">Password</label><input type="password" className="form-control" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></div>
                <div className="col-12"><label className="form-label">Role</label><select className="form-select" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="CUSTOMER">Customer</option><option value="STORE_OWNER">Store Owner</option></select></div>
              </div>
              <button className="btn btn-primary w-100 mt-4">Create account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
