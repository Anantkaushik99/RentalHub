import { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

function AddProperty() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', description: '', rent: '', address: '',
    city: '', type: 'room', furnished: false,
    wifi: false, parking: false, ac: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('/properties', form)
      setSuccess('Property added successfully!')
      setTimeout(() => navigate('/listings'), 1500)
    } catch (err) {
      setError('Failed to add property. Please login as owner.')
    }
  }

  const inputStyle = { display: 'block', width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#2a2a3e', color: 'white' }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h2>Add New Property</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: '#4ade80' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, height: '80px' }} required />
        <input placeholder="Rent (per month)" type="number" value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} style={inputStyle} required />
        <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} style={inputStyle} required />
        <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={inputStyle} required />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={inputStyle}>
          <option value="room">Room</option>
          <option value="pg">PG</option>
          <option value="flat">Flat</option>
          <option value="house">House</option>
        </select>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {['furnished', 'wifi', 'parking', 'ac'].map((item) => (
            <label key={item} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form[item]} onChange={(e) => setForm({ ...form, [item]: e.target.checked })} />
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </label>
          ))}
        </div>

        <button type="submit" style={{ padding: '12px 24px', background: '#4ade80', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
          Add Property
        </button>
      </form>
    </div>
  )
}
export default AddProperty