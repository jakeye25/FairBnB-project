const express = require('express');
const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');
const user = require('../../db/models/user');
const { Op } = require('sequelize');
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
// ...

const router = express.Router();

//get all bookings
router.get('/', async (req, res) => {
    const bookings = await Booking.findAll()
    res.json(bookings)
  })

//delete booking
router.delete(
    '/:bookingId', restoreUser, requireAuth,
    async (req, res, next) => {

    let bkId = req.params.bookingId;

    const deleteBooking = await Booking.findByPk(bkId);

    let todayDate = new Date().toISOString().slice(0, 10)
        // return res.json(deleteBooking.startDate)
    if(!deleteBooking) {
      return res.status(404).json({message: "Booking couldn't be found", statusCode: 404})}
// console.log(deleteBooking)
// res.send('delete booking')
    if(deleteBooking.startDate < todayDate) {
       return res.status(400).json({message: "Bookings that have been started can't be deleted",
  statusCode: 400})}

//     else{
    // await deleteBooking.destroy()
    await Booking.destroy({where : {id: req.params.bookingId}})
    // deleteBooking.save()
         res.status(200)
         res.json({message: "Successfully deleted", statusCode: 200})
        // res.send('deleted')
//     }
    }
    )

module.exports = router;
