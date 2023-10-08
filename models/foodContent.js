const Sequelize =require('sequelize');
const sequelize= require('../database');
const Food= require('../models/food');
const FoodContent = sequelize.define(
    'FoodContent',{
        FoodContentid:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull:false,
            primaryKey:true,
        },
        FoodContentname:{type:Sequelize.DataTypes.STRING}
    }
);
module.exports = FoodContent;