/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const userModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')
  
// Configuration de la base de données
const sequelize = new Sequelize('iamemoire_v2', 'iamemoire', 'mesErvices76@', {
    host: 'mysql-iamemoire.alwaysdata.net',
    dialect: 'mariadb',
    port: 3306,
    logging: false,
  });
  
  
  const Pokemon = PokemonModel(sequelize, DataTypes)
  const User = userModel(sequelize, DataTypes)
  const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
     // Remplir notre db avec nos 12 pokemons contenu dans src/models/pokemon.js
     pokemons.map(pokemonData => {
      Pokemon.create({
        name: pokemonData.name,
        hp: pokemonData.hp,
        cp: pokemonData.cp,
        picture: pokemonData.picture,
        types: pokemonData.types.join()
      }).then(bulbizarre => console.log(bulbizarre.toJSON()))
    })
    bcrypt.hash('admin', 10)
    .then(hash => User.create({username: 'admin', password: hash}))
    .then(user => console.log(user.toJSON()))
  })}
  
module.exports = { 
  initDb, Pokemon, User
}