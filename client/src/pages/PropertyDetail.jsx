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

  if (loading) return <p style={{ padding: '20px' }}>Loading...</p>
  if (!property) return <p style={{ padding: '20px' }}>Property not found.</p>

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2>{property.title}</h2>
      <p style={{ color: '#aaa' }}>{property.address}, {property.city}</p>
      <h3 style={{ color: '#4ade80' }}>Rs.{property.rent}/month</h3>
      <p>{property.description}</p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0' }}>
        <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>{property.type}</span>
        {property.furnished && <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>Furnished</span>}
        {property.wifi && <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>WiFi</span>}
        {property.ac && <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>AC</span>}
        {property.parking && <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>Parking</span>}
      </div>

      <div style={{ background: '#1e1e2e', padding: '16px', borderRadius: '10px', marginBottom: '30px' }}>
        <h4>Owner Details</h4>
        <p>Name: {property.owner?.name}</p>
        <p>Email: {property.owner?.email}</p>
      </div>

      {/* Reviews */}
      <h3>Reviews {avgRating && <span style={{ color: '#facc15' }}>⭐ {avgRating}</span>}</h3>

      {reviews.length === 0 ? (
        <p style={{ color: '#aaa' }}>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} style={{ background: '#1e1e2e', padding: '12px', borderRadius: '8px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{r.user?.name}</strong>
              <span style={{ color: '#facc15' }}>{'⭐'.repeat(r.rating)}</span>
            </div>
            <p style={{ margin: '6px 0 0', color: '#ccc' }}>{r.comment}</p>
          </div>
        ))
      )}

      {/* Add Review Form */}
      <div style={{ marginTop: '24px', background: '#1e1e2e', padding: '16px', borderRadius: '10px' }}>
        <h4>Add Your Review</h4>
        {message && <p style={{ color: '#4ade80' }}>{message}</p>}
        <form onSubmit={handleReview}>
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', background: '#2a2a3e', color: 'white', border: '1px solid #444', borderRadius: '6px' }}
          >
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
          </select>
          <textarea
            placeholder="Write your review..."
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            required
            style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', background: '#2a2a3e', color: 'white', border: '1px solid #444', borderRadius: '6px', height: '80px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#4ade80', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  )
}
export default PropertyDetail