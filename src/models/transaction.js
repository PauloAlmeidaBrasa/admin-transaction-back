'use strict';

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ID_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_user_transaction: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    desc_transaction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_transaction: {
      type: DataTypes.DATE,
      allowNull: false
    },
    value_in_points: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'transaction',
    timestamps: false
  });

  Transaction.associate = models => {
    Transaction.belongsTo(models.Client, {
      foreignKey: 'client_id',
      targetKey: 'id',
      as: 'client'
    });
  };
  Transaction.associate = models => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'id_user_transaction',
      targetKey: 'id',
      as: 'user'
    });
  };
  
  return Transaction;
};
