const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./sequelize')
const cors = require('cors');
const authenticateToken = require('./authenticateToken');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.use(cors());

sequelize.initDb()

app.get("/", (request, response) => {
    response.json({ info: "Bien connecté au serveur" });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

app.post('/authenticate', authenticateToken, (req, res) => {

  res.json({ message: 'Authenticated', user: req.user });
 });

//Point de terminaison

//Login
require('./login')(app)

//Table User
require('./routes/User/findAllUser')(app)
require('./routes/User/findUserById')(app)
require('./routes/User/createUser')(app)

//Table Bonus

//Table Stuff
require('./routes/Stuff/findAllStuff')(app)

//Table UserHasStuff

//Table UseHasBonus