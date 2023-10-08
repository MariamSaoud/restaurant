const Sequelize =require('sequelize');
const sequelize= require('../database');
const Food= require('../models/food');
const Tags=require('../models/tags');
const same = sequelize.define(
    'Same',{
        Sameid:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull:false,
            primaryKey:true,
        },
        Samename:{
            type:Sequelize.DataTypes.STRING,
        }
    }
);
module.exports = same;