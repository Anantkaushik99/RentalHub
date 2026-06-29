import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate('/listings' + (city.trim() ? '?city=' + city : ''))
  }

  return (
    <div style={{ background: '#080812', minHeight: '100vh', color: 'white' }}>

      {/* Hero Section */}
      <div style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at top, #0f2027 0%, #080812 70%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

        <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', color: '#4ade80', marginBottom: '24px', display: 'inline-block' }}>
          🚀 India's Trusted Rental Platform
        </div>

        <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-2px' }}>
          Find Your Perfect<br />
          <span style={{ background: 'linear-gradient(135deg, #4ade80, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Room or Flat
          </span>
        </h1>

        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', maxWidth: '500px', lineHeight: '1.6' }}>
          Trusted listings for students, job holders, families & travelers. No brokers, no fake listings.
        </p>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '12px', maxWidth: '520px', width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '8px 8px 8px 20px', backdropFilter: 'blur(10px)' }}>
          <span style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>🔍</span>
          <input
            placeholder="Search by city — Mumbai, Delhi, Prayagraj..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '15px' }}
          />
          <button onClick={handleSearch} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: '#000', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Search
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '48px', marginTop: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { num: '500+', label: 'Listings' },
            { num: '200+', label: 'Verified Owners' },
            { num: '1000+', label: 'Happy Tenants' },
            { num: '₹0', label: 'Broker Fees' }
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', background: 'linear-gradient(135deg, #4ade80, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.num}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '700', marginBottom: '12px' }}>Why <span style={{ color: '#4ade80' }}>RentalHub?</span></h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginBottom: '48px' }}>Everything you need to find your next home</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {[
            { icon: '✅', title: 'Verified Listings', desc: 'Every listing manually verified by our team', color: '#4ade80' },
            { icon: '🚫', title: 'No Brokers', desc: 'Connect directly with owners — zero commission', color: '#22d3ee' },
            { icon: '🗺️', title: 'Map View', desc: 'Find properties near you on interactive map', color: '#a78bfa' },
            { icon: '⭐', title: 'Real Reviews', desc: 'Honest reviews from verified tenants only', color: '#fbbf24' }
          ].map((f) => (
            <div key={f.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', transition: 'all 0.3s' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ color: f.color, marginBottom: '8px', fontSize: '18px' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '80px 20px', textAlign: 'center', background: 'rgba(74,222,128,0.03)', borderTop: '1px solid rgba(74,222,128,0.1)' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>Own a Property?</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontSize: '16px' }}>List for free and reach thousands of tenants today</p>
        <a href="/add-property" style={{ padding: '16px 40px', background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: '#000', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', fontSize: '16px' }}>
          List Your Property Free →
        </a>
      </div>

    </div>
  )
}
export default Home