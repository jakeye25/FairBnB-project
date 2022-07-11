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

//delete image
router.delete(
    '/:imageId', restoreUser, requireAuth,
    async (req, res, next) => {

    let imgId = req.params.imageId;

    const deleteImage = await Image.findByPk(imgId);

    if(!deleteImage) {
      return res.status(404).json({message: "Image couldn't be found", statusCode: 404})}

      if(deleteImage.imageableType == 'Spot'){
      const delspotImage = await Spot.findByPk(deleteImage.imageableId);
      if(delspotImage.ownerId === req.user.id){
        await Image.destroy({where : {id: req.params.imageId}})

         res.status(200)
         res.json({message: "Successfully deleted", statusCode: 200})
      }
      else {

        return  res.status(403).json({message: "Forbidden",
     statusCode: 403})}
      }

     if(deleteImage.imageableType == 'Review'){
        const delreviewImage = await Spot.findByPk(deleteImage.imageableId);
        if(delreviewImage.userId === req.user.id){
          await Image.destroy({where : {id: req.params.imageId}})

           res.status(200)
           res.json({message: "Successfully deleted", statusCode: 200})
        }
        else {

          return  res.status(403).json({message: "Forbidden",
       statusCode: 403})}
    }

})
  module.exports = router;
