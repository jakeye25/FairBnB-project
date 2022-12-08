'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId', as: 'Owner'}
      );

      Spot.hasMany(
        models.Booking,
        {foreignKey: 'spotId',
        // as: 'bookings',
        onDelete: 'CASCADE', hooks: true}
      );

      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId',
        // as: 'reviews',
        onDelete: 'CASCADE', hooks: true}
      );

      Spot.hasMany(
        models.Image,
        {foreignKey: 'spotId',
        // as: 'images',
        onDelete: 'CASCADE', hooks: true}
      );

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        max:90,
        min:-90
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        max:180,
        min:-180
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,50]
      }
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate:{
        len:[1,500]
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{

        min:1
      }
    },
    previewImage: {
      type: DataTypes.STRING,

    },
    imageUrl1: {
      type: DataTypes.STRING,

    },
    imageUrl2: {
      type: DataTypes.STRING,

    },
    imageUrl3: {
      type: DataTypes.STRING,

    },
    imageUrl4: {
      type: DataTypes.STRING,

    },

  }, {
    sequelize,
    modelName: 'Spot',
    // defaultScope: {
    // //   attributes: {
    // //     exclude: ["createdAt", "updatedAt"]
    // //   }
    // option:{omitNull:true}
    // },
  });
  return Spot;
};
