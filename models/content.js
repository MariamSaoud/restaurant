const Sequelize =require('sequelize');
const sequelize= require('../database');
const Food=require('../models/food');
const FoodContent=require('../models/foodContent');
const Content = sequelize.define(
    'Content',{
        Contentid:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement: true, 
            allowNull:false,
            primaryKey:true,
        },
        Quantity:{type:Sequelize.DataTypes.INTEGER}
    }
);
module.exports = Content;