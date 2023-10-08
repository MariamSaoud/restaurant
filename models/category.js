const Sequelize =require('sequelize');
const sequelize= require('../database');
const Food=require('../models/food');
const category = sequelize.define(
    'Category',{
        Categoryid:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull:false,
            primaryKey:true,
        },
        Categoryname:{
            type:Sequelize.DataTypes.STRING,
        }
    }
);
module.exports = category;
