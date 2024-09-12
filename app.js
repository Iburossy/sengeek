// Imports et configurations
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const portfinder = require('portfinder');

// Définition des constantes
const app = express();
const defaultPort = 3000; // Port par défaut

// Middlewares
app.use(bodyParser.json());

sequelize.initDb();
app.get('/', (req, res) => {
    res.json('hello, Heroku')

})

// ici nous ajouterons tous nos endpoints
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);


// Gestion des erreurs 404
app.use(({ res }) => {
    const message = "Page non trouvée, vérifiez votre URL";
    res.status(404).json({ message });
});

app.get('/', (req, res) => {
    res.json("Bienvenue sur l'API ")});

// Lancement de l'application avec portfinder
portfinder.getPort({ port: defaultPort, stopPort: defaultPort + 1000 }, (err, port) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    app.listen(port, () => console.log(`Notre application Node tourne sur : http://localhost:${port}`));
});
