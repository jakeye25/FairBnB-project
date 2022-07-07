'use strict';

const { Op } = require('sequelize');

const reviews = [
  {
    "userId": 1,
    "spotId": 1,
    "review": "This was an awesome spot!",
    "stars": 5,
  },
  {
    "userId": 2,
    "spotId": 1,
    "review": "second review",
    "stars": 1,
  },
  {
    "userId": 3,
    "spotId": 2,
    "review": "third review",
    "stars": 2,
  },
];

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
     return queryInterface.bulkInsert('Reviews', reviews, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Reviews', {[Op.or] : reviews}, {});
  }
};
