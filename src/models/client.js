'use strict';

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    subdomain: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'client',
    timestamps: false
  });

  Client.associate = (models) => {
    Client.hasMany(models.Transaction, {
      foreignKey: 'client_id',
      sourceKey: 'id',
      as: 'transactions'
    });

    Client.hasMany(models.User, {
      foreignKey: 'client_id',
      sourceKey: 'id',
      as: 'users'
    });
  };
  return Client;
};
