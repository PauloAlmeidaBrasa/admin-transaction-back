'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable('transaction', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_user: {
        type: Sequelize.STRING,
        primaryKey: false,
        allowNull: false
      },
      id_user_transaction: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      desc_transaction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date_transaction: {
        type: Sequelize.DATE,
        allowNull: false
      },
      value_in_points: {
        type: Sequelize.STRING,
        allowNull: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('transaction');
  }
};
