'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('client', [
      {
        name: 'fake client',
        email: 'fakeemail@gmail.com',
        address: 'fake address',
        created_at: new Date(),
        subdomain: 'fake'
      },
      {
        name: 'fake client 2',
        email: 'fakeemail2@gmail.com',
        address: 'fake address 2',
        created_at: new Date(),
        subdomain: 'fake2'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('client', null, {});

  }
};
