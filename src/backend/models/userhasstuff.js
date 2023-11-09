const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userhasstuff', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    stuff_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'stuff',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'userhasstuff',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "userhasstuff_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "stuff_id" },
        ]
      },
    ]
  });
};
