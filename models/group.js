const {Model , DataTypes} = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize)=>{


    class Group extends Model{

    }

Group.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique:true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    participants:{
type: DataTypes.ARRAY,
    }
})
}