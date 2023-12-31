const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    mdp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nbr_currency: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    date_rgbd: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
