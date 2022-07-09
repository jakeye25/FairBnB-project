const express = require('express');
const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');
const user = require('../../db/models/user');
const spot = require('../../db/models/spot');
const { Op } = require('sequelize');
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
// ...
const router = express.Router();

//get all images
router.get('/', async (req, res) => {
    const images = await Image.findAll()
    res.json(images)
  })

//delete booking
router.delete(
    '/:imageId', restoreUser, requireAuth,
    async (req, res, next) => {

    let imgId = req.params.imageId;

    const deleteImage = await Image.findByPk(imgId);

    if(!deleteImage) {
      return res.status(404).json({message: "Image couldn't be found", statusCode: 404})}
// )
//     if(deleteBooking.startDate < todayDate) {
//        return res.status(400).json({message: "Bookings that have been started can't be deleted",
//   statusCode: 400})}


    await Image.destroy({where : {id: req.params.imageId}})
    // deleteBooking.save()
         res.status(200)
         res.json({message: "Successfully deleted", statusCode: 200})
        // res.send('deleted')
//     }
    }
    )
  module.exports = router;
