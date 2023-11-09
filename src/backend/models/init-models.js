var DataTypes = require("sequelize").DataTypes;
var _bonus = require("./bonus");
var _stuff = require("./stuff");
var _user = require("./user");
var _userhasbonus = require("./userhasbonus");
var _userhasstuff = require("./userhasstuff");

function initModels(sequelize) {
  var bonus = _bonus(sequelize, DataTypes);
  var stuff = _stuff(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var userhasbonus = _userhasbonus(sequelize, DataTypes);
  var userhasstuff = _userhasstuff(sequelize, DataTypes);

  bonus.belongsToMany(user, { as: 'user_id_users', through: userhasbonus, foreignKey: "bonus_id", otherKey: "user_id" });
  stuff.belongsToMany(user, { as: 'user_id_user_userhasstuffs', through: userhasstuff, foreignKey: "stuff_id", otherKey: "user_id" });
  user.belongsToMany(bonus, { as: 'bonus_id_bonus', through: userhasbonus, foreignKey: "user_id", otherKey: "bonus_id" });
  user.belongsToMany(stuff, { as: 'stuff_id_stuffs', through: userhasstuff, foreignKey: "user_id", otherKey: "stuff_id" });
  userhasbonus.belongsTo(bonus, { as: "bonus", foreignKey: "bonus_id"});
  bonus.hasMany(userhasbonus, { as: "userhasbonus", foreignKey: "bonus_id"});
  userhasstuff.belongsTo(stuff, { as: "stuff", foreignKey: "stuff_id"});
  stuff.hasMany(userhasstuff, { as: "userhasstuffs", foreignKey: "stuff_id"});
  userhasbonus.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(userhasbonus, { as: "userhasbonus", foreignKey: "user_id"});
  userhasstuff.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(userhasstuff, { as: "userhasstuffs", foreignKey: "user_id"});

  return {
    bonus,
    stuff,
    user,
    userhasbonus,
    userhasstuff,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
