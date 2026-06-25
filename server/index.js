const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const app = express()
app.use(cors({
  origin: ['https://rental-hub-eight.vercel.app', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('MongoDB Error:', err))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/properties', require('./routes/Property'))
app.use('/api/reviews', require('./routes/review'))
app.get('/', (req, res) => {
  res.json({ message: 'RentalHub API is running!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})