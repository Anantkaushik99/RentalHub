import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'

function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ rating: 5, comment: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, revRes] = await Promise.all([
          API.get('/properties/' + id),
          API.get('/reviews/' + id)
        ])
        setProperty(propRes.data)
        setReviews(revRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleReview = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post('/reviews/' + id, form)
      setReviews([...reviews, data])
      setForm({ rating: 5, comment: '' })
      setMessage('Review added!')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login karke review do')
    }
  }

  if (loading) return (
    <div style={{ background: '#080812', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏠</div>
        <p>Loading property...</p>
      </div>
    </div>
  )

  if (!property) return (
    <div style={{ background: '#080812', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      Property not found.
    </div>
  )

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div style={{ background: '#080812', minHeight: '100vh', padding: '40px 20px', color: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <span style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', border: '1px solid rgba(74,222,128,0.2)' }}>
              {property.type}
            </span>
            {avgRating && (
              <span style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', border: '1px solid rgba(251,191,36,0.2)' }}>
                ⭐ {avgRating} ({reviews.length} reviews)
              </span>
            )}
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{property.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '20px', fontSize: '15px' }}>📍 {property.address}, {property.city}</p>

          <div style={{ fontSize: '36px', fontWeight: '800', background: 'linear-gradient(135deg, #4ade80, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>
            ₹{property.rent}<span style={{ fontSize: '16px', fontWeight: '400', color: 'rgba(255,255,255,0.4)', WebkitTextFillColor: 'rgba(255,255,255,0.4)' }}>/month</span>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', marginBottom: '24px' }}>{property.description}</p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {property.furnished && <span style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.08)' }}>🛋️ Furnished</span>}
            {property.wifi && <span style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.08)' }}>📶 WiFi</span>}
            {property.ac && <span style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.08)' }}>❄️ AC</span>}
            {property.parking && <span style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.08)' }}>🚗 Parking</span>}
          </div>
        </div>

        {/* Owner Details */}
        <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ color: '#4ade80', marginBottom: '16px', fontSize: '18px' }}>👤 Owner Details</h3>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '4px' }}>NAME</p>
              <p style={{ color: 'white', fontWeight: '600' }}>{property.owner?.name}</p>
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '4px' }}>EMAIL</p>
              <p style={{ color: 'white', fontWeight: '600' }}>{property.owner?.email}</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>
            Reviews {avgRating && <span style={{ color: '#fbbf24', fontSize: '16px' }}>⭐ {avgRating}</span>}
          </h3>

          {reviews.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px' }}>No reviews yet — be the first!</p>
          ) : (
            reviews.map((r) => (
              <div key={r._id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ color: '#4ade80' }}>{r.user?.name}</strong>
                  <span style={{ color: '#fbbf24' }}>{'⭐'.repeat(r.rating)}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: 0 }}>{r.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Add Review */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Add Your Review</h3>
          {message && <p style={{ color: '#4ade80', marginBottom: '12px' }}>{message}</p>}
          <form onSubmit={handleReview}>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', outline: 'none', fontSize: '14px' }}
            >
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
            </select>
            <textarea
              placeholder="Write your review..."
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              required
              style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', outline: 'none', fontSize: '14px', height: '100px', resize: 'vertical' }}
            />
            <button type="submit" style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #4ade80, #22c55e)', color: '#000', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
              Submit Review
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
export default PropertyDetail