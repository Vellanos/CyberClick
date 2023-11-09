const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./models/user');
const stuffModel = require('./models/stuff')
const bonusModel = require('./models/bonus')
const userhasstuffModel = require('./models/userhasstuff')
const userhasbonus = require ('./models/userhasbonus')


const sequelize = new Sequelize(
    'cyber_click_bd',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)

const User = userModel(sequelize, DataTypes)
const Stuff = stuffModel(sequelize, DataTypes)
const Bonus = bonusModel(sequelize, DataTypes)
const Userhasstuff = userhasstuffModel(sequelize, DataTypes)
const Userhasbonus = userhasbonus(sequelize, DataTypes)


const initDb = () => {
    return sequelize.sync()
    .then(_ => console.log(User))
}

module.exports = {
    initDb, 
    User,
    Stuff,
    Bonus,
    Userhasbonus,
    Userhasstuff
}