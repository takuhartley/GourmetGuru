const mongoose = require('mongoose')
const { Schema } = mongoose

const ingredientSchema = new Schema({
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
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient
