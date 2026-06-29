import { useState } from 'react'
import API from '../api'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await API.post('/auth/login', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#080812', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '40px' }}>🏠</span>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginTop: '12px' }}>Welcome Back</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>Login to your RentalHub account</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#ef4444', fontSize: '14px' }}>
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block' }}>EMAIL</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  style={{ width: '100%', padding: '12px 48px 12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: '#000', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginTop: '24px', fontSize: '14px' }}>
            Don't have an account? <Link to="/register" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: '600' }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login