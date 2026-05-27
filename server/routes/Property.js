const express = require('express')
const router = express.Router()
const Property = require('../models/Property')
const auth = require('../middleware/auth')

// Get all properties
router.get('/', async (req, res) => {
  try {
    const { city, type, furnished, wifi, parking, ac, minRent, maxRent } = req.query
    let filter = { available: true }

    if (city) filter.city = new RegExp(city, 'i')
    if (type) filter.type = type
    if (furnished) filter.furnished = furnished === 'true'
    if (wifi) filter.wifi = wifi === 'true'
    if (parking) filter.parking = parking === 'true'
    if (ac) filter.ac = ac === 'true'
    if (minRent || maxRent) {
      filter.rent = {}
      if (minRent) filter.rent.$gte = Number(minRent)
      if (maxRent) filter.rent.$lte = Number(maxRent)
    }

    const properties = await Property.find(filter).populate('owner', 'name email')
    res.json(properties)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email')
    if (!property) return res.status(404).json({ message: 'Not found' })
    res.json(property)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Create property (owner only)
router.post('/', auth, async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, owner: req.user.id })
    res.status(201).json(property)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Update property
router.put('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    )
    if (!property) return res.status(404).json({ message: 'Not found' })
    res.json(property)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete property
router.delete('/:id', auth, async (req, res) => {
  try {
    await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router