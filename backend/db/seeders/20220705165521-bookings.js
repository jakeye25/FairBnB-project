'use strict';
const { Op } = require('sequelize');

const bookings = [
  {
    startDate:'2022-01-01',
    endDate:'2022-01-10',
    spotId:1,
    userId:1
  },
  {
    startDate:'2022-02-01',
    endDate:'2022-02-05',
    spotId:2,
    userId:1
  },
  {
    startDate:'2022-03-01',
    endDate:'2022-03-05',
    spotId:1,
    userId:2
  },
  {
    startDate:'2022-03-01',
    endDate:'2022-03-05',
    spotId:3,
    userId:3
  },
  {
    startDate:'2022-03-01',
    endDate:'2022-03-10',
    spotId: 2,
    userId: 1
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', bookings, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', {[Op.or] : bookings}, {});
  }
};
