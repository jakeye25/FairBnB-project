'use strict';

const { Op } = require('sequelize');

const images = [
  {
    url: 'image url1',
    imageableType: 'Spot',
    spotId: 1
  },
  {
    url: 'image url2',
    imageableType: 'Spot',
    spotId: 2
  },
  {
    url: 'image url3',
    imageableType: 'Review',
    spotId: 1,
    reviewId: 1
  },
  {
    url: 'image url4',
    imageableType: 'Review',
    spotId: 1,
    reviewId: 2
  },
  {
    url: 'image url3',
    imageableType: 'Review',
    spotId: 2,
    reviewId: 3
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', images, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Images', {[Op.or] : images}, {});
  }
};
