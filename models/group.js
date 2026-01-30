'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Group extends Model {
    static associate(models) {
      // Many-to-many: A group can have many users
      Group.belongsToMany(models.User, {
        through: 'UserGroups',      // join table
        foreignKey: 'groupId',
        otherKey: 'userId'
      });

      // A group is created by a single user
      Group.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });

Group.hasMany(models.Expense, { foreignKey: "groupId", as: "expenses" });
    }
    
  }

  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      groupImage: DataTypes.STRING,
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      totalAmountSpend: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
    }
  );

  return Group;
};
