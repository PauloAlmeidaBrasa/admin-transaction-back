'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        ID_User: 3123238322,
        email: 'admin@example.com',
        password: '$2a$12$.4i4qIokGJkVastByJWc5uHeD2.g4zNNg0BSsVSEKlNpFs9y/wEOS',
        created_at: new Date(),
        updated_at: new Date(),
        access_level: 1,
        client_id: 1
      },
      {
        name: 'Test User',
        ID_User: 524534542,
        email: 'test@example.com',
        password: '$2a$12$.4i4qIokGJkVastByJWc5uHeD2.g4zNNg0BSsVSEKlNpFs9y/wEOS',
        created_at: new Date(),
        updated_at: new Date(),
        access_level: 1,
        client_id: 2
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
    await queryInterface.bulkDelete('users', null, {});

  }
};
