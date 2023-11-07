const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./models/user');


const sequelize = new Sequelize(
    'cyber_click_db',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)

const User = userModel(sequelize, DataTypes)


const initDb = () => {
    return sequelize.sync()
    .then(_ => console.log(Personne))
}

module.exports = {
    initDb, 
    User
}