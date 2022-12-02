'use strict';
//import bcrypt
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: "David",
        lastName: "Rogers",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: "Justin",
        lastName: "Gu",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: "Jake",
        lastName: "Ye",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user3@user.io',
        firstName: "Kevin",
        lastName: "Kim",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user4@user.io',
        firstName: "Anthony",
        lastName: "Lovern",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user5@user.io',
        firstName: "Franco",
        lastName: "Portin",
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Users', {
       username: { [Op.in]: ['FakeUser3', 'FakeUser1', 'FakeUser2'] }
     }, {});
  }
};
