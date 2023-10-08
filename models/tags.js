const Sequelize =require('sequelize');
const sequelize= require('../database');
const Food=require('../models/food');
const Tags = sequelize.define(
    'Tags',{
        Tagid:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull:false,
            primaryKey:true,
        },
        Tagname:{
            type:Sequelize.DataTypes.STRING,
        }
    }
);
module.exports = Tags;