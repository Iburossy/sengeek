/* Authentification : Créer un modèle User avec Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: {msg : 'Ce nom est deja prit'}
      },
      password: {
        type: DataTypes.STRING
      }
    })
  }