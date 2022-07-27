'use strict';

const { Op } = require('sequelize');

const images = [
  {
    url: 'https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageableId: 1,
    imageableType: 'Spot',
    spotId: 1,
    reviewId: 4
  },
  {
    url: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageableId: 2,
    imageableType: 'Spot',
    spotId: 2,
    reviewId: 5
  },
  {
    url: 'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageableId: 1,
    imageableType: 'Review',
    spotId: 1,
    reviewId: 1
  },
  {
    url: 'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageableId: 2,
    imageableType: 'Review',
    spotId: 1,
    reviewId: 2
  },
  {
    url: 'https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg?auto=compress&cs=tinysrgb&w=600',
    imageableId: 3,
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
