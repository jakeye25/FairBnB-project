'use strict';
const { Op } = require('sequelize');

const spots = [
  {
    ownerId: 1,
    address: "123 Disney Lane",
    city: "Aguanga",
    state: "California",
    country: "United States of America",
    lat: 37.7645358,
    lng: -122.4730327,
    name: "Off-grid Desert Retreat: Casa Rosada",
    description: "Casa Rosada sits atop the western most hills of a gently rolling landscape east of Temecula.",
    price: 178,
    previewImage: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    ownerId: 2,
    address: "456 Disney Lane",
    city: "Pioneertown",
    state: "California",
    country: "United States of America",
    lat: 40.7645358,
    lng: -120.4730327,
    name: "Heaven's Door: Pioneertown",
    description: "Price does go up $50/night/person after 2.",
    price: 704,
    previewImage: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    ownerId: 3,
    address: "3 Disney Lane",
    city: "Yucca Valley",
    state: "California",
    country: "United States of America",
    lat: 41.7645358,
    lng: -123.4730327,
    name: "All-Glass Modern Joshua Tree Villa with Salt Water Pool/Spa",
    description: "Enjoy complete privacy as you are surrounded by boulders and nature.",
    price: 789,
    previewImage: "https://a0.muscache.com/im/pictures/21e8066f-e46b-44b5-8721-f5e0c2135a0c.jpg?im_w=720"
  },
  {
    ownerId: 4,
    address: "4 Disney Lane",
    city: "Palm Spring",
    state: "California",
    country: "United States of America",
    lat: 42.7645358,
    lng: -124.4730327,
    name: "Private Resort-Like Pool Home Near all the Palm Springs Action",
    description: "Completely walled and hedged in for privacy",
    price: 663,
    previewImage: "https://a0.muscache.com/im/pictures/cd777500-b2ba-4655-9ad4-cfb216972c1c.jpg?im_w=720"
  },
  {
    ownerId: 5,
    address: "5 Disney Lane",
    city: "Morongo Valley",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "Stunning Ranch w/ 360° Mtn Views, Spa, BBQ & Stars",
    description: "Nestled along the foothills",
    price: 315,
    previewImage: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53063415/original/b0f3b61a-7103-4bc0-ad18-82173870f73c.jpeg?im_w=720"
  },
  {
    ownerId: 1,
    address: "6 Disney Lane",
    city: "Desert Hot Springs",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "SUMMER SALE : VIEWS, FUN 4 ALL + FAMILY FRIENDLY",
    description: "Heated pool and spa",
    price: 350,
    previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-592714143488530273/original/fad0a663-b42e-461b-8a51-b6eaf8bc259f.jpeg?im_w=720"
  },
  {
    ownerId: 2,
    address: "7 Disney Lane",
    city: "Temecula",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "Pinot Hills Estate",
    description: "The décor is upscale and all brand new.",
    price: 650,
    previewImage: "https://a0.muscache.com/im/pictures/57827892-e181-4556-aba4-66dab245bb41.jpg?im_w=720"
  },
  {
    ownerId: 3,
    address: "8 Disney Lane",
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "Private LA Guesthouse with Pool, Mediterranean Garden & View",
    description: "Feel at ease at this peaceful getaway under the California sun.",
    price: 159,
    previewImage: "https://a0.muscache.com/im/pictures/monet/Select-9653615/original/d92167a4-6bdc-484e-8bc8-14f052b7c4e3?im_w=720"
  },
  {
    ownerId: 4,
    address: "8 Disney Lane",
    city: "Beverly Hills",
    state: "California",
    country: "United States of America",
    lat: 45.7645358,
    lng: -125.4730327,
    name: "Hillcrest",
    description: "Mid-century Hollywood glam is alive and well at this gem from 1934. ",
    price: 14950,
    previewImage: "https://a0.muscache.com/im/pictures/6d21a3be-3114-4cdd-ab8b-75c02a6812b4.jpg?im_w=720"
  },
  // {
  //   ownerId: 5,
  //   address: "8 Disney Lane",
  //   city: "Chino",
  //   state: "California",
  //   country: "United States of America",
  //   lat: 45.7645358,
  //   lng: -125.4730327,
  //   name: "Sunny Pool house 2BR 1BA 4bed for Family/ Business",
  //   description: " This is the main house with 2 BR, 3 queen beds.",
  //   price: 150,
  //   previewImage: "https://a0.muscache.com/im/pictures/e0b6bb01-151b-42f6-b512-5667c3f6ab22.jpg?im_w=720"
  // },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', spots, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Spots', {[Op.or] : spots}, {});
  }
};
