'use strict';

const { Op } = require('sequelize');

const reviews = [
  {
    userId: 1,
    spotId: 1,
    review: "This was an awesome spot!",
    stars: 5,
  },
  {
    userId: 2,
    spotId: 1,
    review: "second review",
    stars: 1,
  },
  {
    userId: 3,
    spotId: 2,
    review: "third review",
    stars: 2,
  },
  {
    userId: 2,
    spotId: 3,
    review: "fourth review",
    stars: 3,
  },
  {
    userId: 4,
    spotId: 3,
    review: "fourth review",
    stars: 4,
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {

     return queryInterface.bulkInsert('Reviews', reviews, {});
  },

  async down (queryInterface, Sequelize) {

     return queryInterface.bulkDelete('Reviews', {[Op.or] : reviews}, {});
  }
};
