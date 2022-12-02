'use strict';
const { Op } = require('sequelize');

const bookings = [
  {
    startDate:'2022-01-01',
    endDate:'2022-01-10',
    spotId:1,
    userId:3
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
    startDate:'2022-07-01',
    endDate:'2022-07-20',
    spotId:4,
    userId:1
  },
  {
    startDate:'2022-10-01',
    endDate:'2022-11-10',
    spotId: 5,
    userId: 1
  },
  {
    startDate:'2023-06-01',
    endDate:'2023-06-05',
    spotId: 10,
    userId: 1
  },
  {
    startDate:'2023-10-01',
    endDate:'2023-10-03',
    spotId: 15,
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
