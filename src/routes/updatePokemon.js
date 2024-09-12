// updatePokemon.js
const { Pokemon } = require('../db/sequelize')
const {validationError, UniqueConstraintError} = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.put('/api/pokemons/:id',auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        const message = `Le Pokémon avec l'identifiant n°${id} n'a pas pu être trouvé.`
        return res.status(404).json({ message });
      }
      return Pokemon.findByPk(id);
    })
    .then(pokemon => {
      if (!pokemon) {
        const message = `Le Pokémon avec l'identifiant n°${id} n'existe pas.`
        return res.status(404).json({ message });
      }
      const message = `Le Pokémon ${pokemon.name} a bien été modifié.`
      res.json({ message, data: pokemon });
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
      const message = "Le Pokémon n'a pas pu être modifié. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
  })
}
