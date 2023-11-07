const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./sequelize')

const app = express();
const port = 8000;

app.use(bodyParser.json());
sequelize.initDb()

app.get("/", (request, response) => {
    response.json({ info: "Bien connecté au serveur" });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

//Point de terminaison pour les actions crud
//Table User
require('./routes/User/findAllUser')(app)
require('./routes/User/findUserById')(app)

//Table Bonus

//Table Stuff
require('./routes/Stuff/findAllStuff')(app)

//Table UserAsStuff

//Table UserAsBonus