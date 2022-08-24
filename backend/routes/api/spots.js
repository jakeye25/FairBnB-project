const express = require('express');
const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');
const user = require('../../db/models/user');
const { Op } = require('sequelize');
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

const router = express.Router();


//get all spots
router.get('/', async (req, res) => {

  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  const error = {
    message: "Validation error",
    statusCode: 400,
    errors: {}
  }

  // if (!page) page = 0;
  // if (!size) size = 20;

  // page = parseInt(page);
  // size = parseInt(size);
  page = page === undefined ? 0 : parseInt(page);
  size = size === undefined ? 20 : parseInt(size);

  if (page > 10) page = 10
  if (size > 20) size = 20

  let pagination = { };

  if (page < 0) error.errors.page = "Page must be greater than or equal to 0"
  if (size < 0) error.errors.size = "Size must be greater than or equal to 0"
  if (parseInt(maxLat) > 90) {
    err.errors.maxLat = "Maximum latitude is invalid"
    maxLat = false
  }
  if (parseInt(minLat) < -90) {
    err.errors.maxLat = "Minimum latitude is invalid"
    minLng = false
  }
  if (parseInt(maxLng) > 180) {
    err.errors.maxLng = "Maximum longitude is invalid"
    maxLng = false
  }
  if (parseInt(minLng) < -180) {
    err.errors.minLng = "Minimum longitude is invalid"
    minLng = false
  }
  if (parseInt(minPrice) < 0) {
    err.errors.minPrice = "Maximum price must be greater than 0"
    minPrice = false
  }
  if (parseInt(maxPrice) < 0) {
    err.errors.maxPrice = "Minimum price must be greater than 0"
    maxPrice = false
  }

  if (page < 0 || size < 0 ||
     (!maxLat && maxLat !== undefined) ||
     (!minLat && minLat !== undefined) ||
     (!maxLng && maxLng !== undefined) ||
     (!minLng && minLng !== undefined) ||
      (!minPrice && minPrice !== undefined) ||
       (!maxPrice && maxPrice !== undefined)) {
    return res.status(400).json(error)
  }

  pagination.size = size;
  pagination.page = page;

    const spots = await Spot.findAll({
      limit: pagination.size,
    offset: pagination.size * pagination.page,
    })

  let spot=[];

  for (let ele of spots){
    const reviewRating = await Review.findAll({
          where: {
              spotId: ele.id
          },
          attributes: [
              [sequelize.fn("avg", sequelize.col('stars')), "avgStarRating"]
          ],
          raw: true,
      })


  data = {
    ...ele.dataValues,
    avgStarRating:  reviewRating[0].avgStarRating

  }
  spot.push(data)
  }

    res.json(
      {Spot: spot,
      page: pagination.page,
      size: pagination.size}
      )
  })

//get spot by soptId
router.get('/:spotId', async (req, res, next) => {

    const spotId = req.params.spotId
    const spots = await Spot.findByPk(spotId)
        // where:{ spotId: req.params.spotid},
        // attributes:{
        //     include:[
        //         [
        //             sequelize.fn("COUNT", sequelize.col("Reviews.review")), "numReviews"
        //         ],
        //         [
        //             sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"
        //         ]
        //     ]
        // },
        // include: [{
        //     model: Review,
        //     attributes: []
        //   },
        //   {
        //     model: Image,
        //     attributes: ['url']
        //   },
        //   {
        //     model: User,
        //     as: 'Owner',
        //     attributes: ['id', 'firstName', 'lastName']
        //   }
        // ],
// });

if(!spots) {
  res.status(401).json({
        message:"Spot could't be found",
        statusCode: 404
      })}

  const numReviews = await Review.count({
        where: {
          spotId: req.params.spotId
        }
      })

  const reviewRating = await Review.findAll({
        where: {
            spotId
        },
        attributes: [
            [sequelize.fn("avg", sequelize.col('stars')), "avgStarRating"]
        ],
        raw: true,
    })

  const images = await Image.findAll({
      where: {
          spotId
      },
      attributes: ['url']
  })

  const owner = await User.findByPk(spots.ownerId, {
      attributes: ['id', 'firstName', 'lastName']
  })

  const result = spots.toJSON()

  result.numReviews = numReviews;
  result.avgStarRating = parseFloat(reviewRating[0].avgStarRating);
  result.Images = images;
  result.Owner = owner
  res.json(result);

    // res.json(spots)
  })

//create spot
router.post(
  '/',
  restoreUser,
  requireAuth,
   async (req, res, next) => {
    let { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;

    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {}
    }

    if (!address) error.errors.address = "Street address is required."
    if (!city) error.errors.city= "City is required."
    if (!state) error.errors.state = "State is required."
    if (!country) error.errors.country = "Country is required."
    if (!lat) error.errors.lat = "Latitude is not valid."
    if (!lng) error.errors.lng = "Logitude is not valid."
    if (!name || name.length> 50) error.errors.name = "Name must be less than 50 characters."
    if (!description) error.errors.description = "Description is required."
    if (!price) error.errors.price = "Price per day is required."

      if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.statusCode = 400;
        return res.json(error)
      }

      const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage,
      });

      res.status(201).json(spot);
  })

// edit spot
router.put(
  '/:spotId', restoreUser,
  async (req, res, next) => {
    let { address, city, state, country, lat, lng, name, description, price } = req.body;

    let spotId = req.params.spotId;

    const editSpot = await Spot.findByPk(spotId);

    if(!editSpot) {
      res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}

    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {}
    }

    if (!address) error.errors.address = "Address is required."
    if (!city) error.errors.city= "City is required."
    if (!state) error.errors.state = "State is required."
    if (!country) error.errors.country = "Country is required."
    if (!lat) error.errors.lat = "Latitude is not valid."
    if (!lng) error.errors.lng = "Logitude is not valid."
    if (!name || name.length> 50) error.errors.name = "Name must be less than 50 characters."
    if (!description) error.errors.description = "Description is required."
    if (!price) error.errors.price = "Price per day is required."

      if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.statusCode = 400;
        return res.json(error)
      }



  editSpot.address = address
  editSpot.city = city
  editSpot.state = state
  editSpot.country = country
  editSpot.lat = lat
  editSpot.lng = lng
  editSpot.name = name
  editSpot.description = description
  editSpot.price = price

  await editSpot.save()
  res.status(200).json(editSpot);

})

//delete spot
router.delete(
  '/:spotId', restoreUser, requireAuth,
  async (req, res, next) => {

  let spotId = req.params.spotId;

  const deleteSpot = await Spot.findByPk(spotId);

  if(!deleteSpot) {
    res.status(404).json({message: "Spot couldn't be found",
statusCode: 404})}
    else{
      await deleteSpot.destroy()
      res.status(200).json({message: "Successfully deleted",
statusCode: 200})
    }

  })

//get all reviews by spot id
router.get('/:spotId/reviews',
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotReview = await Spot.findByPk(spotId);

    if(!spotReview) {
      res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}
      else{
    const reviews = await Review.findAll({
      where: { spotId: spotId},
      include: [
        {
          model: User,
          // as: 'users',
          attributes:['id', 'firstName', 'lastName']
        },
             {
          model: Image,
          // as: 'images'
          attributes: ['url']
        }
      ]
    })
    res.json({reviews})
  }}
  )

//create a review based on spot Id
router.post(
  '/:spotId/reviews', restoreUser, requireAuth,
  async (req, res, next) => {

    let {review, stars} = req.body;

    const newspotId = req.params.spotId

    const newspotReview = await Spot.findByPk(newspotId);

    if(!newspotReview) {
     return  res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}

    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {}
    }

    if (!review) error.errors.review = "Review text is required"
    if (!stars || stars>5 || stars <1) error.errors.stars= "Stars must be an integer from 1 to 5"

    if (!review || !stars || stars>5 || stars <1) {
      res.statusCode = 400;
      return res.json(error)
    }



  const userspotReview = await Review.findAll({
    where: {
      [Op.and]: [
        { userId: req.user.id },
        { spotId: req.params.spotId}
      ]
    }
  })
  if (userspotReview.length >= 1) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403
    });
  }

      const newReview = await Review.create({
          userId: req.user.id,
          spotId: req.params.spotId,
          review,
          stars
        });

        res.status(200).json(newReview)

    })

 //get all bookings for a spot based on spot Id
 router.get('/:spotId/bookings',
 requireAuth,
 async (req, res, next) => {
   const spotId = req.params.spotId

   const spotReview = await Spot.findByPk(spotId);

   if(!spotReview) {
     res.status(404).json({message: "Spot couldn't be found",
 statusCode: 404})}

 if(spotReview.ownerId != req.user.id){
  const notownerBook = await Booking.findAll({

    attributes: ['spotId', "startDate", "endDate"],
    where: {spotId : req.params.spotId}
  })
  res.json({"Bookings": notownerBook})
}
    if(spotReview.ownerId = req.user.id){
      const ownerBook = await Booking.findAll({
        where: {spotId : req.params.spotId},
        include:[
          {
            model: User,

            attributes: ['id', 'firstName', 'lastName']
          }
        ]
      })
      res.json( {"Bookings" : ownerBook})
    }

 }
 )

 //create a booking based on spot id
 router.post(
  '/:spotId/bookings', restoreUser, requireAuth,
  async (req, res, next) => {

    const newspotId = req.params.spotId

    const newspotBooking = await Spot.findByPk(newspotId);

    if(!newspotBooking) {
     return  res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}

  if(newspotBooking.ownerId === req.user.id) {
    return  res.status(403).json({message: "Forbidden",
 statusCode: 403})}

    let {startDate, endDate} = req.body;
    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {}
    }

    if (!startDate) error.errors.startDate = "Startdate is required."
    if (!endDate) error.errors.endDate= "Enddate is required."
    if( startDate>endDate ) error.errors.startDate = "Startdate must be before enddate."

    if (!startDate || !endDate|| (startDate>endDate)) {
      res.statusCode = 400;
      return res.json(error)
    }

    let todayDate = new Date().toISOString().slice(0, 10)
    if(startDate > endDate || startDate<todayDate || endDate< todayDate) {
      res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          "errors": {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"}
        })
      }
    const conflitBooking = await Booking.findAll({
      where:{

        [Op.and]: [
      {startDate: req.body.startDate},
      { spotId: req.params.spotId}
        ]},

  })

        if(conflitBooking.length < 1) {
        const booking =  await Booking.create({
          userId: req.user.id,
          spotId: req.params.spotId,
          startDate,
          endDate
        });

        res.status(200).json(booking)
      }
      else {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"}
    });
  }
})

//add image base on spot id
router.post(
  '/:spotId/images', restoreUser,  requireAuth,
  async (req, res, next) => {
    const newspotId = req.params.spotId

    const newspotImage = await Spot.findByPk(newspotId);

    if(!newspotImage) {
     return  res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}

      if(req.user.id != newspotImage.ownerId) {
        return  res.status(403).json({message: "Forbidden",
  statusCode: 403})
      }
      const {url} = req.body;

      if(!url) {
        res.status(400).json({
          message: "Validation error",
          statusCode: 400,
          errors: "Url is required"
        })

      }
      let newImage = await Image.create({

        imageableId: req.params.spotId,
        imageableType: "Spot",
        spotId: req.params.spotId,
        url
      });

      newImage = newImage.toJSON()
  delete newImage['spotId']
  delete newImage['reviewId']
  delete newImage['createdAt']
  delete newImage['updatedAt']
      res.status(200).json(newImage)
  })

module.exports = router;
