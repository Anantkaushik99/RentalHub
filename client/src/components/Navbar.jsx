import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '16px', background: '#1a1a2e' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🏠 RentalHub</Link>
      <Link to="/listings" style={{ color: 'white', textDecoration: 'none' }}>Listings</Link>
      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
      <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
    </nav>
  )
}
export default Navbar