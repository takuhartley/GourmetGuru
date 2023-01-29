const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const { Recipe } = require('./cogif/db')

const app = express()

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use passport middleware for authentication
app.use(passport.initialize())
app.use(passport.session())

// Recipe API routes
app.get('/recipes', (req, res) => {
  Recipe.find({})
    .populate('author')
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json({ error: 'Could not retrieve recipes' }))
})

app.post('/recipes', (req, res) => {
  const newRecipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    author: req.user._id
  })

  newRecipe
    .save()
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json({ error: 'Could not save recipe' }))
})

// Authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
  }
)

// Start server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
