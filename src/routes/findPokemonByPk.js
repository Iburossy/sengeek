//Trouver un pokemon par son ID PK
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons/:id',auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if (!pokemon) {
          const message = "Le Pokémon demandé n'existe pas.";
          return res.status(404).json({ message });
        }

        const message = 'Un Pokémon a bien été trouvé.';
        res.status(200).json({ message, data: pokemon });
      })
      .catch(error => {
        const message = "Le Pokémon n'a pas pu être récupéré. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
}
