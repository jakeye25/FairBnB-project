'use strict';
const { Op } = require('sequelize');

const spots = [
  {
    ownerId: 1,
    address: "123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645358,
    lng: -122.4730327,
    name: "App Academy",
    description: "spot 1",
    price: 123,
    previewImage: "image1"
  },
  {
    ownerId: 2,
    address: "456 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 40.7645358,
    lng: -120.4730327,
    name: "App Academy",
    description: "second spot",
    price: 456,
    previewImage: "image2"
  },
  {
    ownerId: 3,
    address: "3 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 41.7645358,
    lng: -123.4730327,
    name: "App Academy",
    description: "third spot",
    price: 789,
    previewImage: "image3"
  },
  {
    ownerId: 4,
    address: "4 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 42.7645358,
    lng: -124.4730327,
    name: "App Academy",
    description: "third spot",
    price: 1011,
    previewImage: "image4"
  },
  {
    ownerId: 5,
    address: "5 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "App Academy",
    description: "third spot",
    price: 1213,
    previewImage: "image5"
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', spots, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Spots', {[Op.or] : spots}, {});
  }
};
