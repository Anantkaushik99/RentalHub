import { useState, useEffect } from 'react'
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
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <h2>All Listings</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          placeholder="Search city..."
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
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
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', width: '100px' }}
        />
        <input
          placeholder="Max Rent"
          type="number"
          value={filters.maxRent}
          onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', width: '100px' }}
        />
        <button
          onClick={fetchProperties}
          style={{ padding: '8px 16px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Search
        </button>
      </div>

      {/* Listings */}
      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {properties.map((p) => (
            <div key={p._id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '16px', background: '#1e1e2e' }}>
              <h3 style={{ margin: '0 0 8px' }}>{p.title}</h3>
              <p style={{ margin: '0 0 4px', color: '#aaa' }}>{p.address}, {p.city}</p>
              <p style={{ margin: '0 0 8px', fontSize: '20px', color: '#4ade80' }}>₹{p.rent}/month</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ background: '#2a2a3e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{p.type}</span>
                {p.furnished && <span style={{ background: '#2a2a3e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Furnished</span>}
                {p.wifi && <span style={{ background: '##2a2a3e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>WiFi</span>}
                {p.ac && <span style={{ background: '#2a2a3e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>AC</span>}
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#888' }}>Owner: {p.owner?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Listings