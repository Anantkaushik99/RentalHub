import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'

function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`/properties/${id}`)
        setProperty(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) return <p style={{ padding: '20px' }}>Loading...</p>
  if (!property) return <p style={{ padding: '20px' }}>Property not found.</p>

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2>{property.title}</h2>
      <p style={{ color: '#aaa' }}>{property.address}, {property.city}</p>
      <h3 style={{ color: '#4ade80' }}>₹{property.rent}/month</h3>
      <p>{property.description}</p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0' }}>
        <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>{property.type}</span>
        {property.furnished && <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>Furnished</span>}
        {property.wifi && <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>WiFi</span>}
        {property.ac && <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>AC</span>}
        {property.parking && <span style={{ background: '#2a2a3e', padding: '6px 12px', borderRadius: '6px' }}>Parking</span>}
      </div>

      <div style={{ background: '#1e1e2e', padding: '16px', borderRadius: '10px', marginTop: '20px' }}>
        <h4>Owner Details</h4>
        <p>Name: {property.owner?.name}</p>
        <p>Email: {property.owner?.email}</p>
      </div>
    </div>
  )
}
export default PropertyDetail