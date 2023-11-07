var DataTypes = require("sequelize").DataTypes;
var _bonus = require("./bonus");
var _stuff = require("./stuff");
var _user = require("./user");
var _userasbonus = require("./userasbonus");
var _userasstuff = require("./userasstuff");

function initModels(sequelize) {
  var bonus = _bonus(sequelize, DataTypes);
  var stuff = _stuff(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var userasbonus = _userasbonus(sequelize, DataTypes);
  var userasstuff = _userasstuff(sequelize, DataTypes);

  bonus.belongsToMany(user, { as: 'user_id_users', through: userasbonus, foreignKey: "bonus_id", otherKey: "user_id" });
  stuff.belongsToMany(user, { as: 'user_id_user_userasstuffs', through: userasstuff, foreignKey: "stuff_id", otherKey: "user_id" });
  user.belongsToMany(bonus, { as: 'bonus_id_bonus', through: userasbonus, foreignKey: "user_id", otherKey: "bonus_id" });
  user.belongsToMany(stuff, { as: 'stuff_id_stuffs', through: userasstuff, foreignKey: "user_id", otherKey: "stuff_id" });
  userasbonus.belongsTo(bonus, { as: "bonus", foreignKey: "bonus_id"});
  bonus.hasMany(userasbonus, { as: "userasbonus", foreignKey: "bonus_id"});
  userasstuff.belongsTo(stuff, { as: "stuff", foreignKey: "stuff_id"});
  stuff.hasMany(userasstuff, { as: "userasstuffs", foreignKey: "stuff_id"});
  userasbonus.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(userasbonus, { as: "userasbonus", foreignKey: "user_id"});
  userasstuff.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(userasstuff, { as: "userasstuffs", foreignKey: "user_id"});

  return {
    bonus,
    stuff,
    user,
    userasbonus,
    userasstuff,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
