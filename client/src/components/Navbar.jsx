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
    <nav style={{ display: 'flex', gap: '20px', padding: '16px 32px', background: '#1a1a2e', alignItems: 'center', flexWrap: 'wrap' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>🏠 RentalHub</Link>
      <Link to="/listings" style={{ color: 'white', textDecoration: 'none' }}>Listings</Link>
      <Link to="/add-property" style={{ color: '#4ade80', textDecoration: 'none' }}>+ Add Property</Link>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: '#aaa', fontSize: '14px' }}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ padding: '8px 16px', background: '#4ade80', color: '#000', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
export default Navbar