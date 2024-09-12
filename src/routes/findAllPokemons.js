const { query } = require('express')
const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if (req.query.name) {
        const name = req.query.name;
        const limit = parseInt(req.query.limit) || 5
       // 2 caracter pour effectuer une recherche
        if(name.length < 2){
          const message = 'Votre recherche doit contenir au moins 2 caracteres'
          return res.status(400).json({message})
        }
        return Pokemon.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${name}%` // Utilisation de LIKE pour la recherche partielle
                }
            },
            order: ['name'],
            limit: limit
        })
        .then(({ count, rows }) => { // Déstructuration correcte de l'objet retourné
            const message = `Il y a ${count} pokemons qui correspondent à votre recherche ${name}.`;
            res.json({ message, data: rows });
        })
        .catch(error => {
            const message = "Une erreur est survenue lors de la récupération des pokémons.";
            res.status(500).json({ message, data: error });
        });
    } else {
        Pokemon.findAll({ order: ['name'] })
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.';
                res.json({ message, data: pokemons });
            })
            .catch(error => {
                const message = "La liste des pokémons n'a pas pu être récupérée, réessayez.";
                res.status(500).json({ message, data: error });
            });
    }
})
}