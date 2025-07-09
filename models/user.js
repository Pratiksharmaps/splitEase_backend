'use strict';
const {
  Model , DataTypes
} = require('sequelize');


module.exports = (sequelize) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({

    id : {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      unique:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
mobile: {

  type:DataTypes.STRING,
  allowNull: true,
  unique : true,
  validate:{
    isNumeric: true,
    len:[7,15],
  }
},
email:{
  type: DataTypes.STRING,
  allowNull: false,
  unique:true,
  validate:{
    isEmail:true,
  }
},
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
   joiningDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    groups: {
      type: DataTypes.JSON, 
      allowNull: true, 
    },
    favFriends: {
      type: DataTypes.JSON,
      allowNull: true, 
    },
  otp: {
    type: DataTypes.STRING,
  },
  otpExpiry: {
    type: DataTypes.DATE,
  },

    verified: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
},

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};  