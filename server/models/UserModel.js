const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
