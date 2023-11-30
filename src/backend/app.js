const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const authenticateToken = require('./authenticateToken');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroSequelize = require('@admin-bro/sequelize')
const sequelize = require('./sequelize')
const { User } = require('./sequelize');
require('dotenv').config();

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

AdminBro.registerAdapter(AdminBroSequelize);

// Middleware personnalisé pour vérifier l'authentification
const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
        req.user = await verifyToken(token);
        return next();
    } else {
        return res.status(401).json({ message: 'Non authentifié' });
    }
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur d\'authentification' });
}
};

const adminBro = new AdminBro({
  databases: [User],
  rootPath: '/admin',
});

const adminBroRouter = AdminBroExpress.buildRouter(adminBro);
app.use('/admin', adminAuthMiddleware, adminBroRouter);

app.get("/", (request, response) => {
    response.json({ info: "Bien connecté au serveur" });
});

app.post('/authenticate', authenticateToken, (req, res) => {

  res.json({ message: 'Authenticated', user: req.user });
 });


//Point de terminaison
//Login
require('./login')(app)

//Table User
require('./routes/User/findAllUser')(app)
require('./routes/User/findUserByEmail')(app)
require('./routes/User/createUser')(app)
require('./routes/User/updateUser')(app)

//Table Bonus
require('./routes/Bonus/findAllBonus')(app)

//Table Stuff
require('./routes/Stuff/findAllStuff')(app)

//Table UserHasStuff
require('./routes/UserHasStuff/findAllUserHasStuff')(app)
require('./routes/UserHasStuff/updateUserHasStuff')(app)

//Table UserHasBonus
require('./routes/UserHasBonus/findAllUserHasBonus')(app)
require('./routes/UserHasBonus/updateUserHasBonus')(app)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});