import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (city.trim()) {
      navigate('/listings?city=' + city)
    } else {
      navigate('/listings')
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)', minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>
          Find Your Perfect <span style={{ color: '#4ade80' }}>Room</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#aaa', marginBottom: '40px', maxWidth: '600px' }}>
          Trusted rooms, PGs, and flats — no brokers, no fake listings. For students, job holders, families, and travelers.
        </p>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '10px', maxWidth: '500px', width: '100%' }}>
          <input
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1, padding: '14px 20px', borderRadius: '8px', border: 'none', fontSize: '16px', background: '#2a2a3e', color: 'white', outline: 'none' }}
          />
          <button
            onClick={handleSearch}
            style={{ padding: '14px 28px', background: '#4ade80', color: '#000', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Search
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '40px', marginTop: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { num: '500+', label: 'Listings' },
            { num: '200+', label: 'Verified Owners' },
            { num: '1000+', label: 'Happy Tenants' },
            { num: '0', label: 'Broker Fees' }
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4ade80' }}>{s.num}</div>
              <div style={{ color: '#aaa', fontSize: '14px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '60px 20px', background: '#0d0d1a', textAlign: 'center' }}>
        <h2 style={{ color: 'white', marginBottom: '40px', fontSize: '32px' }}>Why RentalHub?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { icon: '✅', title: 'Verified Listings', desc: 'Every listing is manually verified by our team' },
            { icon: '🚫', title: 'No Brokers', desc: 'Connect directly with owners — zero commission' },
            { icon: '🗺️', title: 'Map View', desc: 'Find properties near you on an interactive map' },
            { icon: '⭐', title: 'Reviews', desc: 'Real reviews from real tenants — no fake ratings' }
          ].map((f) => (
            <div key={f.title} style={{ background: '#1e1e2e', padding: '24px', borderRadius: '12px', border: '1px solid #2a2a3e' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ color: 'white', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: '#aaa', fontSize: '14px' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '60px 20px', background: '#1a1a2e', textAlign: 'center' }}>
        <h2 style={{ color: 'white', marginBottom: '16px' }}>Are you a property owner?</h2>
        <p style={{ color: '#aaa', marginBottom: '24px' }}>List your property for free and reach thousands of tenants</p>
        <a href="/add-property" style={{ padding: '14px 32px', background: '#4ade80', color: '#000', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '16px' }}>
          List Your Property
        </a>
      </div>
    </div>
  )
}
export default Home