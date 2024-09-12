//createPokemon.js
const { Pokemon } = require('../db/sequelize')
const {validationError, UniqueConstraintError} = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le Pokémon ${req.body.name} a bien été créé.`
        res.status(201).json({ message, data: pokemon })
      })
      .catch(error => {
        if (error.name === 'SequelizeValidationError') {
          const message = "La validation a échoué. Veuillez vérifier les données envoyées.";
          return res.status(400).json({ message, data: error });
        }
        // unicité du nom
        if(error instanceof UniqueConstraintError) {
          return res.status(404).json({message: error.message, data: error})
        }
        const message = "Le Pokémon n'a pas pu être créé. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  })
}
