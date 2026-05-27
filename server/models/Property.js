const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rent: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, enum: ['room', 'pg', 'flat', 'house'], required: true },
  furnished: { type: Boolean, default: false },
  wifi: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  ac: { type: Boolean, default: false },
  images: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  available: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model('Property', propertySchema)