const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stuff', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    price_puce: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stuff',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "stuff_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
