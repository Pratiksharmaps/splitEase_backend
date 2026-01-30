const { Model, DataTypes } = require('sequelize');
// const { User } = require('.');


module.exports =(sequelize)=>{

class Expense extends Model {
 static associate(models) {
      Expense.belongsTo(models.Group, {
        foreignKey: 'groupId',
        as: 'group',
      });

      Expense.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator',
      });
    }

}


Expense.init(
    {
id:{
            
type:DataTypes.UUID,
primaryKey : true,
defaultValue:DataTypes.UUIDV4
},

title:{
  type:  DataTypes.STRING,
  allowNull: false,
},
description:{
  type:  DataTypes.STRING,
  allowNull: false,
},

amount:{

    type:DataTypes.DOUBLE,
    allowNull:false,
},
createdBy:{

    type:DataTypes.UUID,
    allowNull:false,
    references:{

        model:'users',
        key:'id',

    }
}


    },
    {
        sequelize,
        modelName:'Expense',
        tableName:'expense',
        timestamps:true,
    }
)

return Expense;
}

