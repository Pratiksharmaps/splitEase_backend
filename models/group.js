const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Group extends Model {
    static associate(models) {
      // Example: A group is created by a user
      Group.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });

      // Example: A group has many expenses (if you track spending separately)
      // Group.hasMany(models.Expense, { foreignKey: 'groupId', as: 'expenses' });
    }
  }

  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      participants: {
        type: DataTypes.ARRAY(DataTypes.UUID), // array of user IDs
        allowNull: false,
        defaultValue: [],
      },
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
