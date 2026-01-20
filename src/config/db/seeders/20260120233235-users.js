'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        ID_User: 3123238322,
        email: 'admin@example.com',
        password: 'hashed_password_here',
        created_at: new Date(),
        updated_at: new Date(),
        access_level: 1
      },
      {
        name: 'Test User',
        ID_User: 524534542,
        email: 'test@example.com',
        password: 'hashed_password_here',
        created_at: new Date(),
        updated_at: new Date(),
        access_level: 1
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
