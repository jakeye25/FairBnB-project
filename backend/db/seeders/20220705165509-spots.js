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
    name: "House 1",
    description: "spot 1",
    price: 123,
    previewImage: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    ownerId: 2,
    address: "456 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 40.7645358,
    lng: -120.4730327,
    name: "House 2",
    description: "second spot",
    price: 456,
    previewImage: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    ownerId: 3,
    address: "3 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 41.7645358,
    lng: -123.4730327,
    name: "House 3",
    description: "third spot",
    price: 789,
    previewImage: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    ownerId: 4,
    address: "4 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 42.7645358,
    lng: -124.4730327,
    name: "House 4",
    description: "Forth spot",
    price: 1011,
    previewImage: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    ownerId: 5,
    address: "5 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "House 5",
    description: "Fifth spot",
    price: 1213,
    previewImage: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    ownerId: 1,
    address: "6 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "House 6",
    description: "Sixth spot",
    price: 1415,
    previewImage: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    ownerId: 2,
    address: "7 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "House 7",
    description: "Seventh spot",
    price: 1617,
    previewImage: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    ownerId: 3,
    address: "8 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "House 8",
    description: "Eighth spot",
    price: 1819,
    previewImage: "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', spots, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Spots', {[Op.or] : spots}, {});
  }
};
