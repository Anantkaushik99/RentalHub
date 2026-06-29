import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      height: '64px',
      background: 'rgba(10, 10, 20, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 30px rgba(0,0,0,0.3)'
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px' }}>🏠</span>
        <span style={{ color: 'white', fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px' }}>
          Rental<span style={{ color: '#4ade80' }}>Hub</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '40px' }}>
        <Link to="/listings" style={{
          color: 'rgba(255,255,255,0.7)',
          textDecoration: 'none',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
          onMouseOver={e => e.target.style.color = 'white'}
          onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
        >
          Listings
        </Link>
        <Link to="/add-property" style={{
          color: '#4ade80',
          textDecoration: 'none',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          border: '1px solid rgba(74,222,128,0.3)',
          transition: 'all 0.2s'
        }}>
          + Add Property
        </Link>
      </div>

      {/* Auth Buttons */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user ? (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '700',
                color: '#000'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span style={{ color: 'white', fontSize: '14px' }}>{user.name}</span>
            </div>
            <button onClick={handleLogout} style={{
              padding: '8px 16px',
              background: 'rgba(239,68,68,0.15)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              padding: '8px 20px',
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              color: '#000',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
export default Navbar