import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../api'

function Listings() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ city: '', type: '', minRent: '', maxRent: '' })

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const params = {}
      if (filters.city) params.city = filters.city
      if (filters.type) params.type = filters.type
      if (filters.minRent) params.minRent = filters.minRent
      if (filters.maxRent) params.maxRent = filters.maxRent
      const { data } = await API.get('/properties', { params })
      setProperties(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProperties() }, [])

  return (
    <div style={{ background: '#080812', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>All Listings</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>Find your perfect room, PG, or flat</p>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px' }}>
          <input
            placeholder="🔍 Search city..."
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', fontSize: '14px', flex: 1, minWidth: '150px' }}
          />
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: '#1a1a2e', color: 'white', outline: 'none', fontSize: '14px' }}
          >
            <option value="">All Types</option>
            <option value="room">Room</option>
            <option value="pg">PG</option>
            <option value="flat">Flat</option>
            <option value="house">House</option>
          </select>
          <input
            placeholder="Min Rent"
            type="number"
            value={filters.minRent}
            onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', fontSize: '14px', width: '110px' }}
          />
          <input
            placeholder="Max Rent"
            type="number"
            value={filters.maxRent}
            onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', fontSize: '14px', width: '110px' }}
          />
          <button
            onClick={fetchProperties}
            style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: '#000', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}
          >
            Search
          </button>
        </div>

        {/* Listings */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.4)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
            <p>Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.4)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏠</div>
            <p>No properties found.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {properties.map((p) => (
              <Link to={"/property/" + p._id} key={p._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseOver={e => e.currentTarget.style.border = '1px solid rgba(74,222,128,0.3)'}
                  onMouseOut={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'}
                >
                  {/* Type Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', border: '1px solid rgba(74,222,128,0.2)' }}>
                      {p.type}
                    </span>
                    {p.available && <span style={{ color: '#4ade80', fontSize: '12px' }}>● Available</span>}
                  </div>

                  <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '18px', fontWeight: '600' }}>{p.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 16px', fontSize: '14px' }}>📍 {p.address}, {p.city}</p>
                  <p style={{ margin: '0 0 16px', fontSize: '24px', fontWeight: '700', background: 'linear-gradient(135deg, #4ade80, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    ₹{p.rent}<span style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(255,255,255,0.4)', WebkitTextFillColor: 'rgba(255,255,255,0.4)' }}>/month</span>
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {p.furnished && <span style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>🛋️ Furnished</span>}
                    {p.wifi && <span style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>📶 WiFi</span>}
                    {p.ac && <span style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>❄️ AC</span>}
                    {p.parking && <span style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>🚗 Parking</span>}
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>👤 {p.owner?.name}</span>
                    <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: '500' }}>View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default Listings