const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userasbonus', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    bonus_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'bonus',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'userasbonus',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "userasbonus_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "bonus_id" },
        ]
      },
    ]
  });
};
