const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bonus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    gain: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bonus',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bonus_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
