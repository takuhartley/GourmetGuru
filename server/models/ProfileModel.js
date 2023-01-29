const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  handle: { type: String, required: true, max: 40 },
  bio: { type: String },
  social: {
    website: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String }
  },
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Profile', profileSchema)
