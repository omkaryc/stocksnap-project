import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
    <div className="row justify-content-center mt-5">
      <div className="col-md-4 ">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={submit}>
              <div className="mb-3"><label className="form-label">Email</label><input className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
              <div className="mb-3"><label className="form-label">Password</label><input type="password" className="form-control" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></div>
              <button className="btn btn-primary w-100 mb-3">Login</button>
            </form>
          
          </div>
        </div>
      </div>
    </div>
  )
}
