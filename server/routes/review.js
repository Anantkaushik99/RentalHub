const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const auth = require('../middleware/auth')

// Get all reviews for a property
router.get('/:propertyId', async (req, res) => {
  try {
    const reviews = await Review.find({ property: req.params.propertyId })
      .populate('user', 'name')
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Add review
router.post('/:propertyId', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body
    const existing = await Review.findOne({
      property: req.params.propertyId,
      user: req.user.id
    })
    if (existing) return res.status(400).json({ message: 'Already reviewed' })

    const review = await Review.create({
      property: req.params.propertyId,
      user: req.user.id,
      rating,
      comment
    })
    const populated = await review.populate('user', 'name')
    res.status(201).json(populated)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router