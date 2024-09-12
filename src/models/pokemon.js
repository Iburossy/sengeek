const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Ce nom est deja pris '
      },
      validate: {
        notEmpty: { msg: "Le nom ne doit pas être vide" },
        notNull: { msg: "Le nom est un champ requis" }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Le champ 'hp' doit être un entier." },
        min: { args: [0], msg: "Les points de vie 'hp' doivent être supérieurs ou égaux à 0." },
        max: { args: [999], msg: "Les points de vie 'hp' doivent être inférieurs ou égaux à 999." },
        notNull: { msg: "Les points de vie sont requis" }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Le champ 'cp' doit être un entier." },
        min: { args: [0], msg: "Les points de vie 'cp' doivent être supérieurs ou égaux à 0." },
        max: { args: [99], msg: "Les points de vie 'cp' doivent être inférieurs ou égaux à 99." },
        notNull: { msg: "Les points de vie sont requis" }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: "Utilisez uniquement une URL pour l'image." },
        notNull: { msg: "L'image est une propriété requise." }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',');
      },
      set(types) {
        if (typeof types === 'string') {
          types = types.split(','); // Forcer la conversion en tableau
        }
        if (Array.isArray(types)) {
          this.setDataValue('types', types.join(','));
        } else {
          throw new Error("Expected an array for 'types'");
        }
      },
      validate: {
        isTypesValid(value) {
          if (!value) {
            throw new Error("Un Pokémon doit avoir un type.");
          }
          const typesArray = value.split(',');
          if (typesArray.length > 3) {
            throw new Error("Un Pokémon ne peut avoir plus de 3 types.");
          }
          typesArray.forEach(type => {
            if (!validTypes.includes(type)) {
              throw new Error(`Le type '${type}' de ce Pokémon doit appartenir à la liste suivante : ${validTypes.join(', ')} pour être valide.`);
            }
          });
        }
      }
    }
  }, 
  {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });
};
