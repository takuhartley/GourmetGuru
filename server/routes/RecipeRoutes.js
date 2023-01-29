const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')

// Get all recipes
router.get('/', (req, res) => {
  Recipe.find()
    .populate('author')
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

// Get a single recipe by id
router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .populate('author')
    .then(recipe => {
      if (!recipe) res.status(404).json({ msg: 'Recipe not found' })
      res.json(recipe)
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

// Add a new recipe
router.post('/', (req, res) => {
  const newRecipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    author: req.body.author
  })

  newRecipe
    .save()
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

// Update a recipe
router.put('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.title = req.body.title
      recipe.ingredients = req.body.ingredients
      recipe.instructions = req.body.instructions
      recipe.author = req.body.author

      recipe
        .save()
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

// Delete a recipe
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: 'Recipe deleted' }))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router
