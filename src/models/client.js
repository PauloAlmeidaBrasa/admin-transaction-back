'use strict';

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('client', {
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
    updated_at: {
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

  return Client;
};
