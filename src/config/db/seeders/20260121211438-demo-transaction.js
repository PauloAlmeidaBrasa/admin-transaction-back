'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        ID_User: '3123238322',
        id_user_transaction: 1,
        desc_transaction: '$2a$12$.4i4qIokGJkVastByJWc5uHeD2.g4zNNg0BSsVSEKlNpFs9y/wEOS',
        date_transaction: new Date(),
        value_in_points: 10,
        value: 100,
        status: 1
      },
      {
        ID_User: '3123238322',
        id_user_transaction: 2,
        desc_transaction: '87348238374034',
        date_transaction: new Date(),
        value_in_points: 10,
        value: 10,
        status: 1
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
