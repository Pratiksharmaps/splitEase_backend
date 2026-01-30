'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Many-to-many: A user can belong to many groups
      User.belongsToMany(models.Group, {
        through: 'UserGroups',
        foreignKey: 'userId',
        otherKey: 'groupId'
      });

      // One-to-many: A user can create many groups
      User.hasMany(models.Group, {
        foreignKey: 'createdBy',
        as: 'createdGroups'
      });

      // / One-to-many: A user can create many expenses
      User.hasMany(models.Expense, {
        foreignKey: 'createdBy',
        as: 'expenses',
      });
    
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      address: DataTypes.STRING,
      mobile: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isNumeric: true, len: [7, 15] },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      profilePicUrl: DataTypes.STRING,
      password: { type: DataTypes.STRING, allowNull: false },
      joiningDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
      otp: DataTypes.STRING,
      otpExpiry: DataTypes.DATE,
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );

  return User;
};
