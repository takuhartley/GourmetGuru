const mongoose = require('mongoose')
const { Schema } = mongoose

const recipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
      cost: { type: Number },
      nutrition: {
        calories: { type: Number },
        fat: { type: Number },
        protein: { type: Number },
        carbs: { type: Number }
      }
    }
  ],
  instructions: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Recipe', recipeSchema)
