'use strict';

const { Op } = require('sequelize');

const reviews = [
  {
    userId: 2,
    spotId: 1,
    review: "Mats place is fantastic! Such a great location- lovely shops and restaurants nearby, and easy to get into Manhattan. The Airbnb itself has great amenities, and the kitchen is perfect for doing a bit of cooking. The bed is super comfy, and Mat was easy to communicate with. Highly reccommend and hope I can come back to stay soon!",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 1,
    review: "David was a really great host and was kind enough to provide any directions and a coffee for the stay !! The Airbnb was well located and clean ! Would come back again :)",
    stars: 5,
  },
  {
    userId: 4,
    spotId: 1,
    review: "The apartment was well-equipped, nicely decorated and very clean, with a really big and comfortable bed. It was the perfect base for our trip as it was close to the Graham Ave metro station so you’re only really 10/15 mins from Manhattan. Mat was a great host and very helpful, we’d definitely stay again.",
    stars: 2,
  },
  {
    userId: 5,
    spotId: 1,
    review: "Great spot. In a good location, comfortable bed, very clean. Mathew is an attentive host. The only drawback for me is the street noise. Big city so it’s to be expected but bring earplugs or a sound machine.",
    stars: 3,
  },
  {
    userId: 4,
    spotId: 2,
    review: "Perfect place in Williamsburg, Brooklyn to stay over the weekend! Comfortable and clean apartment.",
    stars: 4,
  },
  {
    userId: 1,
    spotId: 2,
    review: "Spacious, comfortable and in a fantastic location, you can’t go past this Airbnb for a stay in Brooklyn. The space was very well utilised for a studio and extremely clean with thoughtful finishings everywhere. One of the best Airbnbs I’ve ever stayed in and Mat is a fantastic host!",
    stars: 4,
  },
  {
    userId: 1,
    spotId: 3,
    review: "We had a great stay at Mathew’s place. It was an ideal location to really easily get into Manhattan in under 15 minutes but was nicely situated in a residential street so it was quiet but restaurants and bars were still nearby. The flat was really clean and much bigger than expected. The shower was powerful and warm and the entire place had everything we needed.",
    stars: 4,
  },
  {
    userId: 1,
    spotId: 4,
    review: "Excellent space with everything you need for a comfortable stay. Great location! We will definitely look to stay here again in the future!",
    stars: 4,
  },
  {
    userId: 2,
    spotId: 3,
    review: "The best Airbnb unit that you could get in Williamsburg without spending a fortune. It was clean, quiet, and very modern/renovated, and in an awesome location. Host was very quick on responding and handled my requests very easily.",
    stars: 4,
  },
  {
    userId: 4,
    spotId: 3,
    review: "Really a great place to stay. Beautiful apartment with everything you need for a single person or a couple. Wonderful neighborhood, not as gentrified as the Bedford Ave area, but you can essily reach it with a 15-20 min walk. Absolutely loved it and hopefully coming back soon. Thx Mathew!",
    stars: 4,
  },
  {
    userId: 5,
    spotId: 2,
    review: "This is a fantastic flat with every amenity possible--even a stash of Covid tests! If you're arriving by car, parking is easy and not only is there a metro stop close by, but also many great restaurants, cafés, etc.--I highly recommend!",
    stars: 4,
  },
  {
    userId: 5,
    spotId: 4,
    review: "Excellent location, very walkable, and close to the train. The interior feels more like you are in a Los Angeles Airbnb than Brooklyn with how big and open it is. There is also plenty of storage and a large kitchen area.",
    stars: 4,
  },
  {
    userId: 4,
    spotId: 5,
    review: "Fantastic place, can’t wait to stay here again.",
    stars: 4,
  },
  {
    userId: 1,
    spotId: 40,
    review: "Great place, close to lots of activities & restaurants. Appreciate the place being pet friendly.",
    stars: 5,
  },
  {
    userId: 2,
    spotId: 40,
    review: "An unexpected work trip meant needing a place to stay in short notice, and I was extremely lucky to find Carlos’s little home! From check-in to check-out it was a great stay, and I’m bookmarking for further trips.",
    stars: 4,
  },
  {
    userId: 3,
    spotId: 40,
    review: "It was a great stay!",
    stars: 3,
  },
  {
    userId: 4,
    spotId: 40,
    review: "Had a wonderful stay at Carlos's! The central location was great, and the place was easy to access, functional, and very clean & tidy. Perfect for two and our dog!",
    stars: 4,
  },
  {
    userId: 1,
    spotId: 39,
    review: "Place was very clean and quiet! Would definitely recommend!",
    stars: 4,
  },
  {
    userId: 2,
    spotId: 39,
    review: "Such an awesome space and perfect location! :)",
    stars: 3,
  },
  {
    userId: 3,
    spotId: 39,
    review: "Such a great stay, my girlfriend and I needed a getaway and it was perfect.",
    stars: 5,
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
